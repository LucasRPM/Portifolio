export interface DemoProjectInfo {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  problemSolved: string;
  contextOfUse: string;
  keyFeatures: string[];
  techStack: string[];
  technicalLogic: string;
  demoLimitations: string;
  commercialCta: {
    question: string;
    buttonText: string;
  };
}

export const DEMO_PROJECTS: DemoProjectInfo[] = [
  {
    id: "flowdesk",
    name: "FlowDesk",
    category: "Sistema Web / Mini-SaaS Demonstrativo",
    badge: "Gestão Operacional",
    tagline: "Centralização e rastreabilidade de solicitações internas com indicadores em tempo real.",
    problemSolved: "Muitas empresas recebem demandas por mensagens, e-mails e conversas informais. Isso dificulta identificar pendências, responsáveis, prioridades e histórico.",
    contextOfUse: "Empresas com equipes operacionais ou administrativas que precisam organizar chamados internos, compras, manutenções ou aprovações sem perder o controle dos prazos.",
    keyFeatures: [
      "Dashboard com totalizador de solicitações por status e prioridade.",
      "Listagem com busca textual instantânea e filtros multicritério.",
      "Cadastro e edição completa de registros operacionais.",
      "Visualização detalhada e histórico de alterações ocorridas na sessão.",
      "Ação imediata para restaurar os dados de exemplo ao estado original."
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Arquitetura Modular", "State Management Reativo"],
    technicalLogic: "A aplicação gerencia um fluxo unidirecional de dados com validação rigorosa de campos obrigatórios, categorização dinâmica e recálculo reativo dos indicadores operacionais a cada transação.",
    demoLimitations: "Versão demonstrativa com persistência em memória/sessão local e dados fictícios. Em projetos reais sob medida, inclui autenticação multi-usuário, banco de dados relacional (PostgreSQL) e regras avançadas de permissão.",
    commercialCta: {
      question: "Precisa de um sistema de gestão adaptado à realidade da sua empresa?",
      buttonText: "Solicitar Sistema Sob Medida"
    }
  },
  {
    id: "flow-automation",
    name: "Flow Automation",
    category: "Automação de Processos & Tratamento de Dados",
    badge: "Processamento de Planilhas",
    tagline: "Validação, higienização e eliminação de duplicidades em planilhas e arquivos CSV.",
    problemSolved: "Empresas frequentemente recebem arquivos com registros duplicados, campos obrigatórios em branco, espaços indesejados e formatos inconsistentes que exigem horas de conferência manual.",
    contextOfUse: "Setores administrativos, faturamento e logística que importam dados de clientes, pedidos ou relatórios e necessitam garantir 100% de consistência antes de processá-los.",
    keyFeatures: [
      "Base de dados de exemplo inclusa com inconsistências intencionais para teste imediato.",
      "Suporte a upload de arquivo CSV próprio com limites e proteção de execução.",
      "Higienização de espaços, padronização de textos e checagem de formatos.",
      "Identificação automática de registros duplicados e campos faltantes.",
      "Separação visual entre registros válidos e linhas com divergência.",
      "Exportação do arquivo higienizado pronto para utilização."
    ],
    techStack: ["TypeScript", "Regras de Sanitização", "FastAPI / Python (conceito de backend)", "Parser Streaming de CSV"],
    technicalLogic: "Executa algoritmo de validação em duas etapas: verificação de integridade estrutural (schema dos campos) e sanitização semântica (limpeza e detecção de chaves compostas duplicadas), gerando relatório detalhado de inconformidades.",
    demoLimitations: "Processamento client-side demonstrativo para arquivos CSV de até 2MB. Em projetos contratados, implementa rotinas automáticas agendadas, integração com bancos de dados, APIs externas e leitura de planilhas complexas com múltiplas abas.",
    commercialCta: {
      question: "Existe alguma tarefa repetitiva que consome tempo da sua equipe?",
      buttonText: "Automatizar Essa Rotina"
    }
  },
  {
    id: "process-impact",
    name: "Process Impact",
    category: "Engenharia de Produção Aplicada à Tecnologia",
    badge: "Simulador de Impacto & ROI",
    tagline: "Quantificação matemática de capacidade liberada, economia operacional e retorno sobre o investimento.",
    problemSolved: "Uma empresa executa determinada rotina centenas de vezes ao mês, mas não sabe quantas horas consome, qual é seu custo operacional de referência ou quanto ganharia ao investir em melhorias.",
    contextOfUse: "Diretores, gerentes e proprietários avaliando se vale a pena automatizar uma rotina, digitalizar um fluxo ou contratar uma solução sob medida.",
    keyFeatures: [
      "Parâmetros ajustáveis: volume mensal, tempo atual vs. melhorado, custo hora/homem e investimentos.",
      "Cálculo consistente de horas mensais liberadas e custo de referência da operação.",
      "Cálculo de economia líquida estimada e prazo de retorno do investimento (Payback).",
      "Gráficos comparativos de tempo e custo entre o cenário atual e o melhorado.",
      "Presets rápidos de casos reais (ex: fechamento de cobranças, conciliação de cadastros)."
    ],
    techStack: ["Engenharia de Produção", "Modelagem Matemática", "Visualização de Dados", "Validação Numérica Estrita"],
    technicalLogic: "Aplica equações formais de estudo de tempos e métodos da Engenharia de Produção, diferenciando estritamente capacidade produtiva liberada de corte fixo de despesas e tratando cenários de divisão por zero e retorno neutro.",
    demoLimitations: "Cálculos matemáticos determinísticos com base nas estimativas informadas pelo visitante. Em consultorias e projetos, o diagnóstico inclui cronometragem de rotinas, mapeamento de fluxo de valor (VSM) e plano de ação estruturado.",
    commercialCta: {
      question: "Quer analisar um processo real da sua empresa e identificar oportunidades de melhoria?",
      buttonText: "Agendar Diagnóstico Operacional"
    }
  }
];
