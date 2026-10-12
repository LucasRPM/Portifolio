import React from 'react';
import type { NavPage } from '../../data/navigation';
import { SERVICES_DATA } from '../../data/services';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Layers, 
  Terminal, 
  FileSpreadsheet, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';

interface SolutionsSectionProps {
  onNavigate: (page: NavPage) => void;
  onOpenDemo?: (demoId: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onNavigate,
  onOpenDemo
}) => {
  const getIconForCategory = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-6 h-6 text-blue-400" />;
      case 1:
        return <FileSpreadsheet className="w-6 h-6 text-cyan-400" />;
      case 2:
      default:
        return <TrendingUp className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Layers className="w-3.5 h-3.5" />
              Áreas de Atuação
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Soluções projetadas para a escala e realidade da sua empresa
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Sem sistemas genéricos engessados. Ferramentas construídas com foco exclusivo em resolver o problema do seu fluxo de trabalho.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => onNavigate('solucoes')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto shrink-0"
          >
            Ver Catálogo Completo
          </Button>
        </div>

        {/* Grade das 3 Categorias de Soluções */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <Card
              key={service.id}
              variant="solid"
              className="flex flex-col justify-between border-slate-800 bg-slate-900/80 hover:border-blue-500/40 transition-all duration-200"
            >
              <div className="space-y-6">
                
                {/* Header do Card */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                    {getIconForCategory(index)}
                  </div>
                  <Badge variant={index === 0 ? 'blue' : index === 1 ? 'cyan' : 'green'} size="sm">
                    {service.badge}
                  </Badge>
                </div>

                {/* Conteúdo */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Exemplos de Entregáveis */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
                    Entregáveis Típicos:
                  </div>
                  <ul className="space-y-2">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Ações do Card */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col gap-2.5">
                {service.demoId && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onOpenDemo ? onOpenDemo(service.demoId!) : onNavigate('demonstracoes')}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 text-cyan-400" />}
                    className="w-full justify-center text-xs font-mono"
                  >
                    Testar Demonstração do Projeto
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate('contato')}
                  className="w-full justify-center text-xs"
                >
                  {service.ctaText}
                </Button>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
