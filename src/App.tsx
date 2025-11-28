
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  GraduationCap, 
  ChevronLeft,
  Download
} from 'lucide-react';
import { NAV_ITEMS, HANDOUT_URL, LECTURE_DURATION_MINUTES } from './constants';
import { SectionId } from './types';
import { 
  IntroSection, 
  ComponentsSection, 
  HistorySection, 
  SubjectsSection, 
  ModernConnectSection, 
  ExitTicket,
  SummarySection,
  ReviewSection
} from './components/LectureSections';

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRO);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= LECTURE_DURATION_MINUTES * 60) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((timeElapsed / (LECTURE_DURATION_MINUTES * 60)) * 100, 100);

  const renderContent = () => {
    switch (activeSection) {
      case SectionId.INTRO: return <IntroSection />;
      case SectionId.COMPONENTS: return <ComponentsSection />;
      case SectionId.HISTORY: return <HistorySection />;
      case SectionId.SUBJECTS: return <SubjectsSection />;
      case SectionId.MODERN: return <ModernConnectSection />;
      case SectionId.REVIEW: return <ReviewSection />;
      case SectionId.SUMMARY: return <SummarySection />;
      case SectionId.EXIT_TICKET: return <ExitTicket />;
      default: return <IntroSection />;
    }
  };

  const activeNavIndex = NAV_ITEMS.findIndex(n => n.id === activeSection);

  const handleNext = () => {
    if (activeNavIndex < NAV_ITEMS.length - 1) {
      setActiveSection(NAV_ITEMS[activeNavIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeNavIndex > 0) {
      setActiveSection(NAV_ITEMS[activeNavIndex - 1].id);
    }
  };

  return (
    <div className="flex h-screen bg-legal-50 overflow-hidden text-right" dir="rtl">
      
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 right-0 z-50
          w-72 bg-legal-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-72'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-legal-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500 p-2 rounded-lg text-legal-900">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="font-bold text-base leading-tight">المجتمع الدولي</h1>
                <p className="text-xs text-legal-400 flex items-center gap-1">
                  مدخل وتطور تاريخي 
                  <span className="text-[10px] opacity-50 font-mono border border-legal-600 px-1 rounded bg-legal-800 text-gold-400">v1.1</span>
                </p>
              </div>
            </div>
            {isMobile && <button onClick={() => setIsSidebarOpen(false)} className="text-legal-400"><X size={24} /></button>}
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
                    ${isActive ? 'bg-gold-500 text-legal-900 font-bold shadow-lg' : 'text-legal-300 hover:bg-legal-800 hover:text-white'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-legal-900' : 'text-legal-500 group-hover:text-gold-500'} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {isActive && <ChevronLeft size={16} />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 bg-legal-800 border-t border-legal-700 space-y-4">
            {/* Download Button */}
            <a 
              href={HANDOUT_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-legal-700 hover:bg-legal-600 text-white text-xs font-bold rounded-lg transition-colors border border-legal-600"
            >
              <Download size={14} />
              تحميل المطبوعة (PDF)
            </a>

            <div>
              <div className="flex items-center justify-between text-xs text-legal-400 mb-2">
                <span>الوقت: {formatTime(timeElapsed)}</span>
              </div>
              <div className="h-1.5 bg-legal-900 rounded-full overflow-hidden border border-legal-700">
                <div className="h-full bg-gold-500 transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        <header className="bg-white h-16 border-b border-legal-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-legal-50 rounded-lg text-legal-600 lg:hidden">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-legal-800 hidden sm:block">{NAV_ITEMS[activeNavIndex].label}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handlePrev} disabled={activeNavIndex === 0} className="p-2 rounded-lg border border-legal-200 text-legal-500 disabled:opacity-30 hover:bg-legal-50">
              <ChevronRight size={20} />
            </button>
            <span className="text-xs font-mono text-legal-400 px-2">{activeNavIndex + 1}/{NAV_ITEMS.length}</span>
            <button onClick={handleNext} disabled={activeNavIndex === NAV_ITEMS.length - 1} className="p-2 rounded-lg border border-legal-200 text-legal-500 disabled:opacity-30 hover:bg-legal-50">
              <ChevronLeft size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-legal-50">
          <div className="max-w-5xl mx-auto min-h-full pb-20">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
