import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { elevatorScrollToSection } from '../../utils/elevatorScroll';

interface SectionNavItem {
  id: string;
  label: string;
  stepNumber: string;
}

const SECTIONS: SectionNavItem[] = [
  { id: 'sobre', label: 'Apresentação', stepNumber: '01' },
  { id: 'trilha', label: 'Trilha do Método', stepNumber: '02' },
  { id: 'demonstracoes', label: 'Demonstrações', stepNumber: '03' },
  { id: 'comentarios', label: 'Avaliações', stepNumber: '04' },
  { id: 'contato', label: 'Contato', stepNumber: '05' },
];

export const FloatingSectionNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('sobre');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolledPastHero(scrollY > 80);

      const scrollPosition = scrollY + window.innerHeight / 2;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSection = (id: string) => {
    setMobileMenuOpen(false);
    elevatorScrollToSection(id);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. NAVEGADOR DESKTOP: Bolinhas / Pílulas Laterais com Elevador            */}
      {/* ========================================================================= */}
      <aside 
        aria-label="Navegador Elevador de Seções"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-3.5 items-end pointer-events-auto"
      >
        <div className="p-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-2xl flex flex-col gap-3">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;

            return (
              <button
                key={section.id}
                onClick={() => handleSelectSection(section.id)}
                className="group relative flex items-center justify-end cursor-pointer focus:outline-none"
                title={section.label}
                aria-label={`Ir de elevador para seção ${section.label}`}
              >
                {/* Tooltip com Nome da Seção no Hover */}
                <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-mono font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 border border-slate-700 shadow-xl translate-x-1 group-hover:translate-x-0">
                  <span className="text-[#05AD98] mr-1">{section.stepNumber}</span>
                  {section.label}
                </span>

                {/* Indicador de Bolinha / Pílula */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'w-3 h-6 bg-[#05AD98] shadow-md shadow-[#05AD98]/50 ring-2 ring-[#05AD98]/30' 
                      : 'w-2.5 h-2.5 bg-slate-500/70 hover:bg-slate-300 group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. NAVEGADOR MOBILE: Botão Hambúrguer Flutuante quando descer a página     */}
      {/* ========================================================================= */}
      {isScrolledPastHero && (
        <div className="lg:hidden fixed top-4 right-4 z-[70] animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-white flex items-center justify-center active:scale-95 transition-all"
            aria-label="Abrir elevador de seções"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#05AD98]" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Menu Dropdown Flutuante Mobile */}
          {mobileMenuOpen && (
            <div className="absolute right-0 top-14 w-60 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl p-2.5 space-y-1 animate-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Elevador de Seções
              </div>

              {SECTIONS.map((section) => {
                const isActive = activeId === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => handleSelectSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#05AD98]/20 text-[#05AD98] font-bold border border-[#05AD98]/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#05AD98]">
                        {section.stepNumber}
                      </span>
                      <span>{section.label}</span>
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#05AD98] animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
