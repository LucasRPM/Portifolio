import React, { useState, useMemo } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Edit2, 
  Eye, 
  History, 
  User, 
  Check, 
  X,
  Layers,
  Sparkles
} from 'lucide-react';

export interface Ticket {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'Compras' | 'Manutenção' | 'TI' | 'Faturamento' | 'Operacional';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  status: 'Pendente' | 'Em Andamento' | 'Concluída';
  requester: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't-1',
    code: 'SOL-1042',
    title: 'Ajuste de divergência em tabela de faturamento convênios',
    description: 'Conferência de preços do lote de exames de março com inconsistência de centavos entre o sistema interno e o relatório gerado.',
    category: 'Faturamento',
    priority: 'Alta',
    status: 'Em Andamento',
    requester: 'Beatriz Almeida',
    assignee: 'Carlos Engenharia',
    createdAt: '12/10/2026 09:15',
    updatedAt: '12/10/2026 10:30'
  },
  {
    id: 't-2',
    code: 'SOL-1041',
    title: 'Automação da rotina de validação de planilhas de compras',
    description: 'Desenvolver rotina para remover duplicidades e preencher códigos faltantes antes do envio para a contabilidade.',
    category: 'Operacional',
    priority: 'Média',
    status: 'Pendente',
    requester: 'Rodrigo Mendes',
    assignee: 'Não atribuído',
    createdAt: '11/10/2026 16:40',
    updatedAt: '11/10/2026 16:40'
  },
  {
    id: 't-3',
    code: 'SOL-1040',
    title: 'Documentação e Padronização de Processos Operacionais',
    description: 'Mapeamento do fluxo de entrada de requisições e padronização das etapas de triagem para novos colaboradores.',
    category: 'Operacional',
    priority: 'Média',
    status: 'Concluída',
    requester: 'Mariana Lima',
    assignee: 'Carlos Engenharia',
    createdAt: '10/10/2026 11:20',
    updatedAt: '11/10/2026 14:00'
  },
  {
    id: 't-4',
    code: 'SOL-1039',
    title: 'Manutenção preventiva em servidor de relatórios internos',
    description: 'Verificação periódica de integridade dos backups e tempo de resposta das consultas do banco de dados.',
    category: 'TI',
    priority: 'Baixa',
    status: 'Concluída',
    requester: 'Suporte Técnico',
    assignee: 'Equipe de Infra',
    createdAt: '09/10/2026 08:00',
    updatedAt: '09/10/2026 11:30'
  },
  {
    id: 't-5',
    code: 'SOL-1038',
    title: 'Integração de dados de exames com layout do eSocial',
    description: 'Validação prévia dos campos obrigatórios de SST para evitar rejeições no envio oficial do lote mensal.',
    category: 'Faturamento',
    priority: 'Crítica',
    status: 'Pendente',
    requester: 'Coordenação SST',
    assignee: 'Não atribuído',
    createdAt: '08/10/2026 14:50',
    updatedAt: '08/10/2026 14:50'
  }
];

interface FlowDeskDemoProps {
  onContactRequest?: () => void;
}

