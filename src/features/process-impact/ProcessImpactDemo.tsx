import React, { useState, useMemo } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Trash2, 
  Workflow, 
  AlertCircle
} from 'lucide-react';

interface ProcessStep {
  id: string;
  name: string;
  currentMinutes: number;
  improvedMinutes: number;
}

const PRESETS = [
  {
    name: "Conferência de Faturamento e Lotes de Exames",
    executionsMonthly: 450,
    currentMinutes: 25,
    improvedMinutes: 8,
    hourlyRate: 35,
    monthlyToolCost: 150,
    initialInvestment: 1200,
    steps: [
      { id: '1', name: 'Baixar relatório de exames', currentMinutes: 5, improvedMinutes: 1 },
      { id: '2', name: 'Conferir preços item a item na planilha', currentMinutes: 15, improvedMinutes: 4 },
      { id: '3', name: 'Preencher lote de faturamento no sistema', currentMinutes: 5, improvedMinutes: 3 }
    ]
  },
  {
    name: "Digitação e Conciliação de Pedidos de Compras",
    executionsMonthly: 200,
    currentMinutes: 35,
    improvedMinutes: 10,
    hourlyRate: 30,
    monthlyToolCost: 100,
    initialInvestment: 800,
    steps: [
      { id: '1', name: 'Receber pedido por e-mail ou WhatsApp', currentMinutes: 8, improvedMinutes: 2 },
      { id: '2', name: 'Validar dados com fornecedor', currentMinutes: 12, improvedMinutes: 4 },
      { id: '3', name: 'Digitar no sistema de controle', currentMinutes: 15, improvedMinutes: 4 }
    ]
  },
  {
    name: "Geração Manual de Relatórios Gerenciais",
    executionsMonthly: 80,
    currentMinutes: 60,
    improvedMinutes: 15,
    hourlyRate: 45,
    monthlyToolCost: 200,
    initialInvestment: 1500,
    steps: [
      { id: '1', name: 'Extrair dados de 3 fontes distintas', currentMinutes: 20, improvedMinutes: 5 },
      { id: '2', name: 'Consolidar fórmulas no Excel', currentMinutes: 25, improvedMinutes: 5 },
      { id: '3', name: 'Formatar PDF e enviar à diretoria', currentMinutes: 15, improvedMinutes: 5 }
    ]
  }
];

interface ProcessImpactDemoProps {
  onContactRequest?: () => void;
}

