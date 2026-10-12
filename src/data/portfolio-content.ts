export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyContext: string;
  avatarInitials: string;
  content: string;
  highlightTag: string;
}

export interface SystemShowcase {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  benefits: string[];
  techStack: string[];
  mockupDetails: {
    badge: string;
    accentColor: string;
    metrics: { label: string; value: string }[];
    sampleItems: { code: string; title: string; tag: string; statusColor: string }[];
  };
}

export const PORTFOLIO_CONTENT = {
  profile: {
    fullName: "Lucas Pedroso",
    displayName: "Lucas Pedroso",
    title: "Engenheiro de Produção & Especialista em Automação",
    academicDegree: "Bacharel em Engenharia de Produção",
    specialization: "Mapeamento BPMN, Diagnóstico Operacional & Softwares Sob Medida",
    location: "Registro - SP • Atendimento Remoto & Presencial",
    email: "myrapha_pedroso@hotmail.com",
    
    headline: "Elimino gargalos operacionais e tarefas manuais através de processos enxutos e sistemas sob medida.",
    summary: `Sou Engenheiro de Produção com foco em identificar desperdícios, redesenhar fluxos de trabalho e desenvolver ferramentas digitais práticas. Não entrego códigos genéricos: analiso a rotina de trabalho na ponta, estruturo fluxos claros e padronizados e desenvolvo automações que blindam a empresa contra falhas humanas.`,
    
    keyHighlights: [
      {
        label: "Eliminação de Erros",
        value: "Zero retrabalho manual",
        description: "Validações lógicas que impedem divergências e inconsistências em planilhas."
      },
      {
        label: "Visão de Engenharia",
        value: "Processo antes do software",
        description: "Diagnóstico profundo e regras de negócio antes de qualquer desenvolvimento."
      },
      {
        label: "Controle & Rastreabilidade",
        value: "100% dos dados auditáveis",
        description: "Fim dos pedidos dispersos em mensagens com centrais integradas de chamados."
      }
    ],

    skillPills: [
      "Engenharia de Produção",
      "Mapeamento de Processos (BPMN)",
      "Padronização & Processos",
      "Automação em Python",
      "FastAPI & APIs REST",
      "React & TypeScript",
      "Sanitização de Dados CSV",
      "Eliminação de Retrabalhos"
    ]
  },

  methodology: {
    tagline: "Engenharia Aplicada aos Processos",
    headline: "Organizo o fluxo de trabalho antes de automatizar.",
    description: `Automatizar uma rotina desorganizada apenas multiplica erros mais rapidamente. Minha atuação combina a metodologia da Engenharia de Produção com desenvolvimento de software em três etapas bem definidas:`,
    steps: [
      {
        number: "01",
        title: "Diagnóstico & Mapeamento de Gargalos",
        subtitle: "Imersão na rotina operacional real",
        description: "Acompanho a execução diária da equipe para mapear onde ocorrem perdas de tempo, conferências manuais redundantes e gargalos que atrasam entregas."
      },
      {
        number: "02",
        title: "Padronização & Estruturação de Processos",
        subtitle: "Criação de regras e travas lógicas",
        description: "Desenho o fluxo otimizado, estabeleço regras de consistência de dados e documento rotinas e processos claros para a equipe."
      },
      {
        number: "03",
        title: "Desenvolvimento & Automação Prática",
        subtitle: "Entrega de ferramenta funcional sem atrito",
        description: "Construo aplicações web limpas e rotinas automatizadas (Python, React, FastAPI) que eliminam tarefas repetitivas e rodam imediatamente na rotina da empresa."
      }
    ]
  },

  applicationsAndResults: {
    tagline: "Casos Reais & Aplicação Prática",
    headline: "Exemplos reais de problemas operacionais que resolvo.",
    description: `Veja cenários comuns onde a união entre análise de processos e desenvolvimento sob medida elimina dores de cabeça diárias:`,
    
    useCases: [
      {
        sector: "Clínicas, Hospitais & Laboratórios",
        title: "Conferência de Faturamento & Convênios",
        pain: "Divergência de centavos e códigos de exames entre o prontuário interno e as tabelas de repasse de operadoras de saúde.",
        solution: "Automação em Python que cruza milhares de linhas, detecta glosas antes do envio e padroniza layouts em segundos."
      },
      {
        sector: "Manufatura, Obras & Serviços",
        title: "Controle de Chamados & Ordens de Manutenção",
        pain: "Solicitações de reparo e compras de peças feitas por WhatsApp ou bilhetes, gerando esquecimentos e máquinas paradas.",
        solution: "Sistema web com fluxo Kanban, protocolo único de rastreio, nível de prioridade e histórico auditável de cada chamado."
      },
      {
        sector: "Administrativo & Recursos Humanos",
        title: "Higienização de Relatórios Regulatórios & eSocial",
        pain: "Planilhas de funcionários com CPFs sem formatação, datas divergentes e campos vazios que causam rejeições em órgãos oficiais.",
        solution: "Pipeline de validação prévia que limpa dados, acusa campos faltantes e exporta o arquivo pronto para transmissão."
      },
      {
        sector: "Financeiro & Controladoria",
        title: "Consolidação e Limpeza de Planilhas CSV",
        pain: "Colaboradores passando a tarde copiando dados de três planilhas diferentes para consolidar um único relatório gerencial.",
        solution: "Rotina automática que lê os arquivos brutos, remove duplicidades, higieniza textos e atualiza os indicadores em um clique."
      }
    ],

    metrics: [
      {
        metric: "100%",
        label: "Dados validados e consistentes",
        context: "Fim das inconsistências de digitação e centavos divergentes."
      },
      {
        metric: "Zero",
        label: "Solicitações esquecidas",
        context: "Rastreabilidade de ponta a ponta com protocolos únicos."
      },
      {
        metric: "Horas",
        label: "Economia diária na equipe",
        context: "Tempo redirecionado de tarefas mecânicas para o atendimento ao cliente."
      },
      {
        metric: "Ágil",
        label: "Sem burocracia de ERPs pesados",
        context: "Ferramentas leves focadas exclusivamente na dor real da sua empresa."
      }
    ]
  },

  systems: [
    {
      id: "flowdesk",
      title: "FlowDesk Hub",
      subtitle: "Central de Chamados & Gestão Operacional",
      category: "Sistema Web / Kanban",
      tagline: "Fim dos pedidos perdidos em mensagens de WhatsApp e caixas de e-mail.",
      description: "Centraliza requisições internas com protocolos únicos de atendimento, categorização por setor (Compras, TI, Operacional, Faturamento) e painel visual de status.",
      benefits: [
        "Protocolo exclusivo para rastrear cada solicitação",
        "Triagem ágil por prioridade e responsável",
        "Histórico e auditoria de alterações"
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      mockupDetails: {
        badge: "Central de Chamados",
        accentColor: "#05AD98",
        metrics: [
          { label: "Chamados Ativos", value: "24" },
          { label: "SLA Médio", value: "2.1h" }
        ],
        sampleItems: [
          { code: "SOL-1042", title: "Ajuste de divergência em faturamento", tag: "Faturamento", statusColor: "#05AD98" },
          { code: "SOL-1041", title: "Automação de conferência de compras", tag: "Operacional", statusColor: "#111827" }
        ]
      }
    },
    {
      id: "flow-automation",
      title: "Flow Automation",
      subtitle: "Pipeline de Higienização de Planilhas",
      category: "Automação & Dados",
      tagline: "Substitua horas conferindo células por validação em 1 clique.",
      description: "Carrega arquivos brutos (CSV/Excel), identifica e remove duplicidades automaticamente, trata campos em branco e exporta planilhas limpas para faturamento.",
      benefits: [
        "Detecção de registros duplicados e campos vazios",
        "Higienização de texto e caracteres especiais",
        "Exportação de lote validado e sem erros"
      ],
      techStack: ["Python", "FastAPI", "Pandas"],
      mockupDetails: {
        badge: "Validador CSV",
        accentColor: "#05AD98",
        metrics: [
          { label: "Linhas Lidas", value: "1.420" },
          { label: "Duplicados", value: "38 limpos" }
        ],
        sampleItems: [
          { code: "DATA-IN", title: "Lote_Faturamento_Março.csv", tag: "Carregado", statusColor: "#111827" },
          { code: "CLEAN", title: "38 registros duplicados removidos", tag: "Higienizado", statusColor: "#05AD98" }
        ]
      }
    },
    {
      id: "process-impact",
      title: "Process Impact",
      subtitle: "Simulador de ROI & Economia Operacional",
      category: "Engenharia Econômica",
      tagline: "Calcule com números exatos a economia gerada por cada melhoria.",
      description: "Calculadora de engenharia de métodos que cruza o tamanho da equipe, horas gastas em tarefas mecânicas e custo horário para projetar o tempo de retorno (payback).",
      benefits: [
        "Projeção clara de horas economizadas por ano",
        "Cálculo de payback e retorno financeiro líquido",
        "Base sólida para tomada de decisão gerencial"
      ],
      techStack: ["Engenharia Econômica", "Data Analytics"],
      mockupDetails: {
        badge: "Calculadora ROI",
        accentColor: "#05AD98",
        metrics: [
          { label: "Horas Salvas/Ano", value: "624 h" },
          { label: "Payback Estimado", value: "1.8 meses" }
        ],
        sampleItems: [
          { code: "PARAM", title: "4 Colaboradores • 3h/semana em tarefas manuais", tag: "Cenário Atual", statusColor: "#111827" },
          { code: "RETORNO", title: "R$ 37.440 de economia operacional anual", tag: "Economia", statusColor: "#05AD98" }
        ]
      }
    }
  ] as SystemShowcase[],

  testimonials: [
    {
      id: "t-1",
      name: "Mariana Silveira",
      role: "Coordenadora de Operações",
      companyContext: "Serviços Corporativos",
      avatarInitials: "MS",
      highlightTag: "Visão de Processos",
      content: "O grande diferencial do Lucas Pedroso é que ele não tenta empurrar um software complexo. Ele entendeu exatamente onde nós perdíamos tempo com planilhas e automatizou o processo de ponta a ponta com muita rapidez."
    },
    {
      id: "t-2",
      name: "Rodrigo Fontes",
      role: "Gestor Financeiro & Controladoria",
      companyContext: "Saúde & Diagnóstico",
      avatarInitials: "RF",
      highlightTag: "Confiabilidade de Dados",
      content: "Tínhamos problemas recorrentes de inconsistência nos relatórios por pequenos erros de digitação. A ferramenta desenvolvida pelo Lucas blindou a conferência e garantiu que nenhuma informação errada passe para o faturamento."
    },
    {
      id: "t-3",
      name: "Beatriz Almeida",
      role: "Supervisora de Qualidade",
      companyContext: "Engenharia & Métodos",
      avatarInitials: "BA",
      highlightTag: "Processos Padronizados",
      content: "A formação em Engenharia de Produção transparece em tudo. Além da ferramenta funcionar perfeitamente, recebemos todo o fluxo mapeado e documentado, facilitando muito o treinamento de novos membros."
    },
    {
      id: "t-4",
      name: "Carlos E. Meirelles",
      role: "Gerente de Logística & Suprimentos",
      companyContext: "Distribuição & Estoque",
      avatarInitials: "CM",
      highlightTag: "Agilidade Operacional",
      content: "Substituímos controles dispersos por uma ferramenta direta. As ordens de serviço e requisições agora possuem protocolos únicos e nós eliminamos os atrasos de conferência."
    },
    {
      id: "t-5",
      name: "Juliana Prado",
      role: "Supervisora Administrativa",
      companyContext: "Clínicas & Gestão",
      avatarInitials: "JP",
      highlightTag: "Zero Erros Manuais",
      content: "Nossa equipe gastava quase uma tarde inteira por semana corrigindo divergências manuais. Com a automação feita sob medida, o fechamento ocorre em poucos cliques com total segurança."
    }
  ] as Testimonial[],

  contact: {
    tagline: "Contato Direto",
    headline: "Vamos diagnosticar os gargalos da sua operação?",
    description: "Estou disponível para projetos sob medida, automações pontuais de planilhas e oportunidades profissionais. Entre em contato para conversarmos sobre seus processos atuais.",
    socialLinks: [
      { name: "E-mail", value: "myrapha_pedroso@hotmail.com", url: "mailto:myrapha_pedroso@hotmail.com" },
      { name: "LinkedIn", value: "Lucas Pedroso", url: "https://linkedin.com" },
      { name: "GitHub", value: "Repositórios & Códigos", url: "https://github.com" },
      { name: "Localização", value: "Registro - SP (Disponível Remoto)", url: "#" }
    ]
  }
};
