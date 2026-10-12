import React from 'react';
import type { NavPage } from '../../data/navigation';
import { Button } from '../../components/common/Button';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface CtaContactSectionProps {
  onNavigate: (page: NavPage) => void;
}

export const CtaContactSection: React.FC<CtaContactSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Próximo Passo
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Tem um processo que poderia funcionar melhor?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Conte como sua empresa trabalha hoje e vamos identificar uma solução adequada para sua necessidade.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => onNavigate('contato')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto font-semibold shadow-xl shadow-blue-600/30"
          >
            Descrever meu problema
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('demonstracoes')}
            leftIcon={<MessageSquare className="w-5 h-5 text-cyan-400" />}
            className="w-full sm:w-auto"
          >
            Experimentar os Mini-Sistemas
          </Button>
        </div>

        <div className="pt-4 text-xs text-slate-400 max-w-md mx-auto">
          Conversa consultiva e sem compromisso. Foco em entender a sua rotina operacional antes de propor qualquer desenvolvimento.
        </div>

      </div>
    </section>
  );
};
