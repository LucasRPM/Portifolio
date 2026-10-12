export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'prática' | 'estudado' | 'em desenvolvimento';
    context?: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location?: string;
  focus: string;
  highlights: string[];
  resultsNote?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  description: string;
}

export const PERSONAL_INFO = {
  // Identificação Oficial do Profissional
  name: "Lucas Pedroso",
  title: "Engenharia de Produção | Mapeamento & Automação de Processos",
  shortRole: "Engenheiro de Produção & Desenvolvedor de Sistemas",
  specialization: "Especialista em Mapeamento, Diagnóstico Operacional e Automação de Processos",
  location: "Registro - SP",
  email: "myrapha_pedroso@hotmail.com", // contato direto do profissional
  
  // Imagem de Perfil Oficial
  avatarUrl: "/Perfil.JPEG",

  headline: "Transformo problemas operacionais em soluções tecnológicas.",
  subheadline: "Desenvolvimento de sistemas, automação de tarefas e melhoria de processos para empresas que buscam trabalhar com mais eficiência.",
  valueProposition: "Entendo o processo, identifico oportunidades de melhoria e desenvolvo sistemas e automações para resolver problemas reais.",
  
  aboutStory: {
    paragraph1: `Sou Lucas Pedroso, formado em Engenharia de Produção e direciono minha atuação para a intersecção entre análise de processos, automação e desenvolvimento de sistemas empresariais. Acredito que a tecnologia gera o seu maior valor quando nasce da compreensão real do fluxo de trabalho.`,
    paragraph2: `Minha formação em Engenharia de Produção proporciona uma visão analítica focada em organização operacional, identificação de gargalos, eliminação de retrabalhos e padronização de procedimentos.`,
    paragraph3: `Na prática operacional e administrativa, trabalhei com mapeamento de processos, estruturação de documentações e automação de planilhas integradas, contribuindo para reduzir em aproximadamente um terço o tempo de execução de determinadas rotinas repetitivas. Essa experiência comprovou como a programação e a consistência dos dados transformam a rotina de uma equipe.`,
    paragraph4: `Tenho especializado meu desenvolvimento em Python, FastAPI, React, TypeScript, bancos de dados relacionais e integração de rotinas, construindo desde ferramentas internas e automações de arquivos até sistemas web completos.`,
    paragraph5: `Meu diferencial competitivo é a ótica da Engenharia de Produção: não entrego apenas linhas de código, mas compreendo o processo ponta a ponta, desenho o fluxo simplificado e implemento a solução que realmente resolve a dor do negócio.`,
    closing: `Quero ajudar empresas a evoluírem com sistemas sob medida, rotinas automatizadas e melhorias de processos, priorizando sempre utilidade prática, confiabilidade e ganho operacional palpável.`
  },

  // Currículo Estruturado (Formação Acadêmica)
  education: [
    {
      degree: "Bacharelado em Engenharia de Produção",
      institution: "Graduação Concluída",
      period: "Formado",
      status: "Graduação Concluída",
      description: "Formação focada em gestão de operações, pesquisa operacional, engenharia de métodos, mapeamento de fluxos de valor (VSM), controle de qualidade e melhoria contínua de processos."
    }
  ] as EducationItem[],

  // Especializações & Competências Aplicadas
  complementaryEducation: [
    {
      title: "Mapeamento & Automação de Processos Empresariais",
      provider: "Especialização Aplicada",
      hours: "Prática Contínua",
      skills: ["Mapeamento BPMN", "Identificação de Gargalos", "Padronização de Processos", "Redução de Desperdícios"]
    },
    {
      title: "Desenvolvimento de Sistemas & Aplicações Web",
      provider: "Stack Moderna",
      hours: "Prática Contínua",
      skills: ["React", "TypeScript", "Tailwind CSS", "FastAPI / Python", "SQL / Bancos Relacionais"]
    },
    {
      title: "Tratamento de Dados & Automação de Planilhas",
      provider: "Engenharia de Dados Aplicada",
      hours: "Prática Contínua",
      skills: ["Sanitização de CSV", "Pipelines de Dados", "Eliminação de Retrabalhos Manuais"]
    }
  ],

  methodology: [
    {
      step: "01",
      title: "Entender",
      subtitle: "Diagnóstico e Mapeamento",
      description: "Antes de escrever código, analiso a rotina atual, quem executa, como os dados transitam e onde ocorrem gargalos, perdas de tempo e retrabalhos."
    },
    {
      step: "02",
      title: "Projetar",
      subtitle: "Arquitetura e Regras de Negócio",
      description: "Desenho o fluxo simplificado, estabeleço as validações e regras de negócio necessárias e projeto uma ferramenta sob medida para a rotina da equipe."
    },
    {
      step: "03",
      title: "Desenvolver",
      subtitle: "Entrega Prática e Funcional",
      description: "Construo a ferramenta com tecnologias modernas, interface limpa, testes de consistência e foco imediato na usabilidade e no resultado real da empresa."
    }
  ],

  // Experiências do Currículo
  experiences: [
    {
      period: "Atuação Profissional",
      role: "Análise de Processos & Rotinas Operacionais",
      organization: "Ambiente Corporativo e Diagnóstico",
      location: "Brasil",
      focus: "Mapeamento, consistência de dados e otimização",
      highlights: [
        "Mapeamento de fluxos de trabalho e elaboração de documentação e padronização de procedimentos operacionais.",
        "Conferência, validação e estruturação de dados em rotinas administrativas, faturamento e tabelas de serviços.",
        "Apoio a processos documentais empresariais e conformidade de registros operacionais (inclusive SST/eSocial conforme demanda).",
        "Vivência prática com sistemas de gestão e compreensão da dependência mútua entre dados consistentes e procedimentos claros."
      ]
    },
    {
      period: "Projetos de Automação & Sistemas",
      role: "Desenvolvimento de Automações & Ferramentas Internas",
      organization: "Soluções Aplicadas",
      location: "Brasil",
      focus: "Redução de tarefas repetitivas e ganho de produtividade",
      highlights: [
        "Criação de ferramentas e rotinas automatizadas para tratamento e consolidação de dados administrativos e planilhas integradas.",
        "Substituição de preenchimentos manuais repetitivos por fluxos validados com regras lógicas de consistência.",
        "Redução documentada de aproximadamente um terço do tempo de execução de determinadas tarefas operacionais recorrentes.",
        "Desenvolvimento de aplicações web completas, APIs em FastAPI/Python e interfaces dinâmicas em React."
      ],
      resultsNote: "Redução observada em rotina específica vivenciada; demonstrações interativas simulam impactos com base em dados de cada empresa."
    }
  ] as ExperienceItem[],

  skillCategories: [
    {
      title: "Engenharia de Processos & Gestão",
      description: "Visão analítica de fluxo de valor, tempos e eliminação de gargalos",
      skills: [
        { name: "Engenharia de Produção", level: "prática", context: "Formação de base" },
        { name: "Mapeamento de Processos (BPMN)", level: "prática", context: "Fluxos e Rotinas" },
        { name: "Identificação de Gargalos", level: "prática", context: "Eliminação de retrabalho" },
        { name: "Estudo de Tempos e Métodos", level: "prática", context: "Dimensionamento de capacidade" },
        { name: "Análise de Produtividade & ROI", level: "prática", context: "Cálculo de retorno operacional" },
        { name: "Rotinas Administrativas & Faturamento", level: "prática", context: "Conformidade e dados" }
      ]
    },
    {
      title: "Desenvolvimento & Tecnologias Web",
      description: "Construção de aplicações corporativas úteis e responsivas",
      skills: [
        { name: "Python", level: "prática", context: "Scripts, automação e processamento" },
        { name: "FastAPI / APIs REST", level: "prática", context: "Serviços e validação com Pydantic" },
        { name: "React & TypeScript", level: "prática", context: "Aplicações web modernas" },
        { name: "HTML5, CSS3 & Tailwind CSS", level: "prática", context: "Interfaces dinâmicas e design systems" },
        { name: "SQL & Bancos Relacionais", level: "prática", context: "Modelagem e consultas (PostgreSQL/MySQL)" },
        { name: "Git & Versionamento", level: "prática", context: "Organização e fluxo de código" }
      ]
    },
    {
      title: "Automação & Tratamento de Dados",
      description: "Transformação de dados brutos e planilhas em fluxos confiáveis",
      skills: [
        { name: "Automação de Planilhas & CSV", level: "prática", context: "Padronização e limpeza" },
        { name: "Validação & Sanitização de Dados", level: "prática", context: "Detecção de erros e duplicados" },
        { name: "Geração de Relatórios Operacionais", level: "prática", context: "Consolidação e métricas" },
        { name: "Integração entre Ferramentas", level: "em desenvolvimento", context: "Webhooks e pipelines" }
      ]
    }
  ] as SkillCategory[],

  contactChannels: {
    whatsappUrl: "https://wa.me/5500000000000",
    hasWhatsappConfigured: false,
    githubUrl: "https://github.com/LucasRPM",
    linkedinUrl: "https://www.linkedin.com/in/lucas-raphael-319613108",
    resumePdfUrl: ""
  }
};
