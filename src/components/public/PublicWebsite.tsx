import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { SolutionsSection } from './SolutionsSection';
import { WhyChooseUsSection } from './WhyChooseUsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { ApplyModal } from './ApplyModal';
import { ContactModal } from './ContactModal';
import { SolutionsPage } from './pages/SolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';

export const PublicWebsite: React.FC = () => {
  const { forcedDesktopMode, publicPage } = useApp();

  const renderPageContent = () => {
    switch (publicPage) {
      case 'solutions':
        return <SolutionsPage />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'apply':
        return <ApplyPage />;
      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <SolutionsSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
            <FaqSection />
          </>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-red-100 selection:text-red-900 transition-all ${
        forcedDesktopMode ? 'min-w-[1024px] overflow-x-auto' : 'w-full'
      }`}
    >
      <Navbar />
      <main id="main-content">{renderPageContent()}</main>
      <Footer />

      {/* Interactive Public Modals */}
      <ApplyModal />
      <ContactModal />
    </div>
  );
};