export const ProcessImpactDemo: React.FC<ProcessImpactDemoProps> = ({ onContactRequest }) => {
  // Entradas do modelo
  const [processName, setProcessName] = useState(PRESETS[0].name);
  const [executionsMonthly, setExecutionsMonthly] = useState<number>(PRESETS[0].executionsMonthly);
  const [currentMinutes, setCurrentMinutes] = useState<number>(PRESETS[0].currentMinutes);
  const [improvedMinutes, setImprovedMinutes] = useState<number>(PRESETS[0].improvedMinutes);
  const [hourlyRate, setHourlyRate] = useState<number>(PRESETS[0].hourlyRate);
  const [monthlyToolCost, setMonthlyToolCost] = useState<number>(PRESETS[0].monthlyToolCost);
  const [initialInvestment, setInitialInvestment] = useState<number>(PRESETS[0].initialInvestment);

  // Construtor visual de etapas do processo (opcional interativo)
  const [showStepBuilder, setShowStepBuilder] = useState(false);
  const [steps, setSteps] = useState<ProcessStep[]>(PRESETS[0].steps);

  // Aplicação de Presets
  const handleApplyPreset = (index: number) => {
    const p = PRESETS[index];
    setProcessName(p.name);
    setExecutionsMonthly(p.executionsMonthly);
    setCurrentMinutes(p.currentMinutes);
    setImprovedMinutes(p.improvedMinutes);
    setHourlyRate(p.hourlyRate);
    setMonthlyToolCost(p.monthlyToolCost);
    setInitialInvestment(p.initialInvestment);
    setSteps(p.steps);
  };

  // Sincroniza tempos se usar o construtor de etapas
  const syncStepsToTotal = (newSteps: ProcessStep[]) => {
    const totalCurrent = newSteps.reduce((acc, s) => acc + s.currentMinutes, 0);
    const totalImproved = newSteps.reduce((acc, s) => acc + s.improvedMinutes, 0);
    setCurrentMinutes(totalCurrent);
    setImprovedMinutes(totalImproved);
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    const newStep: ProcessStep = {
      id: String(Date.now()),
      name: `Nova etapa ${steps.length + 1}`,
      currentMinutes: 10,
      improvedMinutes: 3
    };
    syncStepsToTotal([...steps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    syncStepsToTotal(steps.filter(s => s.id !== id));
  };

  // CÁLCULOS MATEMÁTICOS DE ENGENHARIA DE PRODUÇÃO
  const calculations = useMemo(() => {
    // 1. Horas mensais atuais
    const currentHoursMonthly = (executionsMonthly * currentMinutes) / 60;

    // 2. Horas mensais após a melhoria
    const improvedHoursMonthly = (executionsMonthly * improvedMinutes) / 60;

    // 3. Horas potencialmente liberadas
    const hoursReleasedMonthly = Math.max(0, currentHoursMonthly - improvedHoursMonthly);
    const percentageReduction = currentMinutes > 0 
      ? Math.round(((currentMinutes - improvedMinutes) / currentMinutes) * 100)
      : 0;

    // 4. Custo de referência do tempo atual
    const currentCostMonthly = currentHoursMonthly * hourlyRate;

    // 5. Custo de referência do tempo após melhoria
    const improvedCostMonthly = improvedHoursMonthly * hourlyRate;

    // 6. Valor mensal potencialmente liberado
    const valueReleasedMonthly = hoursReleasedMonthly * hourlyRate;

    // 7. Economia mensal líquida estimada
    const netMonthlySavings = valueReleasedMonthly - monthlyToolCost;

    // 8. Retorno mensal sobre custo recorrente (ROI operacional)
    const monthlyRoiMultiplier = monthlyToolCost > 0
      ? (netMonthlySavings / monthlyToolCost)
      : 0;

    // 9. Prazo de retorno do investimento inicial (Payback em meses)
    const paybackMonths = (initialInvestment > 0 && netMonthlySavings > 0)
      ? (initialInvestment / netMonthlySavings)
      : 0;

    return {
      currentHoursMonthly: Math.round(currentHoursMonthly * 10) / 10,
      improvedHoursMonthly: Math.round(improvedHoursMonthly * 10) / 10,
      hoursReleasedMonthly: Math.round(hoursReleasedMonthly * 10) / 10,
      percentageReduction,
      currentCostMonthly: Math.round(currentCostMonthly),
      improvedCostMonthly: Math.round(improvedCostMonthly),
      valueReleasedMonthly: Math.round(valueReleasedMonthly),
      netMonthlySavings: Math.round(netMonthlySavings),
      monthlyRoiMultiplier: Math.round(monthlyRoiMultiplier * 10) / 10,
      paybackMonths: Math.round(paybackMonths * 10) / 10
    };
  }, [executionsMonthly, currentMinutes, improvedMinutes, hourlyRate, monthlyToolCost, initialInvestment]);

  // Formatação de Moeda BRL
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Cabeçalho da Ferramenta */}
      <div className="p-5 rounded-xl bg-[#1F2B37] border border-[#36485C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#77F2A1] uppercase font-bold">
            <Sparkles className="w-4 h-4" />
            Engenharia de Produção Aplicada: Simulador de Impacto & ROI
          </div>
          <h3 className="text-base font-bold text-white">
            Quantifique quanto tempo e dinheiro um gargalo consome antes de investir em software
          </h3>
          <p className="text-xs text-[#8B9EAF]">
            Ajuste os valores abaixo ou escolha um cenário pré-configurado para simular o ganho.
          </p>
        </div>

        {/* Presets Rápidos */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[#8B9EAF]">Cenários:</span>
          {PRESETS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(idx)}
              className="px-2.5 py-1 rounded bg-[#253443] hover:bg-[#4F76F6] text-xs text-[#C5D1DE] hover:text-white border border-[#36485C] transition-colors cursor-pointer"
            >
              Exemplo 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE ENTRADAS VS RESULTADOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LADO ESQUERDO: ENTRADAS DO SIMULADOR (5 Colunas) */}
        <div className="lg:col-span-5 space-y-5">
          <Card variant="solid" className="p-6 bg-[#1F2B37] border-[#36485C] space-y-4">
            <div className="flex items-center justify-between border-b border-[#36485C] pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#4F76F6]" />
                Variáveis da Operação
              </h4>
              <span className="text-[11px] font-mono text-[#77F2A1]">Editável</span>
            </div>

            {/* Nome do Processo */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#8B9EAF]">Nome da Rotina / Tarefa:</label>
              <input
                type="text"
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
              />
            </div>

            {/* Volume Mensal */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8B9EAF]">Execuções no Mês:</span>
                <span className="text-[#F9F9F9] font-bold">{executionsMonthly} vezes</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={executionsMonthly}
                onChange={(e) => setExecutionsMonthly(Number(e.target.value))}
                className="w-full accent-[#4F76F6]"
              />
            </div>

            {/* Tempos: Atual vs Melhorado */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8B9EAF]">Tempo Atual (minutos):</label>
                <input
                  type="number"
                  min="1"
                  max="600"
                  value={currentMinutes}
                  onChange={(e) => setCurrentMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#77F2A1]">Após Melhoria (minutos):</label>
                <input
                  type="number"
                  min="1"
                  max="600"
                  value={improvedMinutes}
                  onChange={(e) => setImprovedMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#77F2A1]/50 text-sm text-[#77F2A1] font-bold focus:outline-none focus:ring-2 focus:ring-[#77F2A1]"
                />
              </div>
            </div>

            {/* Custo Hora/Homem */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8B9EAF]">Custo Estimado da Hora (R$/h):</span>
                <span className="text-[#F9F9F9] font-bold">{formatBRL(hourlyRate)}/h</span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-[#77F2A1]"
              />
            </div>

            {/* Custos da Solução */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#36485C]">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#8B9EAF]">Custo Mensal Solução (R$):</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={monthlyToolCost}
                  onChange={(e) => setMonthlyToolCost(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#253443] border border-[#36485C] text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#8B9EAF]">Investimento Inicial (R$):</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#253443] border border-[#36485C] text-xs text-white"
                />
              </div>
            </div>

            {/* Toggle para Construtor de Etapas */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowStepBuilder(!showStepBuilder)}
                className="text-xs font-mono text-[#85A1FC] hover:text-[#77F2A1] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>{showStepBuilder ? "Ocultar Construtor de Etapas" : "Detalhar Etapas do Processo (Opcional)"}</span>
              </button>
            </div>

            {/* Construtor Visual de Etapas */}
            {showStepBuilder && (
              <div className="p-3 rounded-xl bg-[#141D26] border border-[#36485C] space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Etapas do Fluxo:</span>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="p-1 rounded bg-[#4F76F6] text-white hover:bg-[#3B62E3] cursor-pointer"
                    title="Adicionar etapa"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {steps.map((st, sIdx) => (
                    <div key={st.id} className="p-2 rounded bg-[#1F2B37] border border-[#36485C] flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-[#8B9EAF]">0{sIdx + 1}.</span>
                      <span className="truncate flex-grow text-white">{st.name}</span>
                      <span className="font-mono text-amber-400">{st.currentMinutes}m</span>
                      <span className="text-[#8B9EAF]">→</span>
                      <span className="font-mono text-[#77F2A1]">{st.improvedMinutes}m</span>
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(st.id)}
                          className="text-[#8B9EAF] hover:text-rose-400 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </Card>
        </div>

        {/* LADO DIREITO: RESULTADOS & IMPACTO VISUAL (7 Colunas) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Card Principal: Horas Liberadas e Economia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Card variant="solid" className="p-6 bg-gradient-to-br from-[#1F2B37] to-[#253443] border border-[#77F2A1]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#77F2A1] uppercase font-bold tracking-wider">
                  Tempo Liberado no Mês
                </span>
                <Clock className="w-4 h-4 text-[#77F2A1]" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#77F2A1]">
                {calculations.hoursReleasedMonthly} horas
              </div>
              <p className="text-xs text-[#C5D1DE]">
                Equivale a uma redução de <strong className="text-white">{calculations.percentageReduction}%</strong> no tempo desta atividade.
              </p>
            </Card>

            <Card variant="solid" className="p-6 bg-gradient-to-br from-[#1F2B37] to-[#253443] border border-[#4F76F6]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#85A1FC] uppercase font-bold tracking-wider">
                  Economia Líquida Estimada
                </span>
                <DollarSign className="w-4 h-4 text-[#4F76F6]" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F9F9F9]">
                {formatBRL(calculations.netMonthlySavings)}
                <span className="text-xs text-[#8B9EAF] font-normal"> /mês</span>
              </div>
              <p className="text-xs text-[#C5D1DE]">
                Já descontado o custo mensal estimado de {formatBRL(monthlyToolCost)}.
              </p>
            </Card>

          </div>

          {/* Gráfico Visual Comparativo: Antes vs Depois */}
          <Card variant="solid" className="p-6 bg-[#1F2B37] border-[#36485C] space-y-6">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#77F2A1]" />
              Comparativo de Impacto Mensal: Antes vs. Depois
            </h4>

            {/* Barra de Tempo */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8B9EAF]">Horas Consumidas no Mês:</span>
                <span>
                  <strong className="text-amber-400">{calculations.currentHoursMonthly}h</strong> antes vs{' '}
                  <strong className="text-[#77F2A1]">{calculations.improvedHoursMonthly}h</strong> depois
                </span>
              </div>
              <div className="h-4 rounded-full bg-[#141D26] overflow-hidden flex">
                <div 
                  className="bg-amber-400/80 transition-all duration-500" 
                  style={{ width: `${Math.min(100, (calculations.improvedHoursMonthly / (calculations.currentHoursMonthly || 1)) * 100)}%` }}
                  title="Horas após melhoria"
                ></div>
                <div 
                  className="bg-[#77F2A1] transition-all duration-500 flex-grow" 
                  title="Horas liberadas para outras tarefas"
                ></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#8B9EAF]">
                <span>Tempo residual da tarefa</span>
                <span className="text-[#77F2A1]">Capacidade liberada</span>
              </div>
            </div>

            {/* Barra de Custo de Referência */}
            <div className="space-y-2 pt-2 border-t border-[#36485C]">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8B9EAF]">Custo Financeiro de Referência:</span>
                <span>
                  <strong className="text-amber-400">{formatBRL(calculations.currentCostMonthly)}</strong> vs{' '}
                  <strong className="text-[#77F2A1]">{formatBRL(calculations.improvedCostMonthly)}</strong>
                </span>
              </div>
              <div className="h-4 rounded-full bg-[#141D26] overflow-hidden flex">
                <div 
                  className="bg-[#4F76F6] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (calculations.improvedCostMonthly / (calculations.currentCostMonthly || 1)) * 100)}%` }}
                ></div>
                <div 
                  className="bg-[#77F2A1] transition-all duration-500 flex-grow" 
                ></div>
              </div>
            </div>

            {/* Indicador de Payback / Retorno */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#36485C] text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#253443]">
                <div className="text-[#8B9EAF]">Payback do Investimento:</div>
                <div className="text-base font-bold text-white mt-1">
                  {calculations.paybackMonths > 0 
                    ? `~${calculations.paybackMonths} meses` 
                    : "Retorno Imediato"}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#253443]">
                <div className="text-[#8B9EAF]">Retorno sobre Custo Recorrente:</div>
                <div className="text-base font-bold text-[#77F2A1] mt-1">
                  {calculations.monthlyRoiMultiplier > 0 
                    ? `${calculations.monthlyRoiMultiplier}x o valor investido` 
                    : "Zero custo mensal"}
                </div>
              </div>
            </div>

          </Card>

          {/* NOTA ÉTICA DE ENGENHARIA DE PRODUÇÃO */}
          <div className="p-4 rounded-xl bg-[#253443] border border-[#36485C] text-xs text-[#8B9EAF] flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#77F2A1] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Premissa de Engenharia:</strong> As horas liberadas representam <span className="text-white font-medium">capacidade produtiva recuperada</span> para sua equipe focar em atendimento, qualidade e análise, e não necessariamente corte automático de custos fixos de folha.
            </p>
          </div>

          {/* BANNER COMERCIAL CONTEXTUAL */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#1F2B37] via-[#253443] to-[#1F2B37] border border-[#4F76F6]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">
                Quer analisar um processo real da sua empresa e estimar o ROI?
              </h4>
              <p className="text-xs text-[#C5D1DE]">
                Posso mapear seu fluxo de trabalho atual e calcular com precisão matemática as oportunidades de melhoria.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onContactRequest}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shrink-0"
            >
              Agendar Diagnóstico Operacional
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
};
