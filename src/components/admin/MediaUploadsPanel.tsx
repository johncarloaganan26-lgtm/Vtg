import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Copy,
  Sliders,
  Check,
  Eye,
  FileText,
  Filter,
} from 'lucide-react';
import { MediaUploadItem } from '../../types';

export const MediaUploadsPanel: React.FC = () => {
  const {
    mediaItems,
    addMediaItem,
    deleteMediaItem,
    activeHeroImage,
    setActiveHeroImage,
    setCurrentView,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadCategory, setUploadCategory] = useState<MediaUploadItem['category']>(
    'Headsets & Hardware'
  );
  const [customName, setCustomName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaUploadItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag and Drop or File Selection
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

      addMediaItem({
        name: customName.trim() || file.name.replace(/\.[^/.]+$/, ''),
        category: uploadCategory,
        url: dataUrl,
        size: formattedSize,
        dimensions: 'Custom Upload',
      });

      setCustomName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCopyLink = (item: MediaUploadItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    'All',
    'Logos',
    'Headsets & Hardware',
    'Banners',
    'Agents & Staff',
    'Documents',
  ];

  const filteredItems = mediaItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="admin-media-panel" className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Image & Content Uploads Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage website images, hero hardware photography, brand logos (screen.png), and marketing assets.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('public')}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Preview on Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Upload Box Zone */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
        <h3 className="text-base font-extrabold text-slate-900 mb-2">Upload New Media Asset</h3>
        <p className="text-xs text-slate-500 mb-6">
          Drag and drop your images or documents. Supported formats: PNG, JPG, WebP, SVG, PDF.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Dropzone */}
          <div className="lg:col-span-8">
            <label className="border-2 border-dashed border-slate-200 hover:border-red-600 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50/50 hover:bg-red-50/20 group">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#8B151E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-slate-800 mb-1">
                Choose a file or drag & drop it here
              </span>
              <span className="text-xs text-slate-500">
                High-resolution PNG, JPG or WebP recommended (up to 20MB)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Upload Metadata Configuration */}
          <div className="lg:col-span-4 space-y-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Asset Name (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Red Accent Headset 2026"
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={uploadCategory}
                onChange={(e) =>
                  setUploadCategory(e.target.value as MediaUploadItem['category'])
                }
                className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
              >
                <option value="Headsets & Hardware">Headsets & Hardware</option>
                <option value="Logos">Logos & Seals</option>
                <option value="Banners">Banners & Backgrounds</option>
                <option value="Agents & Staff">Agents & Staff Headshots</option>
                <option value="Documents">Training & Onboarding Documents</option>
              </select>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 leading-relaxed">
              💡 Tip: Uploading an image in "Headsets & Hardware" allows you to set it as the live hero image on the home page with a single click.
            </div>
          </div>
        </div>
      </div>

      {/* Gallery & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#8B151E] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
            />
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isHero = activeHeroImage === item.url || item.isHeroActive;
            const isDoc = item.category === 'Documents';

            return (
              <div
                key={item.id}
                id={`media-card-${item.id}`}
                className={`bg-slate-50/60 rounded-xl border overflow-hidden transition-all duration-200 flex flex-col justify-between ${
                  isHero
                    ? 'border-red-600 ring-2 ring-red-600/20 bg-red-50/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Thumbnail container */}
                  <div className="relative aspect-video w-full bg-white flex items-center justify-center overflow-hidden border-b border-slate-100 p-2">
                    {isDoc ? (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <FileText className="w-12 h-12 text-slate-400 mb-1" />
                        <span className="text-[10px] font-bold uppercase text-slate-500">
                          Document File
                        </span>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    )}

                    {/* Active Hero Pill */}
                    {isHero && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#8B151E] text-white text-[10px] font-extrabold rounded-md shadow-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Live Website Hero
                      </span>
                    )}

                    {/* Quick Preview Button */}
                    {!isDoc && (
                      <button
                        onClick={() => setPreviewItem(item)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md transition-colors"
                        title="View Full Resolution"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3.5">
                    <div className="text-xs font-bold text-slate-900 truncate mb-1" title={item.name}>
                      {item.name}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{item.category}</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                  {!isDoc && (
                    <button
                      onClick={() => setActiveHeroImage(item.url)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                        isHero
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white hover:bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {isHero ? 'Active in Hero' : 'Set as Hero Image'}
                    </button>
                  )}

                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => handleCopyLink(item)}
                      className="p-1.5 hover:bg-slate-200 rounded-md text-slate-500 hover:text-slate-700 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteMediaItem(item.id)}
                      className="p-1.5 hover:bg-rose-100 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold">{previewItem.name}</h4>
                <p className="text-xs text-slate-400">
                  {previewItem.category} • {previewItem.size} {previewItem.dimensions ? `• ${previewItem.dimensions}` : ''}
                </p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold"
              >
                Close (ESC)
              </button>
            </div>
            <div className="p-8 flex items-center justify-center max-h-[75vh] overflow-hidden bg-slate-100">
              <img
                src={previewItem.url}
                alt={previewItem.name}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] max-w-full object-contain drop-shadow-md rounded-lg"
              />
            </div>
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveHeroImage(previewItem.url);
                  setPreviewItem(null);
                }}
                className="px-4 py-2 text-xs font-bold uppercase text-white bg-[#8B151E] rounded-xl hover:bg-[#720E15]"
              >
                Set as Live Website Hero Image
              </button>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
