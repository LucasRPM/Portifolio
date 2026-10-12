import React from 'react';
import type { NavPage } from '../../data/navigation';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProfileAvatar } from '../../components/common/ProfileAvatar';
import { PERSONAL_INFO } from '../../data/personal-info';
import { 
  ArrowRight, 
  Terminal, 
  Workflow, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  Clock, 
  FileText, 
  MapPin,
  Maximize2 
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: NavPage) => void;
  onOpenDemo?: (demoId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenDemo
}) => {
  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-palette-glow bg-[#121316]">
      {/* Grid de fundo com padrão sutil */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card de Apresentação com Nome e Foto Oficial de Lucas Muniz */}
        <div className="mb-10 p-6 rounded-2xl bg-[#181A1D] border border-[#343840] shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 backdrop-blur-md">
          <div className="shrink-0">
            <ProfileAvatar name={PERSONAL_INFO.name} size="lg" />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-grow">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="red" icon={<Workflow className="w-3 h-3" />}>
                Engenharia de Produção
              </Badge>
              <Badge variant="mint" icon={<Terminal className="w-3 h-3" />}>
                Mapeamento & Automação de Processos
              </Badge>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F9F9FA] tracking-tight">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#AEC3BA] font-mono mt-0.5">
                {PERSONAL_INFO.title}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#9DA7B3] font-mono pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EA2B1F]" />
                {PERSONAL_INFO.location}
              </span>
              <span className="text-[#AEC3BA] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EA2B1F] animate-pulse"></span>
                Disponível para novos projetos e desenvolvimento sob medida
              </span>
            </div>
          </div>

          <div className="self-center sm:self-center shrink-0 flex sm:flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate('curriculo')}
              leftIcon={<FileText className="w-3.5 h-3.5 text-[#AEC3BA]" />}
              className="text-xs"
            >
              Ver Currículo
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => onNavigate('contato')}
              className="text-xs font-bold"
            >
              Falar Comigo
            </Button>
          </div>
        </div>

        {/* Grade Principal: Mensagem de Impacto & Arquitetura de Processos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Lado Esquerdo: Mensagem Central */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F9F9FA] leading-[1.12]">
              Transformo problemas operacionais em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA2B1F] via-[#FF6358] to-[#AEC3BA]">
                soluções tecnológicas.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-[#9DA7B3] leading-relaxed max-w-2xl">
              {PERSONAL_INFO.subheadline}
            </p>

            {/* Card com a Proposta de Valor */}
            <div className="p-4 rounded-xl bg-[#181A1D] border border-[#343840] backdrop-blur-sm max-w-2xl">
              <p className="text-sm text-[#F9F9FA] flex items-start gap-3">
                <span className="p-1.5 rounded-lg bg-[#EA2B1F]/20 text-[#EA2B1F] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span>
                  <strong className="text-white">Visão da Engenharia de Produção:</strong> Compreendo o fluxo de trabalho real, mapeio gargalos, organizo dados e desenvolvo sistemas e automações com foco em resultados mensuráveis.
                </span>
              </p>
            </div>

            {/* CTAs de Ação */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                size="lg"
                variant="primary"
                onClick={() => onOpenDemo ? onOpenDemo('flowdesk') : onNavigate('demonstracoes')}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="font-bold shadow-xl shadow-[#EA2B1F]/30"
              >
                Explorar Sistemas Isolados
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('curriculo')}
                leftIcon={<FileText className="w-5 h-5 text-[#AEC3BA]" />}
              >
                Abrir Currículo Completo
              </Button>
            </div>

            {/* Micro métricas de credibilidade com sálvia e vermelho */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#9DA7B3]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#EA2B1F]" />
                <span className="text-white">3 Sistemas Isolados Prontos para Teste</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#AEC3BA]" />
                <span className="text-white">Redução Comprovada de ~1/3 do Tempo em Rotina</span>
              </div>
            </div>

          </div>

          {/* Lado Direito: Composição Visual da Solução */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              <div className="absolute -inset-1 bg-gradient-to-r from-[#EA2B1F] to-[#AEC3BA] rounded-2xl blur-xl opacity-20"></div>

              <div className="relative rounded-2xl bg-[#181A1D] border border-[#343840] shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Janela de Sistema */}
                <div className="px-4 py-3 bg-[#121316] border-b border-[#343840] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#EA2B1F]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#AEC3BA]"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                    <span className="ml-2 text-xs font-mono text-[#9DA7B3]">
                      lucas_muniz.process_engine
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#FF6358] bg-[#EA2B1F]/10 px-2 py-0.5 rounded border border-[#EA2B1F]/30 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA2B1F] animate-ping"></span>
                    Sistemas em Sessão Ativa
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  
                  {/* Etapa 1: Gargalo Atual */}
                  <div className="p-3.5 rounded-xl bg-[#22252A] border border-[#343840] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#9DA7B3]">Cenário Inicial</div>
                        <div className="text-sm font-semibold text-white">Tarefas Manuais & Planilhas Soltas</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                      Gargalos
                    </span>
                  </div>

                  <div className="flex items-center justify-center py-0.5">
                    <div className="h-4 w-px bg-gradient-to-b from-amber-500/40 via-[#EA2B1F] to-[#AEC3BA]"></div>
                  </div>

                  {/* Etapa 2: A Solução Tecnológica */}
                  <div className="p-4 rounded-xl bg-[#121316] border border-[#EA2B1F]/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#EA2B1F]" />
                        <span className="text-xs font-mono font-bold text-[#FF6358]">
                          ENGENHARIA + SISTEMAS
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#AEC3BA] bg-[#AEC3BA]/15 px-2 py-0.5 rounded font-semibold">
                        Regras Lógicas
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-xs">
                      <div className="p-2 rounded bg-[#22252A] border border-[#343840]">
                        <div className="text-[#9DA7B3] text-[10px]">Entrada</div>
                        <div className="text-white font-medium">Dados / CSV</div>
                      </div>
                      <div className="p-2 rounded bg-[#22252A] border border-[#343840]">
                        <div className="text-[#9DA7B3] text-[10px]">Back-end</div>
                        <div className="text-[#AEC3BA] font-medium">FastAPI</div>
                      </div>
                      <div className="p-2 rounded bg-[#22252A] border border-[#343840]">
                        <div className="text-[#9DA7B3] text-[10px]">Front-end</div>
                        <div className="text-[#EA2B1F] font-medium">React Web</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-0.5">
                    <div className="h-4 w-px bg-gradient-to-b from-[#EA2B1F] to-[#AEC3BA]"></div>
                  </div>

                  {/* Etapa 3: Resultado */}
                  <div className="p-3.5 rounded-xl bg-[#EA2B1F]/10 border border-[#EA2B1F]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EA2B1F]/20 border border-[#EA2B1F]/40 flex items-center justify-center text-[#EA2B1F]">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#9DA7B3]">Resultado Observado</div>
                        <div className="text-sm font-bold text-[#FF6358]">~1/3 de tempo liberado</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#EA2B1F] bg-[#EA2B1F]/20 px-2 py-1 rounded font-bold">
                      Alta Eficiência
                    </span>
                  </div>

                  {/* Botões Rápidos para Acessar os 3 Sistemas em Páginas Isoladas */}
                  <div className="pt-2 border-t border-[#343840] grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onOpenDemo ? onOpenDemo('flowdesk') : onNavigate('demonstracoes')}
                      className="p-2 rounded-lg bg-[#22252A] hover:bg-[#2B2F36] hover:border-[#EA2B1F] border border-[#343840] text-left transition-colors group cursor-pointer"
                      title="Abrir FlowDesk como página isolada"
                    >
                      <div className="text-[10px] font-mono text-[#EA2B1F] flex items-center justify-between">
                        01. SaaS <Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#EA2B1F]">FlowDesk</div>
                    </button>
                    <button
                      onClick={() => onOpenDemo ? onOpenDemo('flow-automation') : onNavigate('demonstracoes')}
                      className="p-2 rounded-lg bg-[#22252A] hover:bg-[#2B2F36] hover:border-[#AEC3BA] border border-[#343840] text-left transition-colors group cursor-pointer"
                      title="Abrir Flow Automation como página isolada"
                    >
                      <div className="text-[10px] font-mono text-[#AEC3BA] flex items-center justify-between">
                        02. Dados <Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#AEC3BA]">Automação</div>
                    </button>
                    <button
                      onClick={() => onOpenDemo ? onOpenDemo('process-impact') : onNavigate('demonstracoes')}
                      className="p-2 rounded-lg bg-[#22252A] hover:bg-[#2B2F36] hover:border-[#EA2B1F] border border-[#343840] text-left transition-colors group cursor-pointer"
                      title="Abrir Process Impact como página isolada"
                    >
                      <div className="text-[10px] font-mono text-[#EA2B1F] flex items-center justify-between">
                        03. ROI <Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#EA2B1F]">Simulador</div>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
