import React, { useState } from 'react';
import { NAV_ITEMS, type NavPage } from '../../data/navigation';
import { Cpu, Menu, X, ArrowRight, FileText } from 'lucide-react';
import { Button } from '../common/Button';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenDemo?: (demoId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#343840] bg-[#181A1D]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Marca */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group text-left focus:outline-none focus:ring-2 focus:ring-[#EA2B1F] rounded-lg p-1 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EA2B1F] flex items-center justify-center text-white shadow-lg shadow-[#EA2B1F]/30 border border-[#FF6358]/40 group-hover:scale-105 transition-transform duration-200">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#F9F9FA] tracking-tight text-base group-hover:text-[#EA2B1F] transition-colors">
                  Lucas Muniz
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#AEC3BA]/20 text-[#AEC3BA] border border-[#AEC3BA]/30 font-bold tracking-wider">
                  Engenharia & Soluções
                </span>
              </div>
              <p className="text-xs text-[#9DA7B3] font-mono tracking-wide">
                Engenharia de Produção & Automação
              </p>
            </div>
          </button>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#22252A] p-1.5 rounded-xl border border-[#343840]">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#EA2B1F] shadow-sm shadow-[#EA2B1F]/30 border border-[#FF6358]/40 font-semibold'
                      : 'text-[#9DA7B3] hover:text-white hover:bg-[#2B2F36]'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#AEC3BA]/20 text-[#AEC3BA]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Principal Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavClick('curriculo')}
              leftIcon={<FileText className="w-4 h-4 text-[#AEC3BA]" />}
              className="text-xs font-mono"
            >
              Ver Currículo (CV)
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleNavClick('contato')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Falar com Engenheiro
            </Button>
          </div>

          {/* Botão Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#9DA7B3] hover:text-white hover:bg-[#22252A] focus:outline-none focus:ring-2 focus:ring-[#EA2B1F]"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#343840] bg-[#181A1D] px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#EA2B1F] font-semibold'
                      : 'text-[#9DA7B3] hover:bg-[#22252A] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#AEC3BA]/20 text-[#AEC3BA] font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#343840] flex flex-col gap-2.5">
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={() => handleNavClick('curriculo')}
              leftIcon={<FileText className="w-4 h-4 text-[#AEC3BA]" />}
            >
              Abrir Currículo (CV)
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => handleNavClick('contato')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Conversar Sobre um Projeto
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
