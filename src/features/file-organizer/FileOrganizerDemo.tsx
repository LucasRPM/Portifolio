import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Folder, 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  FileArchive, 
  FileVideo, 
  Image as ImageIcon, 
  FileCheck, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Maximize2, 
  Minus, 
  RefreshCw, 
  HardDrive, 
  Trash2, 
  Wifi, 
  Volume2, 
  Calculator, 
  Power,
  ChevronLeft,
  Monitor,
  Compass,
  Lightbulb,
  GripHorizontal,
  Cpu,
  Zap
} from 'lucide-react';

// Tipos de Arquivos
export type FileExtension = 
  | 'pdf' 
  | 'xlsx' 
  | 'csv' 
  | 'docx' 
  | 'txt' 
  | 'jpg' 
  | 'png' 
  | 'xml' 
  | 'zip' 
  | 'mp4';

export interface DummyFile {
  id: string;
  name: string;
  ext: FileExtension;
  size: string;
  date: string;
  categoryFolderId: string;
}

export interface FolderCategory {
  id: string;
  name: string;
  iconColor: string;
  description: string;
}

// Subpastas criadas pela automação
const FOLDER_CATEGORIES: FolderCategory[] = [
  { id: 'cat-pdf', name: '01_Documentos_PDF', iconColor: 'text-rose-500', description: 'Relatórios, contratos e comprovantes bancários' },
  { id: 'cat-planilhas', name: '02_Planilhas_Excel', iconColor: 'text-emerald-600', description: 'Planilhas .xlsx e tabelas .csv operacionais' },
  { id: 'cat-xml', name: '03_Notas_Fiscais_XML', iconColor: 'text-amber-500', description: 'Arquivos XML de NF-e e notas fiscais de serviço' },
  { id: 'cat-imagens', name: '04_Imagens_e_Fotos', iconColor: 'text-purple-500', description: 'Fotos de produtos, eventos e logotipos corporativos' },
  { id: 'cat-textos', name: '05_Contratos_e_Textos', iconColor: 'text-blue-500', description: 'Propostas comerciais .docx e anotações .txt' },
  { id: 'cat-zip', name: '06_Arquivos_Compactados', iconColor: 'text-indigo-500', description: 'Backups e pacotes compactados .zip' },
  { id: 'cat-videos', name: '07_Videos_e_Midias', iconColor: 'text-cyan-500', description: 'Vídeos de treinamento e gravações operacionais' },
];

// 18 Arquivos fictícios completamente bagunçados
const INITIAL_FILES: DummyFile[] = [
  { id: 'f-1', name: 'relatorio_fechamento_mensal_v2.pdf', ext: 'pdf', size: '2.4 MB', date: '12/10/2026', categoryFolderId: 'cat-pdf' },
  { id: 'f-2', name: 'foto_evento_confraternizacao_01.jpg', ext: 'jpg', size: '4.8 MB', date: '11/10/2026', categoryFolderId: 'cat-imagens' },
  { id: 'f-3', name: 'NF-e_352309182390123901_autorizada.xml', ext: 'xml', size: '45 KB', date: '11/10/2026', categoryFolderId: 'cat-xml' },
  { id: 'f-4', name: 'planilha_custos_operacionais_2026.xlsx', ext: 'xlsx', size: '890 KB', date: '10/10/2026', categoryFolderId: 'cat-planilhas' },
  { id: 'f-5', name: 'contrato_prestacao_servicos_assinado.pdf', ext: 'pdf', size: '1.2 MB', date: '10/10/2026', categoryFolderId: 'cat-pdf' },
  { id: 'f-6', name: 'backup_banco_dados_antigo.zip', ext: 'zip', size: '38.5 MB', date: '09/10/2026', categoryFolderId: 'cat-zip' },
  { id: 'f-7', name: 'manual_operacional_maquinas.docx', ext: 'docx', size: '1.8 MB', date: '08/10/2026', categoryFolderId: 'cat-textos' },
  { id: 'f-8', name: 'comprovante_pix_fornecedor_239.pdf', ext: 'pdf', size: '310 KB', date: '08/10/2026', categoryFolderId: 'cat-pdf' },
  { id: 'f-9', name: 'extrato_bancario_setembro.csv', ext: 'csv', size: '240 KB', date: '07/10/2026', categoryFolderId: 'cat-planilhas' },
  { id: 'f-10', name: 'foto_produto_amostra_final.png', ext: 'png', size: '3.1 MB', date: '07/10/2026', categoryFolderId: 'cat-imagens' },
  { id: 'f-11', name: 'video_treinamento_equipe.mp4', ext: 'mp4', size: '124.0 MB', date: '06/10/2026', categoryFolderId: 'cat-videos' },
  { id: 'f-12', name: 'nota_fiscal_servico_tomado_441.xml', ext: 'xml', size: '52 KB', date: '05/10/2026', categoryFolderId: 'cat-xml' },
  { id: 'f-13', name: 'proposta_comercial_cliente_xyz.docx', ext: 'docx', size: '940 KB', date: '04/10/2026', categoryFolderId: 'cat-textos' },
  { id: 'f-14', name: 'logo_empresa_alta_resolucao.png', ext: 'png', size: '1.5 MB', date: '03/10/2026', categoryFolderId: 'cat-imagens' },
  { id: 'f-15', name: 'planilha_folha_pagamento_revisada.xlsx', ext: 'xlsx', size: '1.1 MB', date: '02/10/2026', categoryFolderId: 'cat-planilhas' },
  { id: 'f-16', name: 'anotacoes_procedimento_padrao.txt', ext: 'txt', size: '18 KB', date: '01/10/2026', categoryFolderId: 'cat-textos' },
  { id: 'f-17', name: 'pacote_icones_interface.zip', ext: 'zip', size: '12.0 MB', date: '30/09/2026', categoryFolderId: 'cat-zip' },
  { id: 'f-18', name: 'tabela_precos_vigentes.xlsx', ext: 'xlsx', size: '640 KB', date: '28/09/2026', categoryFolderId: 'cat-planilhas' },
];

