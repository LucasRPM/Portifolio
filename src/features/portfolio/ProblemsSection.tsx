import React from 'react';
import type { NavPage } from '../../data/navigation';
import { OPERATIONAL_PAINS } from '../../data/problems';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface ProblemsSectionProps {
  onNavigate: (page: NavPage) => void;
  onOpenDemo?: (demoId: string) => void;
}

export const ProblemsSection: React.FC<ProblemsSectionProps> = ({
  onNavigate,
  onOpenDemo
}) => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            Diagnóstico Operacional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sua empresa enfrenta algum desses gargalos no dia a dia?
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A maioria dos desperdícios e atrasos não ocorre por falta de esforço da equipe, mas por processos manuais e sistemas desintegrados.
          </p>
        </div>

        {/* Grade de Dores Mapeadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPERATIONAL_PAINS.map((pain, index) => (
            <Card
              key={pain.id}
              variant="interactive"
              className="flex flex-col justify-between h-full group"
              onClick={() => {
                if (pain.targetDemoId && onOpenDemo) {
                  onOpenDemo(pain.targetDemoId);
                } else {
                  onNavigate('solucoes');
                }
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Cenário 0{index + 1}
                  </span>
                  <Badge variant="amber" size="sm">
                    {pain.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-300 transition-colors leading-snug">
                  {pain.question}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {pain.context}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-300">
                <div className="flex items-center gap-1.5 text-blue-400 font-mono">
                  <span>Solução: {pain.solutionCategory}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                  <span>{pain.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}

          {/* Card Especial de Chamada Direta */}
          <Card
            variant="solid"
            className="flex flex-col justify-between h-full bg-gradient-to-br from-blue-950/60 to-slate-900 border-blue-500/30"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Tem um desafio diferente que não está listado aqui?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cada empresa possui particularidades. Podemos agendar uma conversa curta para você me explicar a sua rotina atual e desenharmos juntos a melhor solução.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('contato');
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Descrever Meu Cenário</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};
