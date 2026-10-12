import React from 'react';
import type { NavPage } from '../../data/navigation';
import { DEMO_PROJECTS } from '../../data/demo-projects';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Terminal, 
  Layers, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Maximize2 
} from 'lucide-react';

interface DemosSectionProps {
  onNavigate: (page: NavPage) => void;
  onOpenDemo: (demoId: string) => void;
}

export const DemosSection: React.FC<DemosSectionProps> = ({
  onOpenDemo
}) => {
  const getDemoIcon = (id: string) => {
    switch (id) {
      case 'flowdesk':
        return <Terminal className="w-5 h-5 text-[#EA2B1F]" />;
      case 'flow-automation':
        return <Layers className="w-5 h-5 text-[#AEC3BA]" />;
      case 'process-impact':
      default:
        return <ArrowUpRight className="w-5 h-5 text-[#EA2B1F]" />;
    }
  };

  const getBadgeVariant = (id: string) => {
    switch (id) {
      case 'flowdesk':
        return 'red';
      case 'flow-automation':
        return 'mint';
      case 'process-impact':
      default:
        return 'red';
    }
  };

  return (
    <section className="py-20 bg-[#121316] border-t border-[#343840] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA2B1F]/15 border border-[#EA2B1F]/30 text-[#FF6358] text-xs font-mono uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Sistemas Autônomos em Páginas Isoladas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F9F9FA] tracking-tight">
            Experimente os Sistemas como se Fossem Seus
          </h2>
          <p className="text-base sm:text-lg text-[#9DA7B3]">
            Ao clicar, você é redirecionado a uma tela isolada da aplicação. Teste cada ferramenta com dados simulados em memória na sua sessão.
          </p>
        </div>

        {/* Grade dos 3 Mini-Sistemas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DEMO_PROJECTS.map((demo, index) => (
            <Card
              key={demo.id}
              variant="interactive"
              className="flex flex-col justify-between h-full group bg-[#181A1D] border-[#343840] hover:border-[#EA2B1F]"
              onClick={() => onOpenDemo(demo.id)}
            >
              <div className="space-y-6">
                
                {/* Header do Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#22252A] border border-[#343840] flex items-center justify-center">
                      {getDemoIcon(demo.id)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#AEC3BA] uppercase tracking-wider">
                        Sistema Isolado 0{index + 1}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#EA2B1F] transition-colors">
                        {demo.name}
                      </h3>
                    </div>
                  </div>
                  <Badge variant={getBadgeVariant(demo.id)} size="sm">
                    {demo.badge}
                  </Badge>
                </div>

                {/* Tagline e Problema */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-white leading-snug">
                    {demo.tagline}
                  </p>
                  <p className="text-xs text-[#9DA7B3] leading-relaxed">
                    <strong className="text-[#AEC3BA] font-semibold">Dor resolvida:</strong> {demo.problemSolved}
                  </p>
                </div>

                {/* Lista de Recursos Principais */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase text-[#AEC3BA] tracking-wider">
                    Destaques Funcionais:
                  </div>
                  <ul className="space-y-1.5">
                    {demo.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="text-xs text-[#9DA7B3] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EA2B1F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stacks Tecnológicas */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {demo.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22252A] text-[#AEC3BA] border border-[#343840]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Aviso Transparente de Sessão em Memória */}
                <div className="p-2.5 rounded-lg bg-[#22252A] border border-[#343840] text-[11px] text-[#9DA7B3] flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Ambiente interativo com dados mantidos na sessão atual do navegador.</span>
                </div>

              </div>

              {/* Ação de Experimentar em Página Isolada */}
              <div className="pt-6 mt-6 border-t border-[#343840]">
                <Button
                  size="md"
                  variant="primary"
                  className="w-full justify-center font-semibold"
                  leftIcon={<Maximize2 className="w-4 h-4" />}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onOpenDemo(demo.id);
                  }}
                >
                  Entrar no {demo.name} Isolado
                </Button>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
