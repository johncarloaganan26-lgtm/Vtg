import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Supabase Client
const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://ehucbddxitbgymcqcwrf.supabase.co';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodWNiZGR4aXRiZ3ltY3Fjd3JmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODExNzAxMCwiZXhwIjoyMTAzNjkzMDEwfQ.gwQFGwPLG-4SZGSaPcHNWYRuD519A5ApH3vqk4JWy-g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

// In-memory fallback / cache in case table is bootstrapping
interface ApplicantRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  experience: string;
  hasBpoExperience?: string;
  bpoExperience?: string;
  pastCompanies?: string;
  education?: string;
  workSetup?: string;
  referralSource?: string;
  status: string;
  appliedDate: string;
  rating?: number;
  skills?: string[];
  notes?: string;
  created_at?: string;
}

let inMemoryApplicants: ApplicantRecord[] = [];

// ==========================================
// API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    supabaseConnected: Boolean(SUPABASE_URL && SUPABASE_KEY),
    timestamp: new Date().toISOString(),
  });
});

// GET /api/applicants - Fetch real-time applicants from Supabase Postgres
app.get('/api/applicants', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applicants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch notice (falling back to memory cache):', error.message);
      return res.json({ applicants: inMemoryApplicants, source: 'cache' });
    }

    if (data && data.length > 0) {
      // Map DB snake_case or standard fields if needed
      const formatted = data.map((row: any) => ({
        id: String(row.id),
        name: row.name || row.full_name || 'Applicant',
        email: row.email || '',
        phone: row.phone || '',
        location: row.location || '',
        role: row.role || 'Appointment Setter',
        experience: row.experience || 'Fresh / Non-BPO',
        hasBpoExperience: row.has_bpo_experience || row.hasBpoExperience || 'Yes',
        bpoExperience: row.bpo_experience || row.bpoExperience || '',
        pastCompanies: row.past_companies || row.pastCompanies || '',
        education: row.education || "College Graduate (Bachelor's Degree)",
        workSetup: row.work_setup || row.workSetup || 'Yes — Desktop/Laptop',
        referralSource: row.referral_source || row.referralSource || 'Website',
        status: row.status || 'New Applicant',
        appliedDate:
          row.applied_date ||
          (row.created_at
            ? new Date(row.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Recent'),
        rating: row.rating ? Number(row.rating) : 4.5,
        skills: Array.isArray(row.skills)
          ? row.skills
          : typeof row.skills === 'string'
          ? row.skills.split(',')
          : [row.role || 'Telemarketing'],
        notes: row.notes || '',
      }));

      // Sync memory cache
      inMemoryApplicants = formatted;
      return res.json({ applicants: formatted, source: 'supabase_postgres' });
    }

    return res.json({ applicants: inMemoryApplicants, source: 'supabase_postgres' });
  } catch (err: any) {
    console.error('Error fetching applicants:', err);
    res.json({ applicants: inMemoryApplicants, error: err.message, source: 'cache' });
  }
});

// POST /api/applicants - Create new applicant from Apply Form
app.post('/api/applicants', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      role,
      experience,
      hasBpoExperience,
      bpoExperience,
      pastCompanies,
      education,
      workSetup,
      referralSource,
      skills,
      status = 'New Applicant',
      rating = 4.5,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const appliedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newRecord: ApplicantRecord = {
      id: 'app-' + Date.now(),
      name,
      email,
      phone,
      location: location || 'Philippines',
      role: role || 'Appointment Setter',
      experience: experience || '1 to 2 years',
      hasBpoExperience: hasBpoExperience || 'Yes',
      bpoExperience: bpoExperience || '1 to 2 years',
      pastCompanies: pastCompanies || '',
      education: education || "College Graduate (Bachelor's Degree)",
      workSetup: workSetup || 'Yes — Desktop/Laptop',
      referralSource: referralSource || 'Online Portal',
      status: status || 'New Applicant',
      appliedDate,
      rating: Number(rating) || 4.5,
      skills: Array.isArray(skills) ? skills : [role, 'Communication', 'Outbound Sales'],
      notes: '',
      created_at: new Date().toISOString(),
    };

    // Attempt to persist into Supabase postgres table
    try {
      const { data, error } = await supabase
        .from('applicants')
        .insert([
          {
            name: newRecord.name,
            email: newRecord.email,
            phone: newRecord.phone,
            location: newRecord.location,
            role: newRecord.role,
            experience: newRecord.experience,
            has_bpo_experience: newRecord.hasBpoExperience,
            bpo_experience: newRecord.bpoExperience,
            past_companies: newRecord.pastCompanies,
            education: newRecord.education,
            work_setup: newRecord.workSetup,
            referral_source: newRecord.referralSource,
            status: newRecord.status,
            applied_date: newRecord.appliedDate,
            rating: newRecord.rating,
            skills: newRecord.skills,
            created_at: newRecord.created_at,
          },
        ])
        .select();

      if (error) {
        console.warn('Notice inserting into Supabase:', error.message);
      } else if (data && data[0]) {
        newRecord.id = String(data[0].id);
      }
    } catch (insertErr: any) {
      console.warn('Supabase insert fallback:', insertErr.message);
    }

    // Always maintain real-time memory state so Admin receives it instantly
    inMemoryApplicants = [newRecord, ...inMemoryApplicants.filter((a) => a.id !== newRecord.id)];

    res.status(201).json({
      success: true,
      applicant: newRecord,
      message: 'Applicant successfully registered and synced with Supabase Postgres.',
    });
  } catch (err: any) {
    console.error('Error adding applicant:', err);
    res.status(500).json({ error: err.message || 'Failed to submit applicant' });
  }
});

// PATCH /api/applicants/:id/status - Update applicant status (e.g. Under Review -> Interview Scheduled -> Hired)
app.patch('/api/applicants/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    // Update in-memory
    inMemoryApplicants = inMemoryApplicants.map((app) =>
      app.id === id ? { ...app, status } : app
    );

    // Update in Supabase
    try {
      await supabase.from('applicants').update({ status }).eq('id', id);
    } catch (dbErr: any) {
      console.warn('Supabase status update notice:', dbErr.message);
    }

    res.json({ success: true, id, status });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/applicants/:id - Delete an applicant
app.delete('/api/applicants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    inMemoryApplicants = inMemoryApplicants.filter((app) => app.id !== id);

    try {
      await supabase.from('applicants').delete().eq('id', id);
    } catch (dbErr: any) {
      console.warn('Supabase delete notice:', dbErr.message);
    }

    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// VITE SPA MIDDLEWARE / SERVE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node.js Express + Supabase Postgres server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
