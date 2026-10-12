export interface ServiceItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  typicalProblems: string[];
  deliverables: string[];
  benefits: string[];
  demoId?: string;
  ctaText: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "sistemas-personalizados",
    category: "Desenvolvimento Sob Medida",
    badge: "Sistemas & Dashboards",
    title: "Sistemas Internos & Ferramentas de Gestão",
    shortDescription: "Aplicações web completas e sob medida para centralizar operações, gerenciar solicitações e eliminar controles paralelos.",
    fullDescription: "Desenvolvimento de softwares corporativos dimensionados exatamente para a rotina da sua empresa. Sem excesso de botões desnecessários de softwares engessados e sem a fragilidade de controles descentralizados.",
    typicalProblems: [
      "Controle de demandas disperso em WhatsApp, e-mails e anotações.",
      "Insegurança sobre quem é o responsável atual por cada pendência.",
      "Falta de histórico e rastreabilidade de alterações em processos internos.",
      "Sistemas de mercado genéricos e caros que não se adaptam ao fluxo real da equipe."
    ],
    deliverables: [
      "Portais e painéis administrativos responsivos (React / Web).",
      "APIs robustas com regras de negócio e validações estruturadas (FastAPI / Python).",
      "Modelagem e bancos de dados seguros com histórico de alterações (SQL / PostgreSQL).",
      "Controle de status, fluxos de aprovação e relatórios de produtividade."
    ],
    benefits: [
      "Centralização de 100% das demandas operacionais em uma única tela.",
      "Rastreabilidade completa de prazos, responsáveis e categorias.",
      "Redução drástica de falhas de comunicação e esquecimento de solicitações."
    ],
    demoId: "flowdesk",
    ctaText: "Avaliar Necessidade de Sistema"
  },
  {
    id: "automacao-e-integracao",
    category: "Automação Operacional",
    badge: "Dados & Rotinas",
    title: "Automação de Planilhas, Arquivos & Integrações",
    shortDescription: "Transformação de rotinas manuais repetitivas em rotinas automáticas de processamento, validação e consolidação de dados.",
    fullDescription: "Eliminação do retrabalho manual diário de copiar, colar, conferir e formatar tabelas ou relatórios. Criação de scripts e fluxos validados que executam em segundos tarefas que tomavam horas.",
    typicalProblems: [
      "Horas gastas semanalmente conferindo e corrigindo dados em planilhas.",
      "Arquivos recebidos com duplicidades, espaços em branco e formatos inválidos.",
      "Necessidade de copiar manualmente dados de um relatório para outro sistema.",
      "Erros humanos frequentes por cansaço em digitações repetitivas."
    ],
    deliverables: [
      "Processadores automatizados de arquivos CSV, planilhas e relatórios.",
      "Validação estrita de formatos, campos obrigatórios e higienização de textos.",
      "Detecção inteligente de registros duplicados e regras de consistência.",
      "Geração automática de relatórios prontos para tomada de decisão e exportação."
    ],
    benefits: [
      "Redução comprovada de tempo em atividades manuais e repetitivas.",
      "Garantia de consistência e conformidade das informações operacionais.",
      "Liberação da equipe para focar em análise e atendimento ao invés de digitação."
    ],
    demoId: "flow-automation",
    ctaText: "Automatizar Rotinas Manuais"
  },
  {
    id: "engenharia-de-processos",
    category: "Engenharia de Processos",
    badge: "Diagnóstico & ROI",
    title: "Mapeamento, Diagnóstico & Dimensionamento Operacional",
    shortDescription: "Análise profunda do fluxo de trabalho antes de programar, identificando gargalos, custos operacionais e oportunidades reais de ganho.",
    fullDescription: "A tecnologia só gera valor quando aplicada no lugar certo. Combinando os princípios da Engenharia de Produção à tecnologia, mapeio cada etapa da operação para quantificar o tempo gasto, custos envolvidos e calcular o retorno real do investimento.",
    typicalProblems: [
      "A empresa sabe que a equipe está sobrecarregada, mas não onde está o gargalo.",
      "Incerteza sobre quanto tempo e dinheiro determinada rotina manual consome por mês.",
      "Medo de investir em sistemas caros sem saber se haverá retorno financeiro real.",
      "Processos despadronizados onde cada colaborador executa a mesma tarefa de um jeito."
    ],
    deliverables: [
      "Mapeamento visual do fluxo de valor e identificação de etapas sem agregação de valor.",
      "Quantificação de volume mensal, tempo médio e custo hora/homem da operação.",
      "Simulação de cenários: capacidade liberada, ganho de eficiência e prazo de retorno.",
      "Elaboração de especificações técnicas precisas para guiar o desenvolvimento."
    ],
    benefits: [
      "Clareza matemática do retorno esperado antes de escrever uma única linha de código.",
      "Eliminação de desperdícios no próprio fluxo antes de automatizá-lo.",
      "Decisões fundamentadas em dados reais de capacidade e custo operacional."
    ],
    demoId: "process-impact",
    ctaText: "Mapear & Simular Processos"
  }
];
