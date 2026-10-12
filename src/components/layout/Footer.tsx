import React from 'react';
import type { NavPage } from '../../data/navigation';
import { PERSONAL_INFO } from '../../data/personal-info';
import { Cpu, ShieldCheck, ArrowUpRight, Terminal, Layers, FileText, Maximize2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenDemo?: (demoId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDemo }) => {
  const handleLaunchSystem = (systemId: string) => {
    if (onOpenDemo) {
      onOpenDemo(systemId);
    } else {
      onNavigate('demonstracoes');
    }
  };

  return (
    <footer className="w-full border-t border-[#343840] bg-[#121316] mt-auto text-[#9DA7B3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Coluna 1: Marca e Síntese */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EA2B1F] flex items-center justify-center text-white shadow-md shadow-[#EA2B1F]/30">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[#F9F9FA] text-lg tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            
            <p className="text-sm text-[#F9F9FA] leading-relaxed max-w-md">
              "{PERSONAL_INFO.headline}"
            </p>
            <p className="text-xs text-[#9DA7B3] leading-relaxed max-w-md">
              {PERSONAL_INFO.valueProposition}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#AEC3BA]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#EA2B1F]" />
              <span>Ambiente interativo com dados fictícios. Nenhum dado corporativo confidencial é exposto.</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-[#F9F9FA] uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#EA2B1F] transition-colors cursor-pointer"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('demonstracoes')}
                  className="hover:text-[#EA2B1F] transition-colors cursor-pointer"
                >
                  Demonstrações Interativas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('curriculo')}
                  className="hover:text-[#EA2B1F] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#AEC3BA]" />
                  <span>Currículo Online (CV)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solucoes')}
                  className="hover:text-[#EA2B1F] transition-colors cursor-pointer"
                >
                  Soluções & Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-[#EA2B1F] transition-colors cursor-pointer"
                >
                  Sobre Mim & Formação
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contato')}
                  className="hover:text-[#EA2B1F] transition-colors cursor-pointer"
                >
                  Diagnóstico & Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Mini-Sistemas */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-[#F9F9FA] uppercase tracking-wider">
              Sistemas Isolados
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLaunchSystem('flowdesk')}
                  className="hover:text-[#EA2B1F] transition-colors flex items-center gap-1.5 cursor-pointer text-left group"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#EA2B1F]" />
                  <span>FlowDesk (Central de Chamados)</span>
                  <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#EA2B1F] transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLaunchSystem('flow-automation')}
                  className="hover:text-[#EA2B1F] transition-colors flex items-center gap-1.5 cursor-pointer text-left group"
                >
                  <Layers className="w-3.5 h-3.5 text-[#AEC3BA]" />
                  <span>Flow Automation (Validador CSV)</span>
                  <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#AEC3BA] transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLaunchSystem('process-impact')}
                  className="hover:text-[#EA2B1F] transition-colors flex items-center gap-1.5 cursor-pointer text-left group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EA2B1F]" />
                  <span>Process Impact (Simulador ROI)</span>
                  <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#EA2B1F] transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha Inferior com Copyright e Paleta */}
        <div className="mt-12 pt-6 border-t border-[#343840] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9DA7B3]">
          <p>
            {PERSONAL_INFO.name} — Engenharia de Produção & Automação de Processos.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-[#AEC3BA]">React 19 + TypeScript + Tailwind</span>
            <span className="text-[#FF6358] flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#EA2B1F] animate-pulse"></span>
              Sistemas Autônomos em Memória
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
