import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  CheckCircle2, 
  Edit2, 
  Trash2, 
  RotateCcw, 
  Kanban as KanbanIcon, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Flag
} from 'lucide-react';

// Tipos de Etapas / Colunas do Kanban
export type ColumnId = 'todo' | 'in_progress' | 'review' | 'done';

export type PriorityLevel = 'alta' | 'media' | 'baixa';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarText: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
  assigneeId: string;
  dueDate: string; // YYYY-MM-DD
  priority: PriorityLevel;
  tags?: string[];
}

export interface ColumnDefinition {
  id: ColumnId;
  title: string;
  description: string;
  columnBg: string;
  columnBorder: string;
  topBorder: string;
  headerBg: string;
  headerBorder: string;
  titleColor: string;
  badgeBg: string;
  buttonColor: string;
  cardLeftStripe: string;
  hoverRing: string;
}

// Definição das 4 Etapas de Trabalho com Cores Vivas e Distintas
export const COLUMNS: ColumnDefinition[] = [
  {
    id: 'todo',
    title: 'A Fazer',
    description: 'Demandas e tarefas aguardando início',
    columnBg: 'bg-sky-50/70',
    columnBorder: 'border-sky-200',
    topBorder: 'border-t-sky-500',
    headerBg: 'bg-sky-100/90',
    headerBorder: 'border-b-sky-200',
    titleColor: 'text-sky-950',
    badgeBg: 'bg-sky-500 text-white',
    buttonColor: 'text-sky-700 hover:bg-sky-200/80',
    cardLeftStripe: 'border-l-sky-500',
    hoverRing: 'ring-sky-400 bg-sky-100/80'
  },
  {
    id: 'in_progress',
    title: 'Em Andamento',
    description: 'Trabalhos sendo executados agora',
    columnBg: 'bg-amber-50/70',
    columnBorder: 'border-amber-200',
    topBorder: 'border-t-amber-500',
    headerBg: 'bg-amber-100/90',
    headerBorder: 'border-b-amber-200',
    titleColor: 'text-amber-950',
    badgeBg: 'bg-amber-500 text-white',
    buttonColor: 'text-amber-800 hover:bg-amber-200/80',
    cardLeftStripe: 'border-l-amber-500',
    hoverRing: 'ring-amber-400 bg-amber-100/80'
  },
  {
    id: 'review',
    title: 'Em Revisão',
    description: 'Em fase de aprovação e validação técnica',
    columnBg: 'bg-purple-50/70',
    columnBorder: 'border-purple-200',
    topBorder: 'border-t-purple-500',
    headerBg: 'bg-purple-100/90',
    headerBorder: 'border-b-purple-200',
    titleColor: 'text-purple-950',
    badgeBg: 'bg-purple-600 text-white',
    buttonColor: 'text-purple-800 hover:bg-purple-200/80',
    cardLeftStripe: 'border-l-purple-500',
    hoverRing: 'ring-purple-400 bg-purple-100/80'
  },
  {
    id: 'done',
    title: 'Concluído',
    description: 'Entregas finalizadas com sucesso',
    columnBg: 'bg-emerald-50/70',
    columnBorder: 'border-emerald-200',
    topBorder: 'border-t-emerald-500',
    headerBg: 'bg-emerald-100/90',
    headerBorder: 'border-b-emerald-200',
    titleColor: 'text-emerald-950',
    badgeBg: 'bg-emerald-600 text-white',
    buttonColor: 'text-emerald-800 hover:bg-emerald-200/80',
    cardLeftStripe: 'border-l-emerald-500',
    hoverRing: 'ring-emerald-400 bg-emerald-100/80'
  }
];

// Equipe fictícia da empresa
export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'usr-lucas', name: 'Lucas Pedroso', role: 'Automação & Sistemas', avatarBg: 'bg-blue-600', avatarText: 'LP' },
  { id: 'usr-mariana', name: 'Mariana Silva', role: 'Comercial & Vendas', avatarBg: 'bg-purple-600', avatarText: 'MS' },
  { id: 'usr-rafael', name: 'Rafael Costa', role: 'Marketing & Design', avatarBg: 'bg-amber-600', avatarText: 'RC' },
  { id: 'usr-camila', name: 'Camila Duarte', role: 'Financeiro & Contábil', avatarBg: 'bg-emerald-600', avatarText: 'CD' },
  { id: 'usr-diego', name: 'Diego Santos', role: 'Infraestrutura & Suporte', avatarBg: 'bg-rose-600', avatarText: 'DS' },
];