interface WindowPosition {
  x: number;
  y: number;
}

export const FileOrganizerDemo: React.FC = () => {
  // Janelas do Windows (Inicialmente Fechadas)
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  // Foco ativo entre as janelas
  const [activeWindow, setActiveWindow] = useState<'folder' | 'app'>('folder');

  // Posições das janelas (no desktop afastadas; no mobile posicionadas à direita dos ícones para nunca cobri-los)
  const [folderPos, setFolderPos] = useState<WindowPosition>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return { x: 82, y: 10 };
    }
    return { x: 135, y: 25 };
  });
  const [appPos, setAppPos] = useState<WindowPosition>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        return { x: 84, y: 20 };
      }
      const targetX = Math.max(690, Math.min(window.innerWidth - 490, 730));
      return { x: targetX, y: 25 };
    }
    return { x: 720, y: 25 };
  });

  // Estado do Arraste de Janelas (Drag and Drop)
  const [draggingWindow, setDraggingWindow] = useState<'folder' | 'app' | null>(null);
  const [dragOffset, setDragOffset] = useState<WindowPosition>({ x: 0, y: 0 });

  // Estado da Automação de Arquivos
  const [isOrganized, setIsOrganized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSubfolderId, setSelectedSubfolderId] = useState<string | null>(null);

  // Tutorial Externo (Habilitado/Desabilitado)
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  // Passo ativo do tutorial (determinado dinamicamente pelo estado)
  const currentStep: 1 | 2 | 3 | 4 = !isFolderOpen
    ? 1
    : !isAppOpen && !isOrganized
    ? 2
    : isAppOpen && !isOrganized
    ? 3
    : 4;

  // Relógio do Windows na Taskbar
  const [currentTime, setCurrentTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Iniciar arraste de janela
  const startDrag = (win: 'folder' | 'app', clientX: number, clientY: number) => {
    setActiveWindow(win);
    setDraggingWindow(win);
    const currentPos = win === 'folder' ? folderPos : appPos;
    setDragOffset({
      x: clientX - currentPos.x,
      y: clientY - currentPos.y
    });
  };

  // Gerenciamento global de movimento do mouse/touch durante o arraste
  useEffect(() => {
    if (!draggingWindow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const isNarrow = window.innerWidth < 640;
      const minX = isNarrow ? 78 : 10;
      const maxX = Math.max(minX, window.innerWidth - (isNarrow ? 100 : 250));
      const maxY = Math.max(10, window.innerHeight - (isNarrow ? 100 : 150));
      const newX = Math.max(minX, Math.min(maxX, e.clientX - dragOffset.x));
      const newY = Math.max(8, Math.min(maxY, e.clientY - dragOffset.y));

      if (draggingWindow === 'folder') {
        setFolderPos({ x: newX, y: newY });
      } else {
        setAppPos({ x: newX, y: newY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const isNarrow = window.innerWidth < 640;
      const minX = isNarrow ? 78 : 10;
      const maxX = Math.max(minX, window.innerWidth - (isNarrow ? 100 : 250));
      const maxY = Math.max(10, window.innerHeight - (isNarrow ? 100 : 150));
      const newX = Math.max(minX, Math.min(maxX, touch.clientX - dragOffset.x));
      const newY = Math.max(8, Math.min(maxY, touch.clientY - dragOffset.y));

      if (draggingWindow === 'folder') {
        setFolderPos({ x: newX, y: newY });
      } else {
        setAppPos({ x: newX, y: newY });
      }
    };

    const handleDragEnd = () => {
      setDraggingWindow(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [draggingWindow, dragOffset]);

  // Ao abrir o app pela primeira vez, ajusta posição para garantir afastamento ou conter no mobile
  const handleOpenApp = () => {
    setIsAppOpen(true);
    setActiveWindow('app');
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) {
        setAppPos(prev => ({
          ...prev,
          x: Math.max(prev.x, folderPos.x + 550)
        }));
      } else if (window.innerWidth < 640) {
        setAppPos({ x: 84, y: 20 });
      }
    }
  };

  // Ao abrir a pasta
  const handleOpenFolder = () => {
    setIsFolderOpen(true);
    setActiveWindow('folder');
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setFolderPos({ x: 82, y: 10 });
    }
  };

  // Executar a automação com o botão redondo
  const handleRunOrganization = () => {
    if (isProcessing || isOrganized) return;
    setIsProcessing(true);

    const timer = setTimeout(() => {
      setIsProcessing(false);
      setIsOrganized(true);
      setSelectedSubfolderId(null);
    }, 700);

    return () => clearTimeout(timer);
  };

  // Resetar / Desorganizar para testar novamente
  const handleResetToMessy = () => {
    setIsOrganized(false);
    setSelectedSubfolderId(null);
    setIsProcessing(false);
  };

  // Ícone por extensão
  const renderFileIcon = (ext: FileExtension) => {
    switch (ext) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'docx':
      case 'txt':
        return <FileText className="w-5 h-5 text-blue-600 shrink-0" />;
      case 'jpg':
      case 'png':
        return <ImageIcon className="w-5 h-5 text-purple-500 shrink-0" />;
      case 'xml':
        return <FileCode className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'zip':
        return <FileArchive className="w-5 h-5 text-indigo-500 shrink-0" />;
      case 'mp4':
        return <FileVideo className="w-5 h-5 text-cyan-500 shrink-0" />;
      default:
        return <FileCheck className="w-5 h-5 text-slate-400 shrink-0" />;
    }
  };

  const selectedCategory = FOLDER_CATEGORIES.find(c => c.id === selectedSubfolderId);

  const displayedFiles = INITIAL_FILES.filter(f => {
    if (!isOrganized) return true;
    return selectedSubfolderId ? f.categoryFolderId === selectedSubfolderId : false;
  });

  const handleBackToPortfolio = () => {
    window.location.hash = '#demonstracoes';
  };

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden font-sans select-none flex flex-col justify-between"
      onClick={() => {
        if (isStartMenuOpen) setIsStartMenuOpen(false);
      }}
    >
      
      {/* ========================================================================= */}
      {/* 1. BARRA SUPERIOR EXTERNA (VOLTAR AO PORTFÓLIO & IDENTIFICAÇÃO)           */}
      {/* ========================================================================= */}
      <header className="relative z-40 w-full px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 sm:gap-4 text-white shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleBackToPortfolio}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer shadow-xs"
            title="Voltar ao Portfólio Principal"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Voltar ao Portfólio</span>
            <span className="sm:hidden">Voltar</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          <span className="text-xs font-semibold text-slate-300 hidden sm:inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Simulação Windows Desktop • Automação de Arquivos em Lote
          </span>
        </div>

        {/* Botão de Controle do Tutorial / Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {isOrganized && (
            <button
              onClick={handleResetToMessy}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Restaurar o caos para testar de novo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desorganizar Novamente</span>
              <span className="sm:hidden">Reset</span>
            </button>
          )}

          <button
            onClick={() => setIsTutorialOpen(!isTutorialOpen)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
              isTutorialOpen
                ? 'bg-[#05AD98] text-white border-[#05AD98] shadow-xs'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">{isTutorialOpen ? 'Ocultar Tutorial' : 'Mostrar Tutorial'}</span>
            <span className="sm:hidden">{isTutorialOpen ? 'Ocultar' : 'Tutorial'}</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BARRA DE TUTORIAL EXTERNA FIXA NO TOPO (NUNCA COBRE O WINDOWS)         */}
      {/* ========================================================================= */}
      {isTutorialOpen && (
        <section className="relative z-30 w-full px-4 py-2 bg-white border-b-2 border-[#05AD98] shadow-xs flex items-center justify-between gap-4 text-slate-900 shrink-0">
          
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#E6F7F5] text-[#05AD98] flex items-center justify-center font-bold shrink-0">
              <Compass className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E6F7F5] text-[#05AD98] border border-[#05AD98]/20 text-[10px]">
                Etapa {currentStep} de 4
              </span>

              <p className="font-bold text-slate-800 truncate">
                {currentStep === 1 && (
                  <span>Siga a seta abaixo para abrir a pasta de arquivos.</span>
                )}
                {currentStep === 2 && (
                  <span>Arquivos soltos detectados. Siga a seta para abrir o aplicativo.</span>
                )}
                {currentStep === 3 && (
                  <span>Clique no botão redondo "Organizar Arquivos" para executar a automação.</span>
                )}
                {currentStep === 4 && (
                  <span>Pastas organizadas com sucesso! Abra qualquer pasta para conferir os arquivos.</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-slate-500 hidden lg:inline">
              (Dica: Arraste as janelas pela barra de título)
            </span>

            <button
              onClick={() => setIsTutorialOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Ocultar Tutorial"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. ÁREA DE TRABALHO DO WINDOWS (PAISAGEM CINEMATOGRÁFICA)                */}
      {/* ========================================================================= */}
      <main 
        className="relative z-10 flex-1 w-full p-2 sm:p-6 overflow-hidden flex flex-col justify-start bg-cover bg-center"
        style={{ backgroundImage: `url('/windows-wallpaper.jpg')` }}
      >
        
        {/* COLUNA DE ÍCONES DO DESKTOP (FIXA À ESQUERDA, NUNCA COBERTA PELAS JANELAS) */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 w-20 sm:w-28 shrink-0 relative z-20">
          
          {/* Ícone 1: Pasta de Arquivos */}
          <div className="relative">
            <div
              onClick={handleOpenFolder}
              onDoubleClick={handleOpenFolder}
              className={`w-18 sm:w-24 p-1.5 sm:p-2 rounded flex flex-col items-center text-center gap-1 cursor-pointer transition-all relative ${
                isFolderOpen
                  ? 'bg-blue-400/30 border border-blue-300/60'
                  : 'hover:bg-blue-400/20 border border-transparent hover:border-blue-300/40'
              } ${
                isTutorialOpen && currentStep === 1
                  ? 'ring-4 ring-[#05AD98] ring-offset-2 ring-offset-black/40 bg-[#05AD98]/20 scale-105'
                  : ''
              }`}
              title="Pasta Documentos_Gerais"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                <svg className="w-9 sm:w-11 h-9 sm:h-11 drop-shadow-md" viewBox="0 0 48 48" fill="none">
                  <path d="M4 10C4 7.79086 5.79086 6 8 6H19.1716C20.2324 6 21.2498 6.42143 22 7.17157L25.8284 11H40C42.2091 11 44 12.7909 44 15V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V10Z" fill="#FFA000"/>
                  <path d="M4 16C4 13.7909 5.79086 12 8 12H40C42.2091 12 44 13.7909 44 16V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V16Z" fill="#FFCA28"/>
                  <path d="M44 20H4V38C4 40.2091 5.79086 42 8 42H40C42.2091 42 44 40.2091 44 38V20Z" fill="#FFD54F"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-[12px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] leading-tight">
                Documentos
              </span>
            </div>

            {/* BALÃO COM SETA PARA O PASSO 1 (Posicionado à direita da pasta) */}
            {isTutorialOpen && currentStep === 1 && !isFolderOpen && (
              <div className="absolute left-20 sm:left-28 top-2 z-50 flex items-center animate-bounce pointer-events-none max-w-[calc(100vw-7rem)]">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-[#05AD98] drop-shadow-md"></div>
                <div className="bg-white/95 backdrop-blur-md border-2 border-[#05AD98] rounded-xl px-3 sm:px-3.5 py-2 shadow-2xl text-slate-900 -ml-[1px] min-w-[170px] sm:min-w-[200px]">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#05AD98] animate-ping"></span>
                    <span className="text-[10px] font-mono font-black uppercase text-[#05AD98]">1. Comece aqui</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    Clique na pasta para abri-la
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Veja os 18 arquivos desorganizados
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Ícone 2: Organizador.exe */}
          <div className="relative">
            <div
              onClick={handleOpenApp}
              onDoubleClick={handleOpenApp}
              className={`w-18 sm:w-24 p-1.5 sm:p-2 rounded flex flex-col items-center text-center gap-1 cursor-pointer transition-all relative ${
                isAppOpen
                  ? 'bg-blue-400/30 border border-blue-300/60'
                  : 'hover:bg-blue-400/20 border border-transparent hover:border-blue-300/40'
              } ${
                isTutorialOpen && currentStep === 2
                  ? 'ring-4 ring-[#05AD98] ring-offset-2 ring-offset-black/40 bg-[#05AD98]/20 scale-105'
                  : ''
              }`}
              title="Organizador.exe"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg border border-white/40">
                <Cpu className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <span className="text-[11px] sm:text-[12px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] leading-tight">
                Organizador
              </span>
            </div>

            {/* BALÃO COM SETA PARA O PASSO 2 (Posicionado EMBAIXO do ícone com seta ▲) */}
            {isTutorialOpen && currentStep === 2 && !isAppOpen && (
              <div className="absolute top-20 left-0 sm:left-2 z-50 flex flex-col items-start animate-bounce pointer-events-none w-44 sm:w-48">
                <div className="w-0 h-0 ml-5 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#05AD98] drop-shadow-md"></div>
                <div className="bg-white/95 backdrop-blur-md border-2 border-[#05AD98] rounded-xl px-2.5 py-1.5 shadow-2xl text-slate-900 -mt-[1px] w-full text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#05AD98] animate-ping"></span>
                    <span className="text-[10px] font-mono font-black uppercase text-[#05AD98]">2. Próximo Passo</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    Abra o Organizador.exe
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Clique no ícone acima
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Ícone 3: Lixeira Clássica */}
          <div className="w-18 sm:w-24 p-1.5 sm:p-2 rounded flex flex-col items-center text-center gap-1 cursor-pointer hover:bg-blue-400/20 border border-transparent hover:border-blue-300/40 transition-colors opacity-80 hover:opacity-100">
            <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
              <Trash2 className="w-7 sm:w-9 h-7 sm:h-9 text-slate-200 drop-shadow-md" />
            </div>
            <span className="text-[11px] sm:text-[12px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              Lixeira
            </span>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* JANELA 1: EXPLORADOR DE ARQUIVOS (ARRASTÁVEL COM POSIÇÃO AFASTADA)      */}
        {/* ======================================================================= */}
        {isFolderOpen && (
          <div 
            onClick={() => setActiveWindow('folder')}
            style={{ 
              transform: `translate3d(${folderPos.x}px, ${folderPos.y}px, 0)`,
              zIndex: activeWindow === 'folder' ? 30 : 20,
              touchAction: 'none'
            }}
            className="absolute top-0 left-0 w-[calc(100vw-6rem)] sm:w-[530px] max-h-[72vh] flex flex-col rounded-xl bg-[#F9F9F9] border border-[#CCCCCC] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden text-slate-900 transition-shadow duration-150 animate-in fade-in zoom-in-95"
          >
            
            {/* Barra de Título Arrastável (Drag Handle) */}
            <div 
              onMouseDown={(e) => startDrag('folder', e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches.length > 0) {
                  startDrag('folder', e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              className="px-3 py-2 bg-white border-b border-[#E5E5E5] flex items-center justify-between text-xs cursor-move select-none active:cursor-grabbing group"
              title="Clique e arraste para mover a janela"
            >
              <div className="flex items-center gap-2 min-w-0">
                <GripHorizontal className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <div className="w-4 h-4 shrink-0">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M4 10C4 7.79086 5.79086 6 8 6H19.1716C20.2324 6 21.2498 6.42143 22 7.17157L25.8284 11H40C42.2091 11 44 12.7909 44 15V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V10Z" fill="#FFA000"/>
                    <path d="M4 16C4 13.7909 5.79086 12 8 12H40C42.2091 12 44 13.7909 44 16V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V16Z" fill="#FFCA28"/>
                    <path d="M44 20H4V38C4 40.2091 5.79086 42 8 42H40C42.2091 42 44 40.2091 44 38V20Z" fill="#FFD54F"/>
                  </svg>
                </div>
                <span className="font-semibold text-slate-800 truncate">
                  {selectedCategory ? selectedCategory.name : 'Documentos_Gerais'}
                </span>
                <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">
                  - Explorador de Arquivos
                </span>
              </div>

              {/* Botões do Windows: Minimizar, Maximizar, Fechar */}
              <div className="flex items-center -mr-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setIsFolderOpen(false)}
                  className="px-3 py-1 text-slate-600 hover:bg-[#E5E5E5] cursor-pointer"
                  title="Minimizar"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button 
                  className="px-3 py-1 text-slate-600 hover:bg-[#E5E5E5] cursor-pointer"
                  title="Maximizar"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsFolderOpen(false)}
                  className="px-3 py-1 text-slate-600 hover:bg-[#E81123] hover:text-white transition-colors cursor-pointer"
                  title="Fechar Janela"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Barra de Menus e Caminho do Windows Explorer */}
            <div className="px-3 py-1.5 bg-[#F3F3F3] border-b border-[#E5E5E5] flex items-center gap-2 text-xs">
              <button
                onClick={() => setSelectedSubfolderId(null)}
                disabled={selectedSubfolderId === null}
                className="p-1 rounded hover:bg-[#E5E5E5] disabled:opacity-30 disabled:pointer-events-none text-slate-700 cursor-pointer"
                title="Voltar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 px-3 py-1 rounded bg-white border border-[#D1D1D1] flex items-center gap-1.5 text-[11px] text-slate-700 font-mono overflow-x-auto whitespace-nowrap">
                <HardDrive className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Este Computador</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <button 
                  onClick={() => setSelectedSubfolderId(null)}
                  className="hover:underline font-semibold cursor-pointer"
                >
                  Documentos_Gerais
                </button>
                {selectedCategory && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-bold text-blue-700">{selectedCategory.name}</span>
                  </>
                )}
              </div>
            </div>

            {/* Conteúdo dos Arquivos (Fidelidade ao Windows Explorer) */}
            <div className="p-3 bg-white overflow-y-auto max-h-[50vh] min-h-[300px]">
              
              {/* CENÁRIO 1: APÓS ORGANIZAR E NA RAIZ DA PASTA -> EXIBE AS 7 PASTAS */}
              {isOrganized && selectedSubfolderId === null && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FOLDER_CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedSubfolderId(cat.id)}
                      onDoubleClick={() => setSelectedSubfolderId(cat.id)}
                      className="p-2 rounded hover:bg-blue-100/70 border border-transparent hover:border-blue-300/50 flex items-center gap-2.5 cursor-pointer transition-colors group select-none"
                      title={cat.name}
                    >
                      <div className="w-8 h-8 flex items-center justify-center shrink-0">
                        <Folder className="w-7 h-7 text-amber-500 fill-amber-400" />
                      </div>
                      <span className="text-xs text-slate-800 group-hover:text-blue-700 truncate font-normal">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CENÁRIO 2: ANTES DE ORGANIZAR OU DENTRO DE UMA SUBPASTA -> EXIBE OS ARQUIVOS */}
              {(!isOrganized || selectedSubfolderId !== null) && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase select-none">
                      <th className="py-1 px-2 font-semibold">Nome</th>
                      <th className="py-1 px-2 font-semibold hidden sm:table-cell">Data de modificação</th>
                      <th className="py-1 px-2 font-semibold">Tipo</th>
                      <th className="py-1 px-2 font-semibold text-right">Tamanho</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedFiles.map(file => (
                      <tr key={file.id} className="hover:bg-blue-50/60 transition-colors cursor-default select-none">
                        <td className="py-1.5 px-2 flex items-center gap-2 min-w-0">
                          {renderFileIcon(file.ext)}
                          <span className="font-normal text-slate-800 truncate" title={file.name}>
                            {file.name}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 text-slate-500 text-[11px] font-mono hidden sm:table-cell whitespace-nowrap">
                          {file.date}
                        </td>
                        <td className="py-1.5 px-2 text-slate-500 text-[11px] font-mono uppercase whitespace-nowrap">
                          {file.ext}
                        </td>
                        <td className="py-1.5 px-2 text-slate-500 text-[11px] font-mono text-right whitespace-nowrap">
                          {file.size}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>

            {/* Barra de Status do Windows Explorer */}
            <div className="px-3 py-1.5 bg-[#F9F9F9] border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>{isOrganized && selectedSubfolderId === null ? '7 itens' : `${displayedFiles.length} itens`}</span>
              <span>{isOrganized && selectedSubfolderId === null ? '' : '124 MB'}</span>
            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* JANELA 2: APLICATIVO "ORGANIZADOR.EXE" (SIMPLES BOTÃO REDONDO)          */}
        {/* ======================================================================= */}
        {isAppOpen && (
          <div 
            onClick={() => setActiveWindow('app')}
            style={{ 
              transform: `translate3d(${appPos.x}px, ${appPos.y}px, 0)`,
              zIndex: activeWindow === 'app' ? 30 : 20,
              touchAction: 'none'
            }}
            className="absolute top-0 left-0 w-[calc(100vw-6rem)] sm:w-[320px] max-w-[340px] flex flex-col rounded-2xl bg-slate-900 border-2 border-indigo-500/40 shadow-[0_20px_50px_rgba(15,23,42,0.8)] overflow-visible text-white transition-shadow duration-150 animate-in fade-in zoom-in-95"
          >
            
            {/* Barra de Título Windows */}
            <div 
              onMouseDown={(e) => startDrag('app', e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches.length > 0) {
                  startDrag('app', e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              className="px-3.5 py-2.5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-500/30 flex items-center justify-between text-xs cursor-move select-none active:cursor-grabbing group rounded-t-2xl"
              title="Clique e arraste para mover a janela"
            >
              <div className="flex items-center gap-2 min-w-0">
                <GripHorizontal className="w-3.5 h-3.5 text-indigo-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Zap className="w-3 h-3 fill-current text-white" />
                </div>
                <span className="font-bold text-white tracking-wide text-xs truncate">
                  Organizador.exe
                </span>
              </div>

              <div className="flex items-center -mr-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setIsAppOpen(false)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                  title="Minimizar"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsAppOpen(false)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-rose-600 rounded transition-colors cursor-pointer"
                  title="Fechar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conteúdo Central: Simples Botão Redondo Organizar Arquivos */}
            <div className="p-8 flex flex-col items-center justify-center gap-4 bg-slate-900 rounded-b-2xl relative select-none">
              
              <button
                onClick={handleRunOrganization}
                disabled={isProcessing || isOrganized}
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all shadow-2xl cursor-pointer select-none active:scale-95 border-4 ${
                  isOrganized
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-400/50 text-white shadow-[0_10px_35px_rgba(16,185,129,0.35)] cursor-default'
                    : isProcessing
                    ? 'bg-blue-600 border-blue-400/50 text-white cursor-wait animate-pulse'
                    : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 border-blue-400/40 text-white shadow-[0_15px_40px_rgba(59,130,246,0.45)] hover:scale-105'
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-8 h-8 animate-spin text-white" />
                    <span className="text-xs font-bold tracking-wide">Organizando...</span>
                  </>
                ) : isOrganized ? (
                  <>
                    <CheckCircle2 className="w-9 h-9 text-white drop-shadow-sm" />
                    <div className="text-center leading-tight">
                      <span className="text-sm font-black block">Arquivos</span>
                      <span className="text-sm font-black block">Organizados!</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Zap className="w-9 h-9 fill-white text-white drop-shadow-sm animate-pulse" />
                    <div className="text-center leading-tight">
                      <span className="text-sm font-black tracking-wide block">Organizar</span>
                      <span className="text-sm font-black tracking-wide block">Arquivos</span>
                    </div>
                  </>
                )}
              </button>

              {/* Botão para Desorganizar e Testar Novamente */}
              {isOrganized && (
                <button
                  onClick={handleResetToMessy}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-slate-800"
                  title="Restaurar os arquivos para o estado original"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Desorganizar arquivos</span>
                </button>
              )}

            </div>

            {/* BALÃO COM SETA PARA O PASSO 3 (EXTERNO À JANELA DO APLICATIVO, APONTANDO ▲) */}
            {isTutorialOpen && currentStep === 3 && !isOrganized && (
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center animate-bounce pointer-events-none w-56 sm:w-64">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#05AD98] drop-shadow-md"></div>
                <div className="bg-white/95 backdrop-blur-md border-2 border-[#05AD98] rounded-xl px-3.5 py-2 shadow-2xl text-slate-900 -mt-[1px] w-full text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#05AD98] animate-ping"></span>
                    <span className="text-[10px] font-mono font-black uppercase text-[#05AD98]">3. Guia do Tutorial</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    Clique no botão redondo acima
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Organizar Arquivos
                  </span>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 4. MENU INICIAR DO WINDOWS 11                                             */}
      {/* ========================================================================= */}
      {isStartMenuOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-13 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-300 shadow-2xl p-4 text-slate-900 z-50 animate-in fade-in slide-in-from-bottom-3 duration-150"
        >
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              readOnly
              placeholder="Digite para pesquisar..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Fixados
            </span>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => {
                  handleOpenFolder();
                  setIsStartMenuOpen(false);
                }}
                className="p-2 rounded-xl hover:bg-slate-100 flex flex-col items-center gap-1 cursor-pointer"
              >
                <Folder className="w-6 h-6 text-amber-500 fill-amber-400" />
                <span className="text-[11px] font-semibold">Arquivos</span>
              </button>

              <button
                onClick={() => {
                  handleOpenApp();
                  setIsStartMenuOpen(false);
                }}
                className="p-2 rounded-xl hover:bg-slate-100 flex flex-col items-center gap-1 cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold">Organizador</span>
              </button>

              <div className="p-2 rounded-xl hover:bg-slate-100 flex flex-col items-center gap-1 opacity-50">
                <Calculator className="w-6 h-6 text-slate-600" />
                <span className="text-[11px]">Calculadora</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[11px]">
                L
              </div>
              <span className="font-bold text-slate-800">Lucas Pedroso</span>
            </div>
            <button 
              onClick={() => setIsStartMenuOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-800"
            >
              <Power className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. BARRA DE TAREFAS OFICIAL DO WINDOWS (TASKBAR COM ACABAMENTO ACRÍLICO) */}
      {/* ========================================================================= */}
      <footer className="relative z-40 w-full h-11 bg-[#F3F3F3]/90 backdrop-blur-xl border-t border-black/10 px-4 flex items-center justify-between text-slate-900 shadow-sm shrink-0">
        
        {/* Lado Esquerdo: Widget */}
        <div className="flex items-center gap-2 text-xs text-slate-600 hidden sm:flex">
          <Monitor className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-slate-700">Windows 11 Simulado</span>
        </div>

        {/* Centro: Ícones da Taskbar */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          
          {/* Botão Iniciar do Windows */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsStartMenuOpen(!isStartMenuOpen);
            }}
            className={`w-9 h-8 rounded hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer ${
              isStartMenuOpen ? 'bg-black/10' : ''
            }`}
            title="Iniciar"
          >
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <span className="bg-[#0078D4] rounded-2xs"></span>
              <span className="bg-[#0078D4] rounded-2xs"></span>
              <span className="bg-[#0078D4] rounded-2xs"></span>
              <span className="bg-[#0078D4] rounded-2xs"></span>
            </div>
          </button>

          {/* Ícone 1: File Explorer com Indicador */}
          <button
            onClick={() => {
              if (isFolderOpen) {
                setIsFolderOpen(false);
              } else {
                handleOpenFolder();
              }
            }}
            className={`w-9 h-8 rounded flex items-center justify-center transition-colors relative cursor-pointer ${
              isFolderOpen ? 'bg-black/10' : 'hover:bg-black/5'
            }`}
            title="Explorador de Arquivos"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Folder className="w-4.5 h-4.5 text-amber-500 fill-amber-400" />
            </div>
            {isFolderOpen && <span className="absolute bottom-0.5 w-3 h-0.5 rounded-full bg-blue-600"></span>}
          </button>

          {/* Ícone 2: Organizador.exe com Indicador */}
          <button
            onClick={() => {
              if (isAppOpen) {
                setIsAppOpen(false);
              } else {
                handleOpenApp();
              }
            }}
            className={`w-9 h-8 rounded flex items-center justify-center transition-colors relative cursor-pointer ${
              isAppOpen ? 'bg-black/10' : 'hover:bg-black/5'
            }`}
            title="Organizador.exe"
          >
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-[9px]">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            {isAppOpen && <span className="absolute bottom-0.5 w-3 h-0.5 rounded-full bg-blue-600"></span>}
          </button>

        </div>

        {/* Lado Direito: Área de Notificação e Relógio do Windows */}
        <div className="flex items-center gap-3 text-xs text-slate-700 font-mono">
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-slate-600" />
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
          </div>
          
          <div className="flex flex-col items-end leading-tight pl-2 border-l border-slate-300">
            <span className="font-bold text-slate-900 text-[11px]">{currentTime}</span>
            <span className="text-[10px] text-slate-600">12/10/2026</span>
          </div>
        </div>

      </footer>

    </div>
  );
};
