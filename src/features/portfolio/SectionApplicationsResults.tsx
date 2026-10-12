import React from 'react';
import { PORTFOLIO_CONTENT } from '../../data/portfolio-content';
import { 
  Building2, 
  Stethoscope, 
  Factory, 
  Users2, 
  LineChart, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';

export const SectionApplicationsResults: React.FC = () => {
  const { useCases, metrics } = PORTFOLIO_CONTENT.applicationsAndResults;

  // Ícones específicos para dar personalidade a cada setor industrial
  const sectorIcons = [
    <Stethoscope className="w-4 h-4 text-[#05AD98]" />,
    <Factory className="w-4 h-4 text-[#05AD98]" />,
    <Users2 className="w-4 h-4 text-[#05AD98]" />,
    <LineChart className="w-4 h-4 text-[#05AD98]" />
  ];

  return (
    <section id="resultados" className="py-14 sm:py-24 bg-white relative border-b border-[#DDE2E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#05AD98] text-xs font-mono font-extrabold border border-[#05AD98]/30 shadow-xs">
            <Building2 className="w-3.5 h-3.5" />
            Setores & Casos Reais
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
            Onde o trabalho resolve problemas de verdade
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] font-medium">
            Exemplos práticos de gargalos operacionais em diferentes setores que elimino com processos e softwares sob medida.
          </p>
        </div>

        {/* Grade 2x2 com Identidade Marcante de Business Case por Setor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#F8FAFA] border-2 border-[#DDE2E2] hover:border-[#05AD98] hover:bg-white transition-all space-y-4 shadow-xs group"
            >
              {/* Topo do Card: Badge de Setor e Título */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#DDE2E2] text-[11px] font-mono font-bold text-[#111827]">
                    {sectorIcons[idx] || <Building2 className="w-3.5 h-3.5 text-[#05AD98]" />}
                    <span>{item.sector}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#878787]">
                    CASO 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#111827] group-hover:text-[#05AD98] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Bloco da Dor Operacional Real */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E8ECEC] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Dor / Gargalo Comum:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4B5563] font-medium leading-relaxed">
                  {item.pain}
                </p>
              </div>

              {/* Bloco da Solução Engenheirada */}
              <div className="p-3.5 rounded-xl bg-[#E6F7F5] border border-[#05AD98]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#05AD98]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#05AD98]" />
                  <span>Solução Sob Medida:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#111827] font-semibold leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Faixa Inferior de Métricas de Impacto Tangível */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] text-white shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#05AD98] font-bold">
              Impacto Mensurável de Engenharia
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Sem burocracia, focado no resultado imediato
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            {metrics.map((m, mIdx) => (
              <div key={mIdx} className="space-y-1 p-2">
                <div className="text-2xl sm:text-3xl font-black text-[#05AD98] font-mono leading-none">
                  {m.metric}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {m.label}
                </div>
                <div className="text-[11px] text-gray-400 font-normal leading-tight">
                  {m.context}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
