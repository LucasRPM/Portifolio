import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Info, X } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface StandaloneSystemLayoutProps {
  systemId: 'flowdesk' | 'flow-automation' | 'process-impact';
  systemName: string;
  systemTagline: string;
  systemIcon: React.ReactNode;
  systemBadge: string;
  onBackToPortfolio: () => void;
  onHireSolution: (systemId: string) => void;
  children: React.ReactNode;
}

export const StandaloneSystemLayout: React.FC<StandaloneSystemLayoutProps> = ({
  systemId,
  systemName,
  systemTagline,
  systemIcon,
  systemBadge,
  onBackToPortfolio,
  onHireSolution,
  children
}) => {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="min-h-screen bg-[#121316] text-[#F9F9FA] flex flex-col font-sans selection:bg-[#EA2B1F] selection:text-white">
      
      {/* Barra de Topo do Sistema Autônomo (App Shell SaaS) */}
      <header className="sticky top-0 z-50 w-full bg-[#181A1D] border-b border-[#343840] shadow-xl">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Identidade do Sistema */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={onBackToPortfolio}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#22252A] hover:bg-[#2B2F36] border border-[#343840] text-xs font-mono text-[#AEC3BA] hover:text-[#F9F9FA] transition-colors cursor-pointer group"
                title="Voltar ao Portfólio de Lucas Raphael Pedroso Muniz"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#EA2B1F]" />
                <span className="hidden sm:inline">Voltar ao Portfólio</span>
              </button>

              <div className="h-6 w-px bg-[#343840] hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#22252A] border border-[#343840] flex items-center justify-center text-[#EA2B1F] shadow-md">
                  {systemIcon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#F9F9FA] text-base sm:text-lg tracking-tight">
                      {systemName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EA2B1F]/15 text-[#FF6358] border border-[#EA2B1F]/30 uppercase font-semibold hidden sm:inline">
                      {systemBadge}
                    </span>
                  </div>
                  <p className="text-xs text-[#9DA7B3] hidden md:block">
                    {systemTagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Ações Centrais e Direitas do Sistema */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#22252A] border border-[#343840] text-xs font-mono text-[#AEC3BA]">
                <span className="w-2 h-2 rounded-full bg-[#EA2B1F] animate-pulse"></span>
                <span>Sessão em Memória • Interativo</span>
              </div>

              <Button
                size="sm"
                variant="primary"
                onClick={() => onHireSolution(systemId)}
                leftIcon={<Sparkles className="w-4 h-4" />}
                className="text-xs sm:text-sm font-semibold shadow-lg shadow-[#EA2B1F]/20"
              >
                <span className="hidden sm:inline">Quero um Sistema Como Este</span>
                <span className="sm:hidden">Contratar</span>
              </Button>
            </div>

          </div>
        </div>

        {/* Faixa Informativa da Demonstração (Sessão do Usuário) */}
        {showNotice && (
          <div className="bg-[#22252A]/90 border-t border-[#343840] px-4 py-2 text-xs text-[#9DA7B3] flex items-center justify-between gap-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 max-w-5xl mx-auto flex-grow">
              <Info className="w-4 h-4 text-[#AEC3BA] shrink-0" />
              <span>
                <strong className="text-[#F9F9FA]">Ambiente Demonstrativo Isolado:</strong> Explore, clique e teste todas as funcionalidades livremente. As operações são salvas em memória na sua sessão atual (recarregar a página restaura o estado padrão). Solução desenvolvida por <strong>Lucas Raphael Pedroso Muniz</strong>.
              </span>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="text-[#9DA7B3] hover:text-[#F9F9FA] p-1 rounded hover:bg-[#343840] transition-colors"
              title="Dispensar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </header>

      {/* Área de Aplicação do Sistema */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto w-full">
        {children}
      </main>

      {/* Barra Inferior Discreta do Sistema */}
      <footer className="w-full bg-[#181A1D] border-t border-[#343840] py-3 px-4 text-center text-xs text-[#9DA7B3] flex flex-col sm:flex-row items-center justify-between max-w-[1700px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Ambiente de demonstração autônomo operacional</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4">
          <button
            onClick={onBackToPortfolio}
            className="text-[#AEC3BA] hover:text-[#EA2B1F] underline transition-colors cursor-pointer"
          >
            Voltar ao Currículo e Portfólio de Lucas Muniz
          </button>
          <span>•</span>
          <button
            onClick={() => onHireSolution(systemId)}
            className="text-[#F9F9FA] hover:text-[#EA2B1F] font-semibold transition-colors cursor-pointer"
          >
            Solicitar Projeto Personalizado
          </button>
        </div>
      </footer>

    </div>
  );
};
