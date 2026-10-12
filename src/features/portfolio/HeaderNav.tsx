import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu, X } from 'lucide-react';
import { elevatorScrollToSection } from '../../utils/elevatorScroll';

export const HeaderNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('sobre');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  const navLinks = [
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
    { id: 'trilha', label: 'Trilha', href: '#trilha' },
    { id: 'demonstracoes', label: 'Demonstrações', href: '#demonstracoes' },
    { id: 'comentarios', label: 'Comentários', href: '#comentarios' },
    { id: 'contato', label: 'Contato', href: '#contato', isCta: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Oculta o header ao descer e reexibe ao voltar ao topo
      setIsScrolledPastHero(window.scrollY > 80);

      // Scroll spy para detectar qual seção está na viewport
      const sections = navLinks.map(l => document.getElementById(l.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    elevatorScrollToSection(id);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-300 ease-in-out ${
      isScrolledPastHero 
        ? '-translate-y-full opacity-0 pointer-events-none' 
        : 'translate-y-0 opacity-100 pointer-events-auto bg-white border-b border-[#F0F4F4] shadow-xs'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Nome com Indicador de Status */}
          <a
            href="#sobre"
            onClick={(e) => handleNavClick(e, 'sobre')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F5] border border-[#05AD98]/30 text-[#05AD98] font-extrabold text-xs flex items-center justify-center font-mono group-hover:bg-[#05AD98] group-hover:text-white transition-colors shadow-xs">
              LP
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#111827] text-sm sm:text-base tracking-tight leading-none group-hover:text-[#05AD98] transition-colors">
                Lucas Pedroso
              </span>
              <span className="text-[10px] font-mono font-semibold text-[#6B7280] mt-0.5">
                Eng. de Produção • Automação
              </span>
            </div>
          </a>

          {/* Menu Desktop com o item Contato destacado com as cores do Falar Comigo */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F8FAFA] p-1.5 rounded-2xl border border-[#DDE2E2]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              if (link.isCta) {
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="ml-1 px-4 py-1.5 text-xs font-bold rounded-xl bg-[#05AD98] hover:bg-[#049381] text-white shadow-xs hover:shadow-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#05AD98] shadow-xs border border-[#05AD98]/40 font-extrabold'
                      : 'text-[#374151] hover:text-[#111827] hover:bg-white/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Botão Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#F0F4F4] transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile Dropdown Limpo com Contato Destacado */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8ECEC] bg-white px-4 py-3 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            if (link.isCta) {
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#05AD98] text-white shadow-xs mt-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            }

            return (
              <button
                key={link.id}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#E6F7F5] text-[#05AD98] font-bold'
                    : 'text-[#4B5563] hover:bg-[#F8FAFA]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#05AD98]"></span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
