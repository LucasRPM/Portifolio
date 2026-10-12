import React, { useState } from 'react';
import type { NavPage } from '../../data/navigation';
import { DEMO_PROJECTS } from '../../data/demo-projects';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { FlowDeskDemo } from '../flowdesk/FlowDeskDemo';
import { FlowAutomationDemo } from '../flow-automation/FlowAutomationDemo';
import { ProcessImpactDemo } from '../process-impact/ProcessImpactDemo';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  Calculator,
  Maximize2,
  ArrowRight
} from 'lucide-react';

interface DemosHubPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenSystem?: (systemId: string) => void;
  selectedDemoId?: string;
}

export const DemosHubPage: React.FC<DemosHubPageProps> = ({
  onNavigate,
  onOpenSystem,
  selectedDemoId = 'flowdesk'
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedDemoId);

  const currentDemo = DEMO_PROJECTS.find(d => d.id === activeTab) || DEMO_PROJECTS[0];

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'flowdesk':
        return <Terminal className="w-4 h-4 text-[#EA2B1F]" />;
      case 'flow-automation':
        return <Layers className="w-4 h-4 text-[#AEC3BA]" />;
      case 'process-impact':
      default:
        return <Calculator className="w-4 h-4 text-[#EA2B1F]" />;
    }
  };

  const handleLaunchCurrent = () => {
    if (onOpenSystem) {
      onOpenSystem(activeTab);
    }
  };

  return (
    <div className="py-10 md:py-16 bg-[#121316] text-[#F9F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Cabeçalho */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="red" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Sistemas Interativos & Isolados
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F9F9FA] tracking-tight">
            Experimentação Prática de Sistemas
          </h1>
          <p className="text-base sm:text-lg text-[#9DA7B3] leading-relaxed">
            Cada demonstração foi desenvolvida para funcionar como uma aplicação de software real. Você pode experimentá-las como páginas isoladas completas em tela cheia, com dados e operações mantidos em memória durante a sua sessão.
          </p>
        </div>

        {/* Banner para Acesso em Tela Cheia / Página Isolada */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#181A1D] via-[#22252A] to-[#181A1D] border border-[#EA2B1F]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA2B1F] animate-ping"></span>
              <span className="text-xs font-mono font-bold text-[#FF6358] uppercase">
                Modo Aplicação Autônoma Dedicada
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Quer testar o <span className="text-[#EA2B1F]">{currentDemo.name}</span> em tela cheia como um sistema independente?
            </h3>
            <p className="text-xs text-[#9DA7B3]">
              Abra a aplicação em ambiente isolado, sem cabeçalhos do portfólio, simulando o uso diário de uma equipe corporativa.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleLaunchCurrent}
            leftIcon={<Maximize2 className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0 w-full md:w-auto font-bold shadow-xl shadow-[#EA2B1F]/25"
          >
            Abrir {currentDemo.name} em Modo Isolado
          </Button>
        </div>

        {/* Seletor de Abas dos 3 Mini-Sistemas */}
        <div className="flex flex-wrap gap-3 border-b border-[#343840] pb-4">
          {DEMO_PROJECTS.map((demo) => {
            const isActive = activeTab === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveTab(demo.id)}
                className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3 border cursor-pointer ${
                  isActive
                    ? 'bg-[#22252A] text-white border-[#EA2B1F] shadow-lg shadow-[#EA2B1F]/20'
                    : 'bg-[#181A1D] text-[#9DA7B3] border-[#343840] hover:border-[#AEC3BA] hover:text-white'
                }`}
              >
                <span className="shrink-0">{getTabIcon(demo.id)}</span>
                <span className="font-bold">{demo.name}</span>
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#EA2B1F]/20 text-[#FF6358]' : 'bg-[#22252A] text-[#AEC3BA]'
                }`}>
                  {demo.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resumo Rápido da Aplicação Selecionada */}
        <div className="p-4 rounded-xl bg-[#181A1D] border border-[#343840] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#9DA7B3]">
          <div>
            <span className="font-mono text-[#AEC3BA] uppercase font-bold mr-2">Sistema Ativo:</span>
            <strong className="text-white text-sm">{currentDemo.name}</strong> — {currentDemo.tagline}
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-[11px] font-mono text-[#AEC3BA]">Stack: {currentDemo.techStack.slice(0, 3).join(', ')}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLaunchCurrent}
              leftIcon={<Maximize2 className="w-3.5 h-3.5 text-[#EA2B1F]" />}
              className="text-xs"
            >
              Modo Isolado
            </Button>
          </div>
        </div>

        {/* RENDERIZAÇÃO DO MINI-SISTEMA ATIVO */}
        <div className="pt-2">
          {activeTab === 'flowdesk' && (
            <FlowDeskDemo onContactRequest={() => onNavigate('contato')} />
          )}

          {activeTab === 'flow-automation' && (
            <FlowAutomationDemo onContactRequest={() => onNavigate('contato')} />
          )}

          {activeTab === 'process-impact' && (
            <ProcessImpactDemo onContactRequest={() => onNavigate('contato')} />
          )}
        </div>

      </div>
    </div>
  );
};