export const FlowDeskDemo: React.FC<FlowDeskDemoProps> = ({ onContactRequest }) => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [historyLog, setHistoryLog] = useState<string[]>([
    "Sessão iniciada com 5 chamados de exemplo pré-carregados."
  ]);

  // Filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Pendente' | 'Em Andamento' | 'Concluída'>('Todos');
  const [priorityFilter, setPriorityFilter] = useState<string>('Todas');

  // Modais de Criação e Edição/Visualização
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [selectedTicketDetail, setSelectedTicketDetail] = useState<Ticket | null>(null);

  // Formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Operacional' as Ticket['category'],
    priority: 'Média' as Ticket['priority'],
    requester: '',
    assignee: ''
  });

  // Métricas calculadas em tempo real
  const metrics = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter(t => t.status === 'Pendente').length;
    const inProgress = tickets.filter(t => t.status === 'Em Andamento').length;
    const completed = tickets.filter(t => t.status === 'Concluída').length;
    return { total, pending, inProgress, completed };
  }, [tickets]);

  // Lista filtrada
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesSearch = 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'Todas' || t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  // Ações de Mudança de Status
  const handleStatusChange = (id: string, newStatus: Ticket['status']) => {
    const now = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: newStatus, updatedAt: now };
      }
      return t;
    }));

    const ticket = tickets.find(t => t.id === id);
    if (ticket) {
      setHistoryLog(prev => [
        `[${now}] Status do chamado ${ticket.code} alterado para "${newStatus}".`,
        ...prev
      ]);
    }
  };

  // Abrir Modal de Cadastro
  const handleOpenCreateModal = () => {
    setEditingTicket(null);
    setFormData({
      title: '',
      description: '',
      category: 'Operacional',
      priority: 'Média',
      requester: '',
      assignee: 'Não atribuído'
    });
    setIsModalOpen(true);
  };

  // Abrir Modal de Edição
  const handleOpenEditModal = (t: Ticket) => {
    setEditingTicket(t);
    setFormData({
      title: t.title,
      description: t.description,
      category: t.category,
      priority: t.priority,
      requester: t.requester,
      assignee: t.assignee
    });
    setIsModalOpen(true);
  };

  // Salvar Chamado (Novo ou Editado)
  const handleSaveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const now = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (editingTicket) {
      // Edição
      setTickets(prev => prev.map(t => {
        if (t.id === editingTicket.id) {
          return {
            ...t,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            priority: formData.priority,
            requester: formData.requester || 'Solicitante Interno',
            assignee: formData.assignee || 'Não atribuído',
            updatedAt: now
          };
        }
        return t;
      }));
      setHistoryLog(prev => [`[${now}] Chamado ${editingTicket.code} editado com sucesso.`, ...prev]);
    } else {
      // Criação
      const newCode = `SOL-${1040 + tickets.length + 1}`;
      const newTicket: Ticket = {
        id: `t-${Date.now()}`,
        code: newCode,
        title: formData.title,
        description: formData.description || 'Sem descrição adicional fornecida.',
        category: formData.category,
        priority: formData.priority,
        status: 'Pendente',
        requester: formData.requester || 'Você (Visitante)',
        assignee: formData.assignee || 'Não atribuído',
        createdAt: now,
        updatedAt: now
      };
      setTickets(prev => [newTicket, ...prev]);
      setHistoryLog(prev => [`[${now}] Novo chamado cadastrado: ${newCode} - "${newTicket.title}".`, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Resetar Ambiente
  const handleReset = () => {
    setTickets(INITIAL_TICKETS);
    setSearchTerm('');
    setStatusFilter('Todos');
    setPriorityFilter('Todas');
    setHistoryLog(["Ambiente demonstrativo restaurado aos dados de exemplo iniciais."]);
  };

  const getPriorityBadgeVariant = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'Crítica': return 'red';
      case 'Alta': return 'amber';
      case 'Média': return 'blue';
      default: return 'slate';
    }
  };

  const getStatusBadge = (status: Ticket['status']) => {
    switch (status) {
      case 'Pendente':
        return <Badge variant="amber" icon={<Clock className="w-3 h-3" />}>Pendente</Badge>;
      case 'Em Andamento':
        return <Badge variant="blue" icon={<ArrowRight className="w-3 h-3" />}>Em Andamento</Badge>;
      case 'Concluída':
        return <Badge variant="mint" icon={<CheckCircle className="w-3 h-3" />}>Concluída</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Barra de Notificação de Demonstração Funcional */}
      <div className="p-4 rounded-xl bg-[#1F2B37] border border-[#4F76F6]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#4F76F6]/20 border border-[#4F76F6]/40 flex items-center justify-center text-[#4F76F6] shrink-0">
            <Sparkles className="w-5 h-5 text-[#77F2A1]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Demonstração Interativa em Tempo Real</h3>
            <p className="text-xs text-[#8B9EAF]">
              Crie chamados, altere status, pesquise e acompanhe os indicadores mudarem instantaneamente.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#77F2A1]" />}
            className="text-xs"
          >
            Restaurar Dados
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleOpenCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
            className="text-xs font-semibold"
          >
            Nova Solicitação
          </Button>
        </div>
      </div>

      {/* DASHBOARD: Indicadores por Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card variant="solid" className="p-5 bg-[#253443] border-[#36485C] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#8B9EAF] uppercase tracking-wider font-semibold">Total Geral</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F9F9F9] mt-1">{metrics.total}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#1F2B37] border border-[#36485C] flex items-center justify-center text-[#85A1FC]">
            <Layers className="w-5 h-5" />
          </div>
        </Card>

        <Card variant="solid" className="p-5 bg-[#253443] border-[#36485C] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">Pendentes</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">{metrics.pending}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </Card>

        <Card variant="solid" className="p-5 bg-[#253443] border-[#36485C] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#4F76F6] uppercase tracking-wider font-semibold">Em Andamento</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#85A1FC] mt-1">{metrics.inProgress}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#4F76F6]/10 border border-[#4F76F6]/20 flex items-center justify-center text-[#4F76F6]">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Card>

        <Card variant="solid" className="p-5 bg-[#253443] border-[#36485C] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#77F2A1] uppercase tracking-wider font-semibold">Concluídas</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#77F2A1] mt-1">{metrics.completed}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#77F2A1]/10 border border-[#77F2A1]/20 flex items-center justify-center text-[#77F2A1]">
            <CheckCircle className="w-5 h-5" />
          </div>
        </Card>

      </div>

      {/* BARRA DE PESQUISA E FILTROS */}
      <div className="p-4 rounded-xl bg-[#1F2B37] border border-[#36485C] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Campo de Busca */}
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-[#8B9EAF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, título, solicitante ou responsável..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white placeholder-[#8B9EAF] focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
          />
        </div>

        {/* Filtros de Status e Prioridade */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#8B9EAF] font-mono">
            <Filter className="w-3.5 h-3.5 text-[#4F76F6]" />
            Status:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#253443] border border-[#36485C] text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Pendente">Apenas Pendentes</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluídas</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#253443] border border-[#36485C] text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
          >
            <option value="Todas">Todas as Prioridades</option>
            <option value="Crítica">Crítica</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>

      </div>

      {/* TABELA / LISTA DE SOLICITAÇÕES */}
      <div className="rounded-xl bg-[#1F2B37] border border-[#36485C] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#141D26] text-xs font-mono uppercase text-[#8B9EAF] border-b border-[#36485C]">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Título & Descrição</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Prioridade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4 text-right">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#36485C]/60">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#8B9EAF]">
                    Nenhuma solicitação encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredTickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-[#253443]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#85A1FC] text-xs whitespace-nowrap">
                      {ticket.code}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="font-semibold text-white leading-snug truncate" title={ticket.title}>
                        {ticket.title}
                      </div>
                      <div className="text-xs text-[#8B9EAF] truncate mt-0.5" title={ticket.description}>
                        {ticket.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#141D26] text-[#C5D1DE] border border-[#36485C]">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(ticket.status)}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#C5D1DE] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#8B9EAF]" />
                        <span>{ticket.assignee}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        
                        {/* Botão de mudança de status com 1 clique */}
                        {ticket.status === 'Pendente' && (
                          <button
                            onClick={() => handleStatusChange(ticket.id, 'Em Andamento')}
                            className="px-2 py-1 rounded bg-[#4F76F6]/20 hover:bg-[#4F76F6] text-[#85A1FC] hover:text-white text-[11px] font-semibold border border-[#4F76F6]/30 transition-colors cursor-pointer"
                            title="Iniciar atendimento"
                          >
                            Iniciar
                          </button>
                        )}

                        {ticket.status === 'Em Andamento' && (
                          <button
                            onClick={() => handleStatusChange(ticket.id, 'Concluída')}
                            className="px-2 py-1 rounded bg-[#77F2A1]/20 hover:bg-[#77F2A1] text-[#77F2A1] hover:text-[#141D26] text-[11px] font-semibold border border-[#77F2A1]/30 transition-colors cursor-pointer"
                            title="Concluir chamado"
                          >
                            Concluir
                          </button>
                        )}

                        {ticket.status === 'Concluída' && (
                          <button
                            onClick={() => handleStatusChange(ticket.id, 'Em Andamento')}
                            className="px-2 py-1 rounded bg-[#253443] hover:bg-[#36485C] text-[#C5D1DE] text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Reabrir chamado"
                          >
                            Reabrir
                          </button>
                        )}

                        {/* Visualizar Detalhes */}
                        <button
                          onClick={() => setSelectedTicketDetail(ticket)}
                          className="p-1.5 rounded hover:bg-[#253443] text-[#8B9EAF] hover:text-white cursor-pointer"
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Editar */}
                        <button
                          onClick={() => handleOpenEditModal(ticket)}
                          className="p-1.5 rounded hover:bg-[#253443] text-[#8B9EAF] hover:text-white cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* HISTÓRICO DE AUDITORIA DA SESSÃO */}
      <div className="p-4 rounded-xl bg-[#141D26] border border-[#36485C] space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#77F2A1] font-bold">
          <History className="w-4 h-4" />
          Log de Auditoria em Tempo Real (Eventos da Sessão)
        </div>
        <div className="max-h-28 overflow-y-auto space-y-1 text-xs font-mono text-[#8B9EAF]">
          {historyLog.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#4F76F6]">›</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER COMERCIAL CONTEXTUAL */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#1F2B37] via-[#253443] to-[#1F2B37] border border-[#4F76F6]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-white">
            Precisa de um sistema de controle e chamados sob medida para sua equipe?
          </h4>
          <p className="text-xs text-[#C5D1DE]">
            Desenvolvo ferramentas com regras de negócio específicas da sua operação, sem custos desnecessários de softwares genéricos.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={onContactRequest}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Conversar Sobre Sistema de Gestão
        </Button>
      </div>

      {/* MODAL DE CADASTRO / EDIÇÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F2B37] border border-[#36485C] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#36485C] pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingTicket ? `Editar Chamado ${editingTicket.code}` : "Nova Solicitação Interna"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8B9EAF] hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8B9EAF]">Título da Demanda *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Ajustar parametrização de relatório..."
                  className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8B9EAF]">Descrição do Problema</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva detalhes, contexto e o que precisa ser feito..."
                  className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8B9EAF]">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                  >
                    <option value="Operacional">Operacional</option>
                    <option value="Faturamento">Faturamento</option>
                    <option value="TI">TI</option>
                    <option value="Compras">Compras</option>
                    <option value="Manutenção">Manutenção</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8B9EAF]">Prioridade</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8B9EAF]">Solicitante</label>
                  <input
                    type="text"
                    value={formData.requester}
                    onChange={(e) => setFormData({ ...formData, requester: e.target.value })}
                    placeholder="Ex: Seu Nome"
                    className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8B9EAF]">Responsável</label>
                  <input
                    type="text"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    placeholder="Ex: Carlos Engenharia"
                    className="w-full px-3 py-2 rounded-lg bg-[#253443] border border-[#36485C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F76F6]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-[#36485C]">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="sm" leftIcon={<Check className="w-4 h-4" />}>
                  {editingTicket ? "Salvar Alterações" : "Cadastrar Solicitação"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE DETALHES */}
      {selectedTicketDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F2B37] border border-[#36485C] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#36485C] pb-3">
              <div>
                <span className="text-xs font-mono text-[#85A1FC]">{selectedTicketDetail.code}</span>
                <h3 className="text-lg font-bold text-white leading-tight">{selectedTicketDetail.title}</h3>
              </div>
              <button onClick={() => setSelectedTicketDetail(null)} className="text-[#8B9EAF] hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#C5D1DE]">
              <div className="p-3 rounded-lg bg-[#253443] border border-[#36485C] space-y-1">
                <div className="text-[11px] font-mono text-[#8B9EAF]">Descrição Completa:</div>
                <p className="text-sm text-white leading-relaxed">{selectedTicketDetail.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono">
                <div><strong>Categoria:</strong> {selectedTicketDetail.category}</div>
                <div><strong>Prioridade:</strong> {selectedTicketDetail.priority}</div>
                <div><strong>Status:</strong> {selectedTicketDetail.status}</div>
                <div><strong>Solicitante:</strong> {selectedTicketDetail.requester}</div>
                <div><strong>Responsável:</strong> {selectedTicketDetail.assignee}</div>
                <div><strong>Criado em:</strong> {selectedTicketDetail.createdAt}</div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#36485C]">
              <Button size="sm" variant="secondary" onClick={() => setSelectedTicketDetail(null)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