// Tarefas iniciais realistas para avaliação da demonstração
export const INITIAL_TASKS: KanbanTask[] = [
  {
    id: 'tsk-1',
    title: 'Revisar proposta comercial do cliente XYZ',
    description: 'Verificar alíquotas de impostos, prazos contratuais e condições de parcelamento.',
    columnId: 'todo',
    assigneeId: 'usr-mariana',
    dueDate: '2026-10-15',
    priority: 'alta',
    tags: ['Comercial', 'Contratos']
  },
  {
    id: 'tsk-2',
    title: 'Atualizar catálogo de serviços e automações',
    description: 'Diagramar novo PDF com os sistemas mais recentes criados sob medida.',
    columnId: 'todo',
    assigneeId: 'usr-rafael',
    dueDate: '2026-10-18',
    priority: 'media',
    tags: ['Design', 'Marketing']
  },
  {
    id: 'tsk-3',
    title: 'Agendar manutenção preventiva dos servidores',
    description: 'Planejar janela de parada noturna para backup e atualização de segurança.',
    columnId: 'todo',
    assigneeId: 'usr-diego',
    dueDate: '2026-10-22',
    priority: 'baixa',
    tags: ['TI', 'Infra']
  },
  {
    id: 'tsk-4',
    title: 'Desenvolver integração com webhook de notas fiscais',
    description: 'Conectar endpoint que recebe o XML da NF-e e armazena na pasta categorizada.',
    columnId: 'in_progress',
    assigneeId: 'usr-lucas',
    dueDate: '2026-10-14',
    priority: 'alta',
    tags: ['Desenvolvimento', 'Fiscal']
  },
  {
    id: 'tsk-5',
    title: 'Elaborar fechamento contábil mensal',
    description: 'Consolidar lançamentos de entradas, saídas e conciliação bancária do mês anterior.',
    columnId: 'in_progress',
    assigneeId: 'usr-camila',
    dueDate: '2026-10-16',
    priority: 'media',
    tags: ['Financeiro']
  },
  {
    id: 'tsk-6',
    title: 'Auditar planilhas de comissão de vendas',
    description: 'Validar cálculos automáticos antes da liberação do pagamento para a diretoria.',
    columnId: 'review',
    assigneeId: 'usr-camila',
    dueDate: '2026-10-13',
    priority: 'alta',
    tags: ['Auditoria', 'RH']
  },
  {
    id: 'tsk-7',
    title: 'Revisar responsividade mobile da nova tela',
    description: 'Testar em dispositivos de 360px a 430px de largura e verificar toque nos botões.',
    columnId: 'review',
    assigneeId: 'usr-lucas',
    dueDate: '2026-10-14',
    priority: 'media',
    tags: ['Frontend', 'QA']
  },
  {
    id: 'tsk-8',
    title: 'Treinamento da equipe no novo organizador de arquivos',
    description: 'Workshop de 30 minutos demonstrando a triagem automática de pastas.',
    columnId: 'done',
    assigneeId: 'usr-rafael',
    dueDate: '2026-10-11',
    priority: 'media',
    tags: ['Treinamento', 'Operação']
  },
  {
    id: 'tsk-9',
    title: 'Configuração do backup diário em nuvem',
    description: 'Rotina de snapshot criada com retenção de 30 dias e teste de restauração concluído.',
    columnId: 'done',
    assigneeId: 'usr-diego',
    dueDate: '2026-10-10',
    priority: 'baixa',
    tags: ['Segurança']
  }
];

