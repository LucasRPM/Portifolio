import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  FileText, 
  Trash2, 
  Printer, 
  CreditCard, 
  X,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  DollarSign
} from 'lucide-react';

export type TransactionType = 'entrada' | 'saida';

export type PaymentMethod = 
  | 'Pix' 
  | 'Dinheiro' 
  | 'Cartão de Crédito' 
  | 'Cartão de Débito' 
  | 'Boleto' 
  | 'Transferência';

export interface CashTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  type: TransactionType;
  amount: number;
  paymentMethod: PaymentMethod;
  category: string;
}

// =========================================================================
// LANÇAMENTOS INICIAIS COM DISTRIBUIÇÃO TEMPORAL REALISTA
// =========================================================================
// Permite que "Hoje", "Últimos 7 dias", "Este Mês" e "Todos" retornem
// números de lançamentos e saldos nitidamente diferentes para avaliação.
const INITIAL_TRANSACTIONS: CashTransaction[] = [
  // --- 1. HOJE (12/10/2026) -> 3 lançamentos
  {
    id: 'tx-1',
    date: '2026-10-12',
    description: 'Venda Balcão #1042',
    type: 'entrada',
    amount: 380.00,
    paymentMethod: 'Pix',
    category: 'Vendas'
  },
  {
    id: 'tx-2',
    date: '2026-10-12',
    description: 'Almoço Equipe Operacional',
    type: 'saida',
    amount: 68.50,
    paymentMethod: 'Cartão de Débito',
    category: 'Alimentação'
  },
  {
    id: 'tx-3',
    date: '2026-10-12',
    description: 'Prestação de Serviço Especializado',
    type: 'entrada',
    amount: 1250.00,
    paymentMethod: 'Pix',
    category: 'Serviços'
  },

  // --- 2. ÚLTIMOS 7 DIAS (06/10 a 11/10/2026) -> +5 lançamentos (total 8)
  {
    id: 'tx-4',
    date: '2026-10-11',
    description: 'Venda Balcão #1041',
    type: 'entrada',
    amount: 195.00,
    paymentMethod: 'Dinheiro',
    category: 'Vendas'
  },
  {
    id: 'tx-5',
    date: '2026-10-10',
    description: 'Fornecedor de Embalagens',
    type: 'saida',
    amount: 420.00,
    paymentMethod: 'Boleto',
    category: 'Fornecedores'
  },
  {
    id: 'tx-6',
    date: '2026-10-09',
    description: 'Venda Balcão #1040',
    type: 'entrada',
    amount: 540.00,
    paymentMethod: 'Cartão de Crédito',
    category: 'Vendas'
  },
  {
    id: 'tx-7',
    date: '2026-10-08',
    description: 'Licença de Software Operacional',
    type: 'saida',
    amount: 149.90,
    paymentMethod: 'Cartão de Crédito',
    category: 'Tecnologia'
  },
  {
    id: 'tx-8',
    date: '2026-10-06',
    description: 'Material de Escritório e Etiquetas',
    type: 'saida',
    amount: 85.00,
    paymentMethod: 'Cartão de Débito',
    category: 'Operacional'
  },

  // --- 3. ESTE MÊS (01/10 a 05/10/2026) -> +4 lançamentos (total 12)
  {
    id: 'tx-9',
    date: '2026-10-04',
    description: 'Desenvolvimento de Automação Interna',
    type: 'entrada',
    amount: 2800.00,
    paymentMethod: 'Pix',
    category: 'Serviços'
  },
  {
    id: 'tx-10',
    date: '2026-10-03',
    description: 'Compra de Matéria-Prima Mensal',
    type: 'saida',
    amount: 1150.00,
    paymentMethod: 'Boleto',
    category: 'Fornecedores'
  },
  {
    id: 'tx-11',
    date: '2026-10-02',
    description: 'Manutenção Preventiva de Computadores',
    type: 'saida',
    amount: 380.00,
    paymentMethod: 'Transferência',
    category: 'Operacional'
  },
  {
    id: 'tx-12',
    date: '2026-10-01',
    description: 'Mensalidade de Suporte Técnico',
    type: 'entrada',
    amount: 890.00,
    paymentMethod: 'Pix',
    category: 'Serviços'
  },

  // --- 4. MESES ANTERIORES (Setembro e Agosto/2026) -> +5 lançamentos (total 17 no "Todos")
  {
    id: 'tx-13',
    date: '2026-09-28',
    description: 'Consultoria em Mapeamento de Processos',
    type: 'entrada',
    amount: 4200.00,
    paymentMethod: 'Pix',
    category: 'Serviços'
  },
  {
    id: 'tx-14',
    date: '2026-09-20',
    description: 'Conta de Energia e Link de Internet',
    type: 'saida',
    amount: 460.00,
    paymentMethod: 'Boleto',
    category: 'Operacional'
  },
  {
    id: 'tx-15',
    date: '2026-09-15',
    description: 'Aquisição de Equipamento de Rede',
    type: 'saida',
    amount: 890.00,
    paymentMethod: 'Cartão de Crédito',
    category: 'Operacional'
  },
  {
    id: 'tx-16',
    date: '2026-08-30',
    description: 'Implantação de Painel Gerencial',
    type: 'entrada',
    amount: 3500.00,
    paymentMethod: 'Transferência',
    category: 'Serviços'
  },
  {
    id: 'tx-17',
    date: '2026-08-22',
    description: 'Certificado Digital e Registro Anual',
    type: 'saida',
    amount: 290.00,
    paymentMethod: 'Boleto',
    category: 'Tecnologia'
  }
];

