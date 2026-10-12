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
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Maximize2
} from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenDemo: (demoId: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onNavigate,
  onOpenDemo
}) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-8 h-8 text-[#EA2B1F]" />;
      case 1:
        return <FileSpreadsheet className="w-8 h-8 text-[#AEC3BA]" />;
      case 2:
      default:
        return <TrendingUp className="w-8 h-8 text-[#EA2B1F]" />;
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#121316] text-[#F9F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Cabeçalho */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="red" icon={<Layers className="w-3.5 h-3.5" />}>
            Catálogo de Soluções Sob Medida
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F9F9FA] tracking-tight">
            Ferramentas empresariais projetadas para a sua rotina operacional
          </h1>
          <p className="text-lg text-[#9DA7B3] leading-relaxed">
            Elimine planilhas frágeis e tarefas manuais exaustivas com soluções desenvolvidas sob medida para as necessidades reais do seu negócio.
          </p>
        </div>

        {/* Lista Detalhada dos 3 Serviços */}
        <div className="space-y-12">
          {SERVICES_DATA.map((service, index) => (
            <Card
              key={service.id}
              variant="solid"
              className="p-8 sm:p-10 bg-[#181A1D] border-[#343840] space-y-8"
            >
              {/* Header do Serviço */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#343840] pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#22252A] border border-[#343840] flex items-center justify-center shrink-0">
                    {getIcon(index)}
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#AEC3BA] font-semibold tracking-wider">
                      {service.category}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <Badge variant={index === 0 ? 'red' : index === 1 ? 'mint' : 'red'} size="md">
                  {service.badge}
                </Badge>
              </div>

              {/* Descrição Completa */}
              <p className="text-base text-[#9DA7B3] leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Grid: Problemas que Resolve vs. Benefícios & Entregáveis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                
                {/* Dores Típicas Resolvidas */}
                <div className="p-6 rounded-xl bg-[#22252A] border border-[#343840] space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    Problemas que este serviço elimina:
                  </div>
                  <ul className="space-y-2">
                    {service.typicalProblems.map((prob, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-[#9DA7B3] flex items-start gap-2.5">
                        <span className="text-[#EA2B1F] font-bold shrink-0">•</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefícios & Entregáveis */}
                <div className="p-6 rounded-xl bg-[#22252A] border border-[#AEC3BA]/20 space-y-3">
                  <div className="flex items-center gap-2 text-[#AEC3BA] text-xs font-mono font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    O que sua empresa ganha:
                  </div>
                  <ul className="space-y-2">
                    {service.benefits.map((ben, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-[#9DA7B3] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#AEC3BA] shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Entregáveis Técnicos e Práticos */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase text-[#AEC3BA] tracking-wider font-semibold">
                  Entregáveis Desenvolvidos:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-lg bg-[#22252A] border border-[#343840] text-xs text-[#9DA7B3] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA2B1F] shrink-0"></span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rodapé do Card com Ações */}
              <div className="pt-6 border-t border-[#343840] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#9DA7B3] italic">
                  * Escopo e prazos orçados sob medida após diagnóstico da necessidade com Lucas Muniz.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {service.demoId && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenDemo(service.demoId!)}
                      leftIcon={<Maximize2 className="w-3.5 h-3.5 text-[#EA2B1F]" />}
                      className="w-full sm:w-auto text-xs font-mono"
                    >
                      Abrir Sistema Isolado
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('contato')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto text-xs font-bold"
                  >
                    {service.ctaText}
                  </Button>
                </div>
              </div>

            </Card>
          ))}
        </div>

        {/* Aviso de Precificação Sob Medida */}
        <div className="p-6 rounded-xl bg-[#181A1D] border border-[#343840] flex items-start gap-4 text-sm text-[#9DA7B3]">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-white">Como funciona o desenvolvimento sob medida?</h4>
            <p className="leading-relaxed">
              Não praticamos tabelas fixas genéricas porque cada empresa tem volumes de dados, integrações e complexidades diferentes. O primeiro passo é uma conversa de diagnóstico sem custo para entender sua demanda e apresentar uma proposta com escopo claro e cronograma realista.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