export const KanbanDemo: React.FC = () => {
  // Estado principal das tarefas
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);

  // Estados de busca e filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Etapa ativa para navegação mobile
  const [activeMobileCol, setActiveMobileCol] = useState<ColumnId>('todo');

  // Estados do Modal de Criação / Edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Formulário do Modal
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formColumn, setFormColumn] = useState<ColumnId>('todo');
  const [formAssignee, setFormAssignee] = useState<string>('usr-lucas');
  const [formDueDate, setFormDueDate] = useState('2026-10-16');
  const [formPriority, setFormPriority] = useState<PriorityLevel>('media');
  const [formTag, setFormTag] = useState('');

  // Estado de Drag and Drop
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);

  // Notificação de sucesso rápida
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filtragem de tarefas
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filtro de texto
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(term);
        const matchesDesc = task.description.toLowerCase().includes(term);
        const matchesTags = task.tags?.some(t => t.toLowerCase().includes(term));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }

      // Filtro de responsável
      if (filterAssignee !== 'all' && task.assigneeId !== filterAssignee) {
        return false;
      }

      // Filtro de prioridade
      if (filterPriority !== 'all' && task.priority !== filterPriority) {
        return false;
      }

      return true;
    });
  }, [tasks, searchTerm, filterAssignee, filterPriority]);

  // Navegar de volta ao portfólio
  const handleBackToPortfolio = () => {
    window.location.hash = '#demonstracoes';
  };

  // Resetar tarefas para o estado inicial da demonstração
  const handleResetTasks = () => {
    setTasks(INITIAL_TASKS);
    setSearchTerm('');
    setFilterAssignee('all');
    setFilterPriority('all');
    showToast('Demonstração restaurada para os dados padrão!');
  };

  // Abrir modal para criar nova tarefa
  const handleOpenCreateModal = (defaultCol: ColumnId = 'todo') => {
    setEditingTaskId(null);
    setFormTitle('');
    setFormDescription('');
    setFormColumn(defaultCol);
    setFormAssignee(TEAM_MEMBERS[0].id);
    setFormDueDate(new Date().toISOString().split('T')[0]);
    setFormPriority('media');
    setFormTag('');
    setIsModalOpen(true);
  };

  // Abrir modal para editar tarefa existente
  const handleOpenEditModal = (task: KanbanTask) => {
    setEditingTaskId(task.id);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormColumn(task.columnId);
    setFormAssignee(task.assigneeId);
    setFormDueDate(task.dueDate);
    setFormPriority(task.priority);
    setFormTag(task.tags && task.tags.length > 0 ? task.tags[0] : '');
    setIsModalOpen(true);
  };

  // Salvar (Criar ou Atualizar)
  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTag.trim() ? [formTag.trim()] : ['Geral'];

    if (editingTaskId) {
      // Editar
      setTasks(prev => prev.map(t => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            title: formTitle.trim(),
            description: formDescription.trim(),
            columnId: formColumn,
            assigneeId: formAssignee,
            dueDate: formDueDate,
            priority: formPriority,
            tags: tagsArray
          };
        }
        return t;
      }));
      showToast('Tarefa atualizada com sucesso!');
    } else {
      // Criar nova
      const newTask: KanbanTask = {
        id: `tsk-${Date.now()}`,
        title: formTitle.trim(),
        description: formDescription.trim(),
        columnId: formColumn,
        assigneeId: formAssignee,
        dueDate: formDueDate,
        priority: formPriority,
        tags: tagsArray
      };
      setTasks(prev => [newTask, ...prev]);
      showToast('Nova tarefa criada no Kanban!');
    }

    setIsModalOpen(false);
  };

  // Excluir tarefa
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (editingTaskId === taskId) {
      setIsModalOpen(false);
    }
    showToast('Tarefa removida com sucesso!');
  };

  // Mover tarefa para etapa anterior ou próxima via botões de seta
  const handleMoveStep = (taskId: string, direction: 'prev' | 'next') => {
    const colOrder: ColumnId[] = ['todo', 'in_progress', 'review', 'done'];
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const currentIndex = colOrder.indexOf(t.columnId);
        let nextIndex = currentIndex;
        if (direction === 'prev' && currentIndex > 0) {
          nextIndex = currentIndex - 1;
        } else if (direction === 'next' && currentIndex < colOrder.length - 1) {
          nextIndex = currentIndex + 1;
        }
        return {
          ...t,
          columnId: colOrder[nextIndex]
        };
      }
      return t;
    }));
  };

  // Drag and Drop Nativo
  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent, colId: ColumnId) => {
    e.preventDefault();
    setDragOverColumn(colId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetCol: ColumnId) => {
    e.preventDefault();
    if (draggedTaskId) {
      setTasks(prev => prev.map(t => {
        if (t.id === draggedTaskId) {
          return { ...t, columnId: targetCol };
        }
        return t;
      }));
      setDraggedTaskId(null);
      setDragOverColumn(null);
    }
  };

  // Obter detalhes da pessoa
  const getAssignee = (id: string): TeamMember => {
    return TEAM_MEMBERS.find(m => m.id === id) || {
      id: 'usr-unknown',
      name: 'Não Atribuído',
      role: 'Equipe',
      avatarBg: 'bg-slate-400',
      avatarText: '?'
    };
  };

  // Badges de Prioridade
  const renderPriorityBadge = (p: PriorityLevel) => {
    switch (p) {
      case 'alta':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Alta
          </span>
        );
      case 'media':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Média
          </span>
        );
      case 'baixa':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Baixa
          </span>
        );
    }
  };

  // Formatação amigável de data
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="min-h-screen bg-slate-100/75 text-slate-900 flex flex-col font-sans select-none selection:bg-[#05AD98] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. BARRA SUPERIOR (HEADER DA DEMONSTRAÇÃO)                                */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-6 py-3 bg-white border-b border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Lado Esquerdo: Voltar ao Portfólio + Título */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleBackToPortfolio}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 shrink-0"
            title="Voltar ao Portfólio Principal"
          >
            <ArrowLeft className="w-4 h-4 text-[#05AD98]" />
            <span className="hidden sm:inline">Voltar ao Portfólio</span>
            <span className="sm:hidden">Voltar</span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#E6F7F5] border border-[#05AD98]/30 flex items-center justify-center text-[#05AD98] shrink-0">
              <KanbanIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight truncate">
                  Kanban de Tarefas
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#E6F7F5] text-[#05AD98] border border-[#05AD98]/20 font-mono text-[10px] font-bold hidden sm:inline-block">
                  Demo #03
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Organização visual de fluxos de trabalho, responsáveis e prazos
              </p>
            </div>
          </div>
        </div>

        {/* Lado Direito: Ações Globais */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleResetTasks}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 cursor-pointer shadow-2xs"
            title="Restaurar dados originais da demonstração"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Restaurar Dados</span>
            <span className="sm:hidden">Reset</span>
          </button>

          <button
            onClick={() => handleOpenCreateModal('todo')}
            className="px-3.5 py-1.5 rounded-xl bg-[#05AD98] hover:bg-[#048F7D] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shadow-[#05AD98]/25 hover:scale-[1.02] active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nova Tarefa</span>
          </button>
        </div>

      </header>

      {/* ========================================================================= */}
      {/* 2. BARRA DE FILTROS, BUSCA & MÉTRICAS                                     */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 py-3.5 bg-white border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        
        {/* Campo de Busca Rápida */}
        <div className="flex-1 min-w-[200px] max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título, descrição ou tag..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filtros por Membro e Prioridade */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Filtro por Membro */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">Todos os Responsáveis</option>
              {TEAM_MEMBERS.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Prioridade */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Flag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">Todas as Prioridades</option>
              <option value="alta">Prioridade Alta</option>
              <option value="media">Prioridade Média</option>
              <option value="baixa">Prioridade Baixa</option>
            </select>
          </div>

          {/* Contador de tarefas filtradas */}
          <span className="text-[11px] font-mono text-slate-400 hidden lg:inline pl-1">
            {filteredTasks.length} de {tasks.length} tarefa{tasks.length > 1 ? 's' : ''}
          </span>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. QUADRO KANBAN: 4 COLUNAS INTERATIVAS (CARROSSEL HORIZONTAL NO MOBILE) */}
      {/* ========================================================================= */}
      {/* SELETOR DE ETAPAS & NAVEGAÇÃO HORIZONTAL (MOBILE) */}
      <div className="md:hidden px-3.5 pt-2.5 pb-2 bg-white border-b border-slate-200/80">
        <div className="flex items-center justify-between mb-1.5 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1 font-bold text-slate-700">
            <span>Fluxo de Trabalho</span>
            <span className="text-[10px] text-slate-400 font-normal">• Deslize para os lados ➔</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {filteredTasks.length} tarefas
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {COLUMNS.map((col, index) => {
            const count = filteredTasks.filter(t => t.columnId === col.id).length;
            const isActive = activeMobileCol === col.id;
            return (
              <button
                key={col.id}
                onClick={() => {
                  setActiveMobileCol(col.id);
                  const el = document.getElementById(`kanban-col-${col.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border shrink-0 ${
                  isActive
                    ? `${col.headerBg} ${col.titleColor} ${col.columnBorder} border-2 shadow-xs ring-1 ${col.hoverRing}`
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{index + 1}. {col.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive ? col.badgeBg : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex-1 p-3 sm:p-6 overflow-x-auto">
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 px-1 scroll-smooth md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible md:gap-5 max-w-7xl mx-auto items-start">
          
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter(t => t.columnId === col.id);
            const isColumnHovered = dragOverColumn === col.id;

            return (
              <div
                key={col.id}
                id={`kanban-col-${col.id}`}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`rounded-2xl border-2 ${col.columnBorder} ${col.topBorder} border-t-4 ${col.columnBg} flex flex-col transition-all duration-200 shadow-sm w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink ${
                  isColumnHovered
                    ? `ring-2 ${col.hoverRing}`
                    : ''
                }`}
              >
                
                {/* Cabeçalho da Coluna com Cor Própria */}
                <div className={`p-3.5 border-b ${col.headerBorder} ${col.headerBg} flex items-center justify-between rounded-t-xl`}>
                  <div className="flex items-center gap-2">
                    <h2 className={`text-sm font-black ${col.titleColor} tracking-tight`}>
                      {col.title}
                    </h2>
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shadow-2xs ${col.badgeBg}`}>
                      {columnTasks.length}
                    </span>
                  </div>

                  {/* Botão rápido para adicionar tarefa nesta coluna */}
                  <button
                    onClick={() => handleOpenCreateModal(col.id)}
                    className={`p-1 rounded-lg ${col.buttonColor} transition-colors cursor-pointer`}
                    title={`Adicionar tarefa em "${col.title}"`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Lista de Cards da Coluna */}
                <div className="p-3 space-y-3 min-h-[380px] flex flex-col justify-start">
                  
                  {columnTasks.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-300/80 rounded-xl my-2 bg-white/40">
                      <span className="text-xs font-semibold text-slate-400 block mb-1">
                        Nenhuma tarefa nesta etapa
                      </span>
                      <button
                        onClick={() => handleOpenCreateModal(col.id)}
                        className="text-[11px] font-bold text-[#05AD98] hover:underline cursor-pointer"
                      >
                        + Criar tarefa aqui
                      </button>
                    </div>
                  ) : (
                    columnTasks.map((task) => {
                      const assignee = getAssignee(task.assigneeId);
                      const isTaskDragged = draggedTaskId === task.id;

                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task.id)}
                          className={`group rounded-xl p-3.5 bg-white border border-slate-200/90 border-l-4 ${col.cardLeftStripe} hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-150 cursor-grab active:cursor-grabbing flex flex-col justify-between gap-3 ${
                            isTaskDragged ? 'opacity-40 scale-95 border-dashed border-slate-400' : ''
                          }`}
                        >
                          
                          {/* Topo do Card: Tags e Ações */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              {/* Tags */}
                              <div className="flex flex-wrap items-center gap-1">
                                {task.tags?.map((tag, idx) => (
                                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Prioridade */}
                              {renderPriorityBadge(task.priority)}
                            </div>

                            {/* Título da Tarefa */}
                            <h3 
                              onClick={() => handleOpenEditModal(task)}
                              className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#05AD98] transition-colors cursor-pointer"
                              title="Clique para editar esta tarefa"
                            >
                              {task.title}
                            </h3>

                            {/* Descrição curta */}
                            {task.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                {task.description}
                              </p>
                            )}
                          </div>

                          {/* Rodapé do Card: Responsável, Data e Botões de Mover */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            
                            {/* Responsável e Data */}
                            <div className="flex items-center gap-2 min-w-0">
                              {/* Avatar */}
                              <div 
                                className={`w-6 h-6 rounded-full ${assignee.avatarBg} text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-2xs`}
                                title={`${assignee.name} (${assignee.role})`}
                              >
                                {assignee.avatarText}
                              </div>

                              {/* Prazo */}
                              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono" title="Data limite">
                                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{formatDateDisplay(task.dueDate)}</span>
                              </div>
                            </div>

                            {/* Ações: Editar, Excluir e Mover com Área de Toque Otimizada para Mobile */}
                            <div className="flex items-center gap-1 shrink-0">
                              
                              {/* Botão de Retroceder Etapa */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStep(task.id, 'prev');
                                }}
                                disabled={col.id === 'todo'}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer active:scale-95"
                                title="Mover para a etapa anterior"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              {/* Botão de Editar */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditModal(task);
                                }}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200/70 transition-colors cursor-pointer active:scale-95"
                                title="Editar detalhes"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Botão de Excluir */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTask(task.id);
                                }}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200/70 transition-colors cursor-pointer active:scale-95"
                                title="Excluir tarefa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Botão de Avançar Etapa */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStep(task.id, 'next');
                                }}
                                disabled={col.id === 'done'}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#05AD98] hover:text-[#048F7D] bg-[#E6F7F5] hover:bg-[#D5F2EE] border border-[#05AD98]/30 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer active:scale-95 font-bold"
                                title="Avançar para a próxima etapa"
                              >
                                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>

                            </div>

                          </div>

                        </div>
                      );
                    })
                  )}

                </div>

              </div>
            );
          })}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. MODAL LIMPO PARA CRIAR / EDITAR TAREFA                                 */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg my-auto rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
          >
            
            {/* Cabeçalho do Modal */}
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E6F7F5] text-[#05AD98] flex items-center justify-center font-bold">
                  {editingTaskId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {editingTaskId ? 'Editar Tarefa' : 'Nova Tarefa'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Preencha os detalhes e atribua aos membros da equipe
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSaveTask} className="p-5 space-y-4 text-xs overflow-y-auto flex-1">
              
              {/* Título */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Revisar proposta contratual da empresa"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] transition-all"
                />
              </div>

              {/* Descrição */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Descrição dos Detalhes
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Instruções claras do que deve ser entregue..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] transition-all resize-none"
                />
              </div>

              {/* Grid: Etapa e Responsável */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Etapa (Coluna) */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Etapa Atual
                  </label>
                  <select
                    value={formColumn}
                    onChange={(e) => setFormColumn(e.target.value as ColumnId)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] cursor-pointer"
                  >
                    {COLUMNS.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {/* Responsável */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Pessoa Responsável
                  </label>
                  <select
                    value={formAssignee}
                    onChange={(e) => setFormAssignee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] cursor-pointer"
                  >
                    {TEAM_MEMBERS.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.role.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Grid: Data de Entrega, Prioridade e Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Prazo */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Prazo de Entrega
                  </label>
                  <input
                    type="date"
                    required
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] cursor-pointer font-mono"
                  />
                </div>

                {/* Prioridade */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Prioridade
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98] cursor-pointer"
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>

                {/* Tag / Categoria */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Etiqueta / Tag
                  </label>
                  <input
                    type="text"
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    placeholder="Ex: Comercial"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#05AD98]/30 focus:border-[#05AD98]"
                  />
                </div>

              </div>

              {/* Botões do Rodapé do Modal */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {editingTaskId ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(editingTaskId)}
                    className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Excluir</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#05AD98] hover:bg-[#048F7D] text-white font-bold transition-all cursor-pointer shadow-xs shadow-[#05AD98]/20"
                  >
                    {editingTaskId ? 'Salvar Alterações' : 'Criar Tarefa'}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TOAST NOTIFICATION DE SUCESSO                                          */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#05AD98] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
