import React from 'react';
import type { NavPage } from '../../data/navigation';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  Info
} from 'lucide-react';

interface CredibilitySectionProps {
  onNavigate: (page: NavPage) => void;
}

export const CredibilitySection: React.FC<CredibilitySectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Narrativa de Formação e Experiência */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              Fundamentos & Experiência Prática
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A união entre o rigor da Engenharia e a entrega de software
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Minha formação em <strong>Engenharia de Produção</strong> me deu a base analítica para enxergar operações como fluxos integrados: onde o tempo é gasto, onde estão os retrabalhos e quais etapas geram valor real para a empresa.
            </p>

            <p className="text-base text-slate-300 leading-relaxed">
              Em experiências com rotinas administrativas, conferência de tabelas de faturamento, contratos e organização documental, vivenciei na prática a dor das equipes que dependem de preenchimentos manuais e sistemas engessados.
            </p>

            {/* Destaque do Caso Real de Automação */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Redução observada de aproximadamente 1/3 do tempo
                  </h4>
                  <p className="text-xs text-slate-300">
                    Otimização em rotina administrativa através de planilhas integradas e automação.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-12">
                Ao mapear o processo e automatizar a conferência de dados, eliminamos etapas repetitivas e retrabalhos de digitação, agilizando o fechamento e elevando a confiabilidade das informações.
              </p>
            </div>

            {/* Distinção Ética e Transparente */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Nota de transparência:</strong> O resultado acima reflete um caso prático vivenciado em rotina específica. Não é apresentado como garantia matemática para qualquer projeto futuro, pois cada empresa e fluxo de trabalho possuem variáveis próprias.
              </span>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => onNavigate('sobre')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Conhecer Minha Trajetória Completa
              </Button>
            </div>
          </div>

          {/* Lado Direito: Pilares Práticos */}
          <div className="lg:col-span-5 space-y-4">
            
            <Card variant="solid" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 uppercase font-semibold">Pilar 01</span>
                <Badge variant="blue">Processos & Padrões</Badge>
              </div>
              <h4 className="text-base font-bold text-white">Mapeamento e Padronização de Processos</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Padronização clara das tarefas para que a equipe saiba exatamente o que fazer, facilitando a transição de funções e o treinamento de novos colaboradores.
              </p>
            </Card>

            <Card variant="solid" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Pilar 02</span>
                <Badge variant="cyan">Dados & Consistência</Badge>
              </div>
              <h4 className="text-base font-bold text-white">Integridade e Validação de Informações</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conferência e sanitização sistemática de dados de contratos, exames, tabelas e faturamentos para evitar divergências e perdas financeiras.
              </p>
            </Card>

            <Card variant="solid" className="p-6 bg-slate-900/90 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">Pilar 03</span>
                <Badge variant="green">Tecnologia Aplicada</Badge>
              </div>
              <h4 className="text-base font-bold text-white">Sistemas e Automações Úteis</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Construção de aplicações e scripts em Python/React orientados à utilidade prática imediata, eliminando tarefas enfadonhas e repetitivas.
              </p>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
};
