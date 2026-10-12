import React from 'react';
import { PERSONAL_INFO } from '../../data/personal-info';
import { Card } from '../../components/common/Card';
import { Compass, Lightbulb, Code2, ArrowRight } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-6 h-6 text-blue-400" />;
      case 1:
        return <Lightbulb className="w-6 h-6 text-cyan-400" />;
      case 2:
      default:
        return <Code2 className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900/50 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
            Metodologia Estruturada
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Como transformo necessidades em ferramentas funcionais
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            O trabalho nunca começa pela escolha precipitada de uma linguagem ou framework. Começa pela compreensão profunda do fluxo de trabalho da sua equipe.
          </p>
        </div>

        {/* 3 Etapas Visuais: Entender -> Projetar -> Desenvolver */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {PERSONAL_INFO.methodology.map((m, index) => (
            <Card
              key={m.step}
              variant="solid"
              className="relative p-8 bg-slate-900/90 border-slate-800 hover:border-slate-700 space-y-5"
            >
              {/* Número do Passo em Destaque */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                  {getStepIcon(index)}
                </div>
                <span className="text-3xl font-extrabold font-mono text-slate-700">
                  {m.step}
                </span>
              </div>

              {/* Título & Subtítulo */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white">
                  {m.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {m.subtitle}
                </div>
              </div>

              {/* Descrição */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {m.description}
              </p>

              {/* Indicador de fluxo no desktop */}
              {index < 2 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-950 border border-slate-700 items-center justify-center text-slate-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
