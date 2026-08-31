import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Applicant,
  Agent,
  Campaign,
  AdminTask,
  MediaUploadItem,
  ApplicationStatus,
  CampaignInquiry,
} from '../types';
import {
  INITIAL_APPLICANTS,
  INITIAL_AGENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_TASKS,
  INITIAL_MEDIA_ITEMS,
} from '../data/initialData';

import { supabase } from '../lib/supabase';

export type PublicPage = 'home' | 'solutions' | 'about' | 'blog' | 'contact' | 'apply';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'applicant' | 'qa' | 'campaign' | 'system';
}

interface AppContextType {
  // Navigation
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage) => void;
  navigateToAdmin: () => void;
  navigateToPublic: (page?: PublicPage) => void;
  adminSection: string;
  setAdminSection: (section: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;

  // Data
  applicants: Applicant[];
  addApplicant: (newApp: Omit<Applicant, 'id' | 'appliedDate' | 'initials'>) => void;
  updateApplicantStatus: (id: string, status: ApplicationStatus) => void;
  deleteApplicant: (id: string) => void;

  inquiries: CampaignInquiry[];
  campaignInquiries: CampaignInquiry[];
  addCampaignInquiry: (inquiry: Omit<CampaignInquiry, 'id' | 'submittedAt'>) => void;

  agents: Agent[];
  addAgent: (newAgent: Omit<Agent, 'id'>) => void;
  updateAgentStatus: (id: string, status: Agent['status']) => void;

  campaigns: Campaign[];
  addCampaign: (newCampaign: Omit<Campaign, 'id'>) => void;
  toggleCampaignStatus: (id: string) => void;

  tasks: AdminTask[];
  toggleTask: (id: string) => void;
  addTask: (title: string, dueText: string, badgeText: string, variant: AdminTask['badgeVariant']) => void;

  mediaItems: MediaUploadItem[];
  addMediaItem: (item: Omit<MediaUploadItem, 'id' | 'uploadedAt'>) => void;
  deleteMediaItem: (id: string) => void;
  setActiveHeroImage: (url: string) => void;
  activeHeroImage: string;

  // Modals & Popups
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  selectedApplicant: Applicant | null;
  setSelectedApplicant: (app: Applicant | null) => void;

  // Notifications
  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;

  // Layout mode
  forcedDesktopMode: boolean;
  setForcedDesktopMode: (forced: boolean) => void;

  // Language
  language: 'EN' | 'TL';
  setLanguage: (lang: 'EN' | 'TL') => void;

  // Search
  adminSearchQuery: string;
  setAdminSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'vtg_portal_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial route based on path, query parameters, and hash
  const getInitialRoute = (): { view: 'public' | 'admin'; page: PublicPage } => {
    try {
      if (typeof window === 'undefined') {
        return { view: 'public', page: 'home' };
      }

      const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
      const hash = (window.location.hash || '').toLowerCase().replace(/^#\/?/, '');
      const searchParams = new URLSearchParams(window.location.search || '');
      const queryPage = (searchParams.get('page') || searchParams.get('p') || searchParams.get('view') || '').toLowerCase();

      // Check for admin view
      if (
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === 'admin' ||
        hash.startsWith('admin/') ||
        queryPage === 'admin'
      ) {
        return { view: 'admin', page: 'home' };
      }

      // Check specific public pages
      const target = queryPage || hash || path.replace(/^\//, '');

      if (target.includes('solution')) {
        return { view: 'public', page: 'solutions' };
      }
      if (target.includes('about') || target.includes('why-us') || target.includes('team')) {
        return { view: 'public', page: 'about' };
      }
      if (target.includes('blog') || target.includes('testimonial') || target.includes('news')) {
        return { view: 'public', page: 'blog' };
      }
      if (target.includes('contact') || target.includes('faq') || target.includes('inquiry')) {
        return { view: 'public', page: 'contact' };
      }
      if (target.includes('apply') || target.includes('career') || target.includes('job')) {
        return { view: 'public', page: 'apply' };
      }
    } catch {
      // safe fallback
    }
    return { view: 'public', page: 'home' };
  };

  const initialRoute = getInitialRoute();
  const [currentView, setCurrentView] = useState<'public' | 'admin'>(initialRoute.view);
  const [publicPage, setPublicPageState] = useState<PublicPage>(initialRoute.page);
  const [adminSection, setAdminSection] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Sync with browser navigation (back/forward & hash)
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getInitialRoute();
      setCurrentView(route.view);
      setPublicPageState(route.page);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const setPublicPage = (page: PublicPage) => {
    setPublicPageState(page);
    setCurrentView('public');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const newPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ page }, '', newPath);
      }
    } catch {
      // fallback to hash
      window.location.hash = `#${page}`;
    }
  };

  const navigateToAdmin = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      if (!window.location.pathname.includes('/admin')) {
        window.history.pushState({ view: 'admin' }, '', '/admin');
      }
    } catch {
      window.location.hash = '#admin';
    }
  };

  const navigateToPublic = (page: PublicPage = 'home') => {
    setPublicPage(page);
  };

  // Inquiries
  const [inquiries, setInquiries] = useState<CampaignInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addCampaignInquiry = (inquiry: Omit<CampaignInquiry, 'id' | 'submittedAt'>) => {
    const created: CampaignInquiry = {
      ...inquiry,
      id: 'inq-' + Date.now(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setInquiries((prev) => [created, ...prev]);

    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: `Campaign Proposal: ${created.company}`,
        desc: `${created.service} (${created.podSize}) from ${created.fullNameTitle}`,
        time: 'Just now',
        unread: true,
        type: 'campaign',
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'inquiries', JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  // Applicants
  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'applicants');
      return saved ? JSON.parse(saved) : INITIAL_APPLICANTS;
    } catch {
      return INITIAL_APPLICANTS;
    }
  });

  // Agents
  const [agents, setAgents] = useState<Agent[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'agents');
      return saved ? JSON.parse(saved) : INITIAL_AGENTS;
    } catch {
      return INITIAL_AGENTS;
    }
  });

  // Campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  // Tasks
  const [tasks, setTasks] = useState<AdminTask[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Media items
  const [mediaItems, setMediaItems] = useState<MediaUploadItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'media');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_ITEMS;
    } catch {
      return INITIAL_MEDIA_ITEMS;
    }
  });

  // Active Hero Image for public landing page
  const [activeHeroImage, setActiveHeroState] = useState<string>(() => {
    const activeItem = INITIAL_MEDIA_ITEMS.find((m) => m.isHeroActive);
    return activeItem ? activeItem.url : '/src/assets/images/headset_hero_1787877116496.jpg';
  });

  // Modals
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  // Layout view mode
  const [forcedDesktopMode, setForcedDesktopMode] = useState<boolean>(false);

  // Language state (EN / TL)
  const [language, setLanguageState] = useState<'EN' | 'TL'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'lang');
      return saved === 'TL' ? 'TL' : 'EN';
    } catch {
      return 'EN';
    }
  });

  const setLanguage = (lang: 'EN' | 'TL') => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'lang', lang);
    } catch {
      // ignore
    }
  };

  // Search query
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  // Notifications - dynamically updated on live events
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'notifications', JSON.stringify(notifications));
    } catch {
      // Ignore
    }
  }, [notifications]);

  // Fetch applicants from Supabase Postgres (with API fallback) on mount & periodically
  useEffect(() => {
    let isMounted = true;

    const fetchApplicants = async () => {
      try {
        // Direct Supabase fetch
        const { data, error } = await supabase
          .from('applicants')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0 && isMounted) {
          const mapped: Applicant[] = data.map((a: any) => ({
            id: String(a.id),
            name: a.name || 'Applicant',
            role: a.role || 'Appointment Setter',
            email: a.email || '',
            phone: a.phone || '',
            location: a.location || 'Philippines',
            appliedDate:
              a.applied_date ||
              (a.created_at
                ? new Date(a.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'),
            status: a.status || 'New Applicant',
            initials:
              a.name
                ?.split(' ')
                .map((n: string) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase() || 'AP',
            experienceYears: a.experience ? parseInt(a.experience, 10) || 1 : 1,
            notes: a.past_companies || a.notes || '',
            resumeFileName: `${(a.name || 'Applicant').replace(/\s+/g, '_')}_Application.pdf`,
          }));

          setApplicants(mapped);
          return;
        }

        // Optional API proxy fallback
        const res = await fetch('/api/applicants');
        if (res.ok) {
          const apiData = await res.json();
          if (apiData && Array.isArray(apiData.applicants) && isMounted) {
            const mapped: Applicant[] = apiData.applicants.map((a: any) => ({
              id: a.id,
              name: a.name || 'Applicant',
              role: a.role || 'Appointment Setter',
              email: a.email || '',
              phone: a.phone || '',
              location: a.location || 'Philippines',
              appliedDate: a.appliedDate || 'Just now',
              status: a.status || 'New Applicant',
              initials:
                a.name
                  ?.split(' ')
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'AP',
              experienceYears: a.experience ? parseInt(a.experience, 10) || 1 : 1,
              notes: a.pastCompanies || a.notes || '',
              resumeFileName: `${(a.name || 'Applicant').replace(/\s+/g, '_')}_Application.pdf`,
            }));

            setApplicants(mapped);
          }
        }
      } catch (err) {
        console.warn('Applicant fetch notice:', err);
      }
    };

    fetchApplicants();

    // Periodic poll every 10 seconds for real-time live sync between tabs
    const interval = setInterval(fetchApplicants, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'applicants', JSON.stringify(applicants));
    } catch {
      // Ignore
    }
  }, [applicants]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'agents', JSON.stringify(agents));
    } catch {
      // Ignore
    }
  }, [agents]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'campaigns', JSON.stringify(campaigns));
    } catch {
      // Ignore
    }
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'tasks', JSON.stringify(tasks));
    } catch {
      // Ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'media', JSON.stringify(mediaItems));
    } catch {
      // Ignore
    }
  }, [mediaItems]);

  const addApplicant = async (newApp: Omit<Applicant, 'id' | 'appliedDate' | 'initials'>) => {
    const initials = newApp.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AP';

    const tempId = 'app-' + Date.now();
    const created: Applicant = {
      ...newApp,
      id: tempId,
      appliedDate: 'Just now',
      initials,
    };

    // 1. Immediate optimistic UI update
    setApplicants((prev) => [created, ...prev.filter((a) => a.id !== tempId)]);

    // 2. Push real-time notification to admin bell
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: `New Applicant: ${created.name}`,
        desc: `Applied for ${created.role} (${created.phone})`,
        time: 'Just now',
        unread: true,
        type: 'applicant',
      },
      ...prev,
    ]);

    // 3. Persist to Supabase Postgres (and API proxy if available)
    try {
      const dbPayload = {
        name: created.name,
        email: created.email,
        phone: created.phone,
        location: (newApp as any).location || 'Philippines',
        role: created.role,
        experience: (newApp as any).experience || `${created.experienceYears || 1} years`,
        has_bpo_experience: (newApp as any).hasBpoExperience || 'Yes',
        bpo_experience: (newApp as any).bpoExperience || '',
        past_companies: (newApp as any).pastCompanies || created.notes || '',
        education: (newApp as any).education || "College Graduate (Bachelor's Degree)",
        work_setup: (newApp as any).workSetup || 'Yes — Desktop/Laptop',
        referral_source: (newApp as any).referralSource || 'Online Talent Portal',
        status: created.status || 'New Applicant',
        skills: (newApp as any).skills || [created.role, 'Telemarketing'],
        created_at: new Date().toISOString(),
      };

      const { data: supaData, error: supaError } = await supabase
        .from('applicants')
        .insert([dbPayload])
        .select();

      if (!supaError && supaData && supaData[0]?.id) {
        setApplicants((prev) =>
          prev.map((a) => (a.id === tempId ? { ...a, id: String(supaData[0].id) } : a))
        );
      } else {
        // Fallback to API if available
        const res = await fetch('/api/applicants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...dbPayload,
            hasBpoExperience: (newApp as any).hasBpoExperience,
            bpoExperience: (newApp as any).bpoExperience,
            pastCompanies: (newApp as any).pastCompanies,
            workSetup: (newApp as any).workSetup,
            referralSource: (newApp as any).referralSource,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.applicant?.id) {
            setApplicants((prev) =>
              prev.map((a) => (a.id === tempId ? { ...a, id: String(data.applicant.id) } : a))
            );
          }
        }
      }
    } catch (err) {
      console.warn('Supabase applicant persistence notice:', err);
    }
  };

  const updateApplicantStatus = async (id: string, status: ApplicationStatus) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );

    try {
      await supabase.from('applicants').update({ status }).eq('id', id);
      await fetch(`/api/applicants/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }).catch(() => {});
    } catch (err) {
      console.warn('Status update notice:', err);
    }
  };

  const deleteApplicant = async (id: string) => {
    setApplicants((prev) => prev.filter((app) => app.id !== id));
    try {
      await supabase.from('applicants').delete().eq('id', id);
      await fetch(`/api/applicants/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch (err) {
      console.warn('Delete applicant notice:', err);
    }
  };

  const addAgent = (newAgent: Omit<Agent, 'id'>) => {
    const created: Agent = {
      ...newAgent,
      id: 'agt-' + Date.now(),
    };
    setAgents((prev) => [created, ...prev]);
  };

  const updateAgentStatus = (id: string, status: Agent['status']) => {
    setAgents((prev) =>
      prev.map((agt) => (agt.id === id ? { ...agt, status } : agt))
    );
  };

  const addCampaign = (newCampaign: Omit<Campaign, 'id'>) => {
    const created: Campaign = {
      ...newCampaign,
      id: 'cmp-' + Date.now(),
    };
    setCampaigns((prev) => [created, ...prev]);
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((cmp) => {
        if (cmp.id === id) {
          const nextStatus = cmp.status === 'Active' ? 'Paused' : 'Active';
          return { ...cmp, status: nextStatus };
        }
        return cmp;
      })
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (
    title: string,
    dueText: string,
    badgeText: string,
    variant: AdminTask['badgeVariant']
  ) => {
    const created: AdminTask = {
      id: 'tsk-' + Date.now(),
      title,
      dueText,
      badgeText,
      badgeVariant: variant,
      completed: false,
    };
    setTasks((prev) => [created, ...prev]);
  };

  const addMediaItem = (item: Omit<MediaUploadItem, 'id' | 'uploadedAt'>) => {
    const created: MediaUploadItem = {
      ...item,
      id: 'med-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaItems((prev) => [created, ...prev]);
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const setActiveHeroImage = (url: string) => {
    setActiveHeroState(url);
    setMediaItems((prev) =>
      prev.map((m) => ({
        ...m,
        isHeroActive: m.url === url,
      }))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadNotificationCount = notifications.filter((n) => n.unread).length;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        publicPage,
        setPublicPage,
        navigateToAdmin,
        navigateToPublic,
        adminSection,
        setAdminSection,
        sidebarCollapsed,
        setSidebarCollapsed,
        applicants,
        addApplicant,
        updateApplicantStatus,
        deleteApplicant,
        inquiries,
        campaignInquiries: inquiries || [],
        addCampaignInquiry,
        agents,
        addAgent,
        updateAgentStatus,
        campaigns,
        addCampaign,
        toggleCampaignStatus,
        tasks,
        toggleTask,
        addTask,
        mediaItems,
        addMediaItem,
        deleteMediaItem,
        setActiveHeroImage,
        activeHeroImage,
        isApplyModalOpen,
        setIsApplyModalOpen,
        isContactModalOpen,
        setIsContactModalOpen,
        selectedApplicant,
        setSelectedApplicant,
        notifications,
        markAllNotificationsRead,
        unreadNotificationCount,
        forcedDesktopMode,
        setForcedDesktopMode,
        language,
        setLanguage,
        adminSearchQuery,
        setAdminSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
