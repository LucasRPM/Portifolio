export interface OperationalPain {
  id: string;
  question: string;
  context: string;
  solutionCategory: string;
  solutionTitle: string;
  badge: string;
  actionText: string;
  targetServiceId: string;
  targetDemoId: string;
}

export const OPERATIONAL_PAINS: OperationalPain[] = [
  {
    id: "pain-repetitive-tasks",
    question: "Você repete diariamente tarefas manuais que poderiam ser automatizadas?",
    context: "Sua equipe gasta horas preciosas do dia digitando dados repetitivos, conferindo formulários ou preenchendo as mesmas informações em locais diferentes.",
    solutionCategory: "Automação Operacional",
    solutionTitle: "Scripts de automação e rotinas programadas para eliminar tarefas repetitivas.",
    badge: "Economia de Tempo",
    actionText: "Ver como automatizar",
    targetServiceId: "automacao-e-integracao",
    targetDemoId: "flow-automation"
  },
  {
    id: "pain-spreadsheets",
    question: "Sua empresa depende de várias planilhas desconectadas para controlar a operação?",
    context: "Arquivos duplicados, fórmulas quebradas, versões conflitantes e o risco constante de perder informações importantes por falta de um sistema central.",
    solutionCategory: "Sistemas Sob Medida",
    solutionTitle: "Sistemas web internos centralizados com banco de dados estruturado e seguro.",
    badge: "Segurança de Dados",
    actionText: "Conhecer sistemas web",
    targetServiceId: "sistemas-personalizados",
    targetDemoId: "flowdesk"
  },
  {
    id: "pain-manual-copy",
    question: "Informações precisam ser copiadas manualmente entre sistemas ou arquivos?",
    context: "Digitação duplicada que gera lentidão, cansaço na equipe e alta probabilidade de divergência de dados entre o faturamento e a operação.",
    solutionCategory: "Integração & Tratamento",
    solutionTitle: "Tratamento automatizado de arquivos e integração direta de dados.",
    badge: "Zero Digitação Dupla",
    actionText: "Testar processador de dados",
    targetServiceId: "automacao-e-integracao",
    targetDemoId: "flow-automation"
  },
  {
    id: "pain-tracking-requests",
    question: "É difícil acompanhar solicitações, prazos, pendências e responsáveis?",
    context: "Demandas perdidas em caixas de entrada de e-mail e conversas informais de WhatsApp, sem visibilidade de prioridade ou histórico.",
    solutionCategory: "Gestão & Fluxo",
    solutionTitle: "Painel de controle com status, categorias, prioridades e histórico auditável.",
    badge: "Rastreabilidade Total",
    actionText: "Experimentar o FlowDesk",
    targetServiceId: "sistemas-personalizados",
    targetDemoId: "flowdesk"
  },
  {
    id: "pain-roi-cost",
    question: "Você não consegue visualizar quanto tempo e dinheiro um processo consome?",
    context: "Incerteza sobre o real impacto financeiro de gargalos operacionais e falta de clareza sobre o retorno antes de investir em melhorias.",
    solutionCategory: "Engenharia de Processos",
    solutionTitle: "Diagnóstico analítico e simulação matemática de capacidade liberada e ROI.",
    badge: "Decisão com Dados",
    actionText: "Calcular impacto e ROI",
    targetServiceId: "engenharia-de-processos",
    targetDemoId: "process-impact"
  }
];