const PAYMENT_METHODS: PaymentMethod[] = [
  'Pix',
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Boleto',
  'Transferência'
];

const CATEGORIES = [
  'Vendas',
  'Serviços',
  'Alimentação',
  'Fornecedores',
  'Operacional',
  'Tecnologia',
  'Outros'
];

export const CashControlDemo: React.FC = () => {
  const [transactions, setTransactions] = useState<CashTransaction[]>(INITIAL_TRANSACTIONS);
  
  // Filtros
  const [periodFilter, setPeriodFilter] = useState<'hoje' | '7dias' | 'mes' | 'todos'>('mes');
  const [typeFilter, setTypeFilter] = useState<'todos' | 'entrada' | 'saida'>('todos');
  const [paymentFilter, setPaymentFilter] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Form State
  const [newType, setNewType] = useState<TransactionType>('entrada');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newMethod, setNewMethod] = useState<PaymentMethod>('Pix');
  const [newCategory, setNewCategory] = useState('Vendas');

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Contagem prévia por período para exibir badges visuais nas abas
  const periodCounts = useMemo(() => {
    let hojeCount = 0;
    let dias7Count = 0;
    let mesCount = 0;

    const limit7 = new Date();
    limit7.setDate(limit7.getDate() - 7);
    const limit7Str = limit7.toISOString().split('T')[0];
    const currentMonthPrefix = todayStr.substring(0, 7);

    transactions.forEach(t => {
      if (t.date === todayStr) hojeCount++;
      if (t.date >= limit7Str) dias7Count++;
      if (t.date.startsWith(currentMonthPrefix)) mesCount++;
    });

    return {
      hoje: hojeCount,
      dias7: dias7Count,
      mes: mesCount,
      todos: transactions.length
    };
  }, [transactions, todayStr]);

  // Filtragem dos dados
  const filteredTransactions = useMemo(() => {
    return transactions.filter(item => {
      // Filtro de Tipo
      if (typeFilter !== 'todos' && item.type !== typeFilter) return false;

      // Filtro de Forma de Pagamento
      if (paymentFilter !== 'todas' && item.paymentMethod !== paymentFilter) return false;

      // Filtro de Período
      if (periodFilter === 'hoje' && item.date !== todayStr) return false;
      if (periodFilter === '7dias') {
        const itemDate = new Date(item.date);
        const limit = new Date();
        limit.setDate(limit.getDate() - 7);
        if (itemDate < limit) return false;
      }
      if (periodFilter === 'mes') {
        const currentMonth = todayStr.substring(0, 7); // YYYY-MM
        if (!item.date.startsWith(currentMonth)) return false;
      }

      // Busca por descrição ou categoria
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [transactions, typeFilter, paymentFilter, periodFilter, searchQuery, todayStr]);

  // Cálculos do Período
  const totals = useMemo(() => {
    let entradas = 0;
    let saidas = 0;

    filteredTransactions.forEach(t => {
      if (t.type === 'entrada') entradas += t.amount;
      if (t.type === 'saida') saidas += t.amount;
    });

    const saldo = entradas - saidas;
    const count = filteredTransactions.length;
    const ticketMedio = count > 0 ? (entradas + saidas) / count : 0;

    // Forma de pagamento mais usada e distribuição
    const methodCounts: Record<string, { count: number; total: number }> = {};
    filteredTransactions.forEach(t => {
      if (!methodCounts[t.paymentMethod]) {
        methodCounts[t.paymentMethod] = { count: 0, total: 0 };
      }
      methodCounts[t.paymentMethod].count += 1;
      methodCounts[t.paymentMethod].total += t.amount;
    });

    let topMethod = 'N/A';
    let maxCount = 0;
    Object.entries(methodCounts).forEach(([method, data]) => {
      if (data.count > maxCount) {
        maxCount = data.count;
        topMethod = method;
      }
    });

    return { entradas, saidas, saldo, count, ticketMedio, topMethod, methodCounts };
  }, [filteredTransactions]);

  // Formatar BRL
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  // Formatar Data
  const formatDateBR = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  // Badge estilizado por forma de pagamento
  const renderPaymentBadge = (method: PaymentMethod) => {
    const styles: Record<PaymentMethod, string> = {
      Pix: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Cartão de Crédito': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Cartão de Débito': 'bg-sky-100 text-sky-800 border-sky-300',
      Dinheiro: 'bg-teal-100 text-teal-800 border-teal-300',
      Boleto: 'bg-amber-100 text-amber-800 border-amber-300',
      Transferência: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${styles[method] || 'bg-slate-100 text-slate-700 border-slate-300'}`}>
        {method}
      </span>
    );
  };

  // Adicionar lançamento
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount.replace(',', '.'));
    if (!newDesc.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newItem: CashTransaction = {
      id: `tx-${Date.now()}`,
      date: newDate,
      description: newDesc.trim(),
      type: newType,
      amount: parsedAmount,
      paymentMethod: newMethod,
      category: newCategory
    };

    setTransactions(prev => [newItem, ...prev]);
    setIsModalOpen(false);

    // Reset formulário
    setNewDesc('');
    setNewAmount('');
  };

  // Abrir modal com pré-seleção
  const openModalWithType = (type: TransactionType) => {
    setNewType(type);
    setIsModalOpen(true);
  };

  // Excluir lançamento
  const handleDelete = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Resetar para dados de exemplo
  const handleResetExample = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setPeriodFilter('mes');
    setTypeFilter('todos');
    setPaymentFilter('todas');
    setSearchQuery('');
  };

  // Acionar impressão/exportação para PDF
  const handlePrintReport = () => {
    window.print();
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '#demonstracoes';
  };

  const periodLabel = useMemo(() => {
    switch (periodFilter) {
      case 'hoje': return 'Hoje (12/10/2026)';
      case '7dias': return 'Últimos 7 dias';
      case 'mes': return 'Mês Atual (Outubro/2026)';
      case 'todos': return 'Histórico Consolidado (Todos)';
    }
  }, [periodFilter]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOPO DA DEMONSTRAÇÃO (Identidade Executiva com Alto Contraste)         */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Botão Voltar ao Portfólio & Título do Sistema */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={handleBackToPortfolio}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer shrink-0"
              title="Voltar ao Portfólio Principal"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Voltar ao Portfólio</span>
              <span className="sm:hidden">Voltar</span>
            </button>

            <div className="h-7 w-px bg-slate-700 hidden sm:block shrink-0"></div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                      CONTROLE DE CAIXA
                    </h1>
                    <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden md:inline">
                      DEMO 01
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                    Gestão de Fluxo Financeiro, Lançamentos e Fechamento Operacional
                  </p>
                </div>
              </div>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full hidden sm:inline-block">
            Sistema Ativo
          </span>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO PRINCIPAL                                                    */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 print:hidden">
        
        {/* Banner de Boas-Vindas e Controles de Ação Principais */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                Demonstração interativa de controle de caixa empresarial
              </p>
              <p className="text-xs text-slate-500">
                Alterne os períodos para avaliar as variações de saldo, filtre lançamentos ou adicione novos dados.
              </p>
            </div>
          </div>
          
          {/* Controles de Ação Agrupados (Novo Lançamento, Relatório PDF e Restaurar) */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Novo Lançamento</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer border border-slate-700"
              title="Visualizar e exportar relatório limpo em PDF"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Relatório PDF</span>
            </button>

            <button
              onClick={handleResetExample}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Restaurar lançamentos e filtros de exemplo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Restaurar Exemplo</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CARDS DE MÉTRICAS COM CONTRASTES FORTES E HIERARQUIA CLARA             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card Protagonista: Saldo Líquido com Visual Executivo Escuro */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white border-2 border-slate-700 shadow-lg flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Saldo do Período
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                totals.saldo >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${totals.saldo >= 0 ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
                {totals.saldo >= 0 ? 'Caixa Positivo' : 'Alerta Negativo'}
              </span>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight ${
                totals.saldo >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {formatBRL(totals.saldo)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block font-mono">
                {periodLabel}
              </span>
            </div>
          </div>

          {/* Card: Total de Entradas (Receitas) - Verde Esmeralda */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-emerald-50/70 to-white border-2 border-emerald-300 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold text-emerald-900 uppercase tracking-wider">
                Entradas (Receitas)
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-800 tracking-tight">
                {formatBRL(totals.entradas)}
              </div>
              <span className="text-[11px] font-bold text-emerald-700 mt-1 block">
                + Vendas e prestações recebidas
              </span>
            </div>
          </div>

          {/* Card: Total de Saídas (Despesas) - Carmim / Rose */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-rose-50/70 to-white border-2 border-rose-300 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold text-rose-900 uppercase tracking-wider">
                Saídas (Despesas)
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-rose-800 tracking-tight">
                {formatBRL(totals.saidas)}
              </div>
              <span className="text-[11px] font-bold text-rose-700 mt-1 block">
                - Pagamentos, contas e fornecedores
              </span>
            </div>
          </div>

          {/* Card: Indicadores de Eficiência */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-indigo-50/60 to-white border-2 border-indigo-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold text-indigo-950 uppercase tracking-wider">
                Indicadores Chave
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-700 pb-1.5 border-b border-indigo-100">
                <span>Registros:</span>
                <span className="font-extrabold text-slate-900">{totals.count} transações</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 pb-1.5 border-b border-indigo-100">
                <span>Ticket Médio:</span>
                <span className="font-extrabold text-slate-900">{formatBRL(totals.ticketMedio)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Canal Líder:</span>
                <span className="font-black text-indigo-700">{totals.topMethod}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. BARRA DE FILTROS COM DESTAQUE CLARO E SEM COINCIDÊNCIAS               */}
        {/* ========================================================================= */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Seletor de Período Rápido com Contadores em Cada Botão */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Período:
              </span>
              
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setPeriodFilter('hoje')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    periodFilter === 'hoje'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>Hoje</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    periodFilter === 'hoje' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {periodCounts.hoje}
                  </span>
                </button>

                <button
                  onClick={() => setPeriodFilter('7dias')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    periodFilter === '7dias'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>Últimos 7 dias</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    periodFilter === '7dias' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {periodCounts.dias7}
                  </span>
                </button>

                <button
                  onClick={() => setPeriodFilter('mes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    periodFilter === 'mes'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>Este Mês</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    periodFilter === 'mes' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {periodCounts.mes}
                  </span>
                </button>

                <button
                  onClick={() => setPeriodFilter('todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    periodFilter === 'todos'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>Todos</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    periodFilter === 'todos' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {periodCounts.todos}
                  </span>
                </button>
              </div>
            </div>

            {/* Filtros de Tipo, Forma de Pagamento e Botões Rápidos */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Filtro de Tipo */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <span>Tipo:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="todos">Todos (Entradas e Saídas)</option>
                  <option value="entrada">Apenas Entradas (+)</option>
                  <option value="saida">Apenas Saídas (-)</option>
                </select>
              </div>

              {/* Filtro de Forma de Pagamento */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <span>Pagamento:</span>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="todas">Todas as formas</option>
                  {PAYMENT_METHODS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Ações Rápidas de Lançamento */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <button
                  onClick={() => openModalWithType('entrada')}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Registrar receita rápida"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Entrada</span>
                </button>
                <button
                  onClick={() => openModalWithType('saida')}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Registrar despesa rápida"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Saída</span>
                </button>
              </div>

            </div>

          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative pt-2 border-t border-slate-100">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-5" />
            <input
              type="text"
              placeholder="Buscar por descrição ou categoria (ex: Venda, Almoço, Software, Pix...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. TABELA DE LANÇAMENTOS (Com Destaques e Identidade Visual Forte)        */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>Lançamentos Registrados</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {filteredTransactions.length} registros
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Exibição para: {periodLabel}
              </p>
            </div>

            <button
              onClick={() => setIsReportOpen(true)}
              className="text-xs font-bold text-slate-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span>Gerar Relatório Deste Período</span>
            </button>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <Wallet className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Nenhum lançamento encontrado para os filtros atuais.</p>
              <p className="text-xs text-slate-400">Tente alternar o período para "Este Mês" ou "Todos", ou limpe os termos de busca.</p>
              <button
                onClick={handleResetExample}
                className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Restaurar dados de exemplo
              </button>
            </div>
          ) : (
            <>
              {/* TABELA DESKTOP */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-5 font-bold">Data</th>
                      <th className="py-3 px-5 font-bold">Descrição</th>
                      <th className="py-3 px-5 font-bold">Categoria</th>
                      <th className="py-3 px-5 font-bold">Forma de Pagto</th>
                      <th className="py-3 px-5 font-bold text-right">Valor</th>
                      <th className="py-3 px-5 font-bold text-center w-16">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-5 font-mono text-slate-600 font-medium whitespace-nowrap">
                          {formatDateBR(t.date)}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-slate-900">
                          {t.description}
                        </td>
                        <td className="py-3.5 px-5 text-slate-600">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            {t.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          {renderPaymentBadge(t.paymentMethod)}
                        </td>
                        <td className={`py-3.5 px-5 font-mono font-black text-right whitespace-nowrap text-sm ${
                          t.type === 'entrada' ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${
                            t.type === 'entrada' ? 'bg-emerald-50' : 'bg-rose-50'
                          }`}>
                            {t.type === 'entrada' ? '+' : '-'} {formatBRL(t.amount)}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Excluir lançamento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* LISTA DE CARDS MOBILE */}
              <div className="md:hidden divide-y divide-slate-100">
                {filteredTransactions.map(t => (
                  <div key={t.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{t.description}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[11px] text-slate-500">{formatDateBR(t.date)}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">{t.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-black text-sm block ${
                          t.type === 'entrada' ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {t.type === 'entrada' ? '+' : '-'} {formatBRL(t.amount)}
                        </span>
                        <div className="mt-1">
                          {renderPaymentBadge(t.paymentMethod)}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 6. MODAL DE NOVO LANÇAMENTO                                              */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:hidden overflow-y-auto">
          <div className="w-full max-w-md my-auto rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
            
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black">
                  Novo Lançamento Financeiro
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              
              {/* Seletor de Tipo (Entrada ou Saída) */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setNewType('entrada')}
                  className={`py-2 rounded-lg font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    newType === 'entrada'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Entrada (+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('saida')}
                  className={`py-2 rounded-lg font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    newType === 'saida'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ArrowDownRight className="w-4 h-4" />
                  <span>Saída (-)</span>
                </button>
              </div>

              {/* Descrição */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Descrição do Lançamento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Venda Balcão #1043, Pagamento Fornecedor..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              {/* Valor e Data */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="0,00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 font-mono font-bold text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Data</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Forma de Pagamento e Categoria */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Forma de Pagto</label>
                  <select
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    {PAYMENT_METHODS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botões */}
              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer shadow-sm shadow-emerald-600/30"
                >
                  Confirmar Lançamento
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. RELATÓRIO PDF EXECUTIVO (Impressão A4 Limpa e sem Cabeçalhos Nativos)  */}
      {/* ========================================================================= */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print-modal-backdrop overflow-y-auto">
          
          <div className="w-full max-w-3xl my-auto rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden print-a4-sheet">
            
            {/* Barra de Ações Superior do Modal (Oculta na Impressão) */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-black">
                    Pré-Visualização do Relatório
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Pronto para impressão em folha A4 ou exportação para PDF
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReport}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/30 transition-transform active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button
                  onClick={() => setIsReportOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Aviso Amigável para Instruir o Usuário Sobre o Diálogo de Impressão (Oculto na Impressão) */}
            <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900 print:hidden">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Formatação Executiva A4:</strong> As margens foram calibradas para folha limpa sem bordas cinzas. No diálogo de impressão, escolha a impressora <em>"Salvar como PDF"</em>.
                </span>
              </div>
            </div>

            {/* DOCUMENTO DO RELATÓRIO FORMATADO EM FOLHA A4 */}
            <div className="p-6 sm:p-10 space-y-6 text-xs text-slate-900 bg-white">
              
              {/* CABEÇALHO FORMAL CORPORATIVO */}
              <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      $
                    </div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                      RELATÓRIO DE FLUXO DE CAIXA
                    </h1>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    Demonstrativo Gerencial de Entradas, Saídas e Posição Financeira
                  </p>
                  <p className="text-[11px] font-mono text-emerald-800 font-bold mt-1">
                    Filtro Selecionado: {periodLabel}
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono text-[11px] text-slate-600 space-y-0.5 border-l-2 sm:border-l-0 pl-3 sm:pl-0 border-slate-300">
                  <div><strong>Emissão:</strong> {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                  <div><strong>Registros:</strong> {filteredTransactions.length} lançamentos</div>
                  <div><strong>Status:</strong> Caixa Consolidado</div>
                </div>
              </div>

              {/* QUADRO DE TOTAIS EM DESTAQUE EXECUTIVO */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border-2 border-slate-300 font-mono">
                <div className="border-r border-slate-200 pr-3">
                  <span className="text-[10px] text-slate-600 font-extrabold uppercase block tracking-wider">
                    (+) Total de Entradas
                  </span>
                  <span className="text-base font-black text-emerald-700">
                    {formatBRL(totals.entradas)}
                  </span>
                </div>
                <div className="border-r border-slate-200 pr-3">
                  <span className="text-[10px] text-slate-600 font-extrabold uppercase block tracking-wider">
                    (-) Total de Saídas
                  </span>
                  <span className="text-base font-black text-rose-700">
                    {formatBRL(totals.saidas)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 font-extrabold uppercase block tracking-wider">
                    (=) Saldo Líquido
                  </span>
                  <span className={`text-base font-black ${
                    totals.saldo >= 0 ? 'text-slate-900' : 'text-rose-700'
                  }`}>
                    {formatBRL(totals.saldo)}
                  </span>
                </div>
              </div>

              {/* TABELA DE DISCRIMINAÇÃO DOS LANÇAMENTOS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 font-mono">
                    Discriminação Analítica dos Lançamentos
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {filteredTransactions.length} itens listados
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border border-slate-300 min-w-[500px]">
                    <thead className="bg-slate-100 border-b-2 border-slate-300 font-mono uppercase text-slate-800">
                      <tr>
                        <th className="p-2.5 font-bold border-r border-slate-300 w-24">Data</th>
                        <th className="p-2.5 font-bold border-r border-slate-300">Descrição</th>
                        <th className="p-2.5 font-bold border-r border-slate-300 w-28">Categoria</th>
                        <th className="p-2.5 font-bold border-r border-slate-300 w-28">Forma</th>
                        <th className="p-2.5 font-bold text-right w-28">Valor (R$)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredTransactions.map(t => (
                        <tr key={t.id} className="even:bg-slate-50/70">
                          <td className="p-2 font-mono text-slate-600 border-r border-slate-200 whitespace-nowrap">
                            {formatDateBR(t.date)}
                          </td>
                          <td className="p-2 font-bold text-slate-900 border-r border-slate-200">
                            {t.description}
                          </td>
                          <td className="p-2 text-slate-600 border-r border-slate-200">
                            {t.category}
                          </td>
                          <td className="p-2 text-slate-700 border-r border-slate-200 whitespace-nowrap font-medium">
                            {t.paymentMethod}
                          </td>
                          <td className={`p-2 font-mono font-bold text-right border-slate-200 whitespace-nowrap ${
                            t.type === 'entrada' ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {t.type === 'entrada' ? '+ ' : '- '}
                            {formatBRL(t.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DISTRIBUIÇÃO POR FORMA DE PAGAMENTO */}
              <div className="pt-2">
                <h5 className="font-bold text-[11px] text-slate-700 uppercase font-mono mb-1.5">
                  Resumo Consolidado por Forma de Pagamento
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono">
                  {Object.entries(totals.methodCounts).map(([method, data]) => (
                    <div key={method} className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">{method} ({data.count}x):</span>
                      <span className="font-bold text-slate-900">{formatBRL(data.total)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RODAPÉ DO DOCUMENTO A4 */}
              <div className="pt-6 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-slate-500 font-mono">
                <div>
                  <span>Demonstrativo Gerencial de Caixa • Desenvolvido sob medida por Lucas Pedroso</span>
                </div>
                <div>
                  <span>Documento emitido eletronicamente</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
