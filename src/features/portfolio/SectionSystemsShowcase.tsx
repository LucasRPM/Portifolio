import React from 'react';
import { AppWindow, Wallet, ArrowUpRight, Folder, Kanban } from 'lucide-react';

export const SectionSystemsShowcase: React.FC = () => {
  const openDemo = (hash: string) => {
    window.location.hash = hash;
  };

  return (
    <section id="demonstracoes" className="slide-deck-section slide-deck-3 min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-16 sm:py-20 bg-white relative border-t border-[#E8ECEC] shadow-[0_-20px_50px_rgba(0,0,0,0.12)]">
      <div className="slide-deck-content max-w-6xl mx-auto px-4 sm:px-6 space-y-10 w-full">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#05AD98] text-xs font-mono font-bold border border-[#05AD98]/25 shadow-xs">
            <AppWindow className="w-3.5 h-3.5" />
            Sistemas & Telas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
            Páginas de Demonstração
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] font-medium leading-relaxed">
            Experimente as soluções na prática. Interaja com as demonstrações abaixo e veja como ferramentas sob medida simplificam a rotina e eliminam tarefas manuais.
          </p>
        </div>

        {/* 3 Janelas Lado a Lado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ========================================================================= */}
          {/* DEMONSTRAÇÃO 01: CONTROLE DE CAIXA (ATIVA & INTERATIVA)                   */}
          {/* ========================================================================= */}
          <div
            onClick={() => openDemo('#/demo-caixa')}
            className="rounded-3xl bg-white border-2 border-[#05AD98]/40 hover:border-[#05AD98] shadow-sm hover:shadow-xl hover:shadow-[#05AD98]/10 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer hover:-translate-y-1"
          >
            {/* Top Bar da Janela */}
            <div className="px-4 py-3 bg-[#F8FAFA] border-b border-[#E8ECEC] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#05AD98]"></span>
              </div>
              
              <span className="text-[11px] font-mono text-[#111827] font-bold">
                controle-caixa.app
              </span>

              <span className="text-[10px] font-mono font-bold text-white bg-[#05AD98] px-2 py-0.5 rounded-md shadow-2xs">
                01
              </span>
            </div>

            {/* Corpo da Janela: Conteúdo Ativo e Convidativo */}
            <div className="p-6 flex-1 flex flex-col justify-between text-left min-h-[280px] sm:min-h-[320px] bg-white">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] border border-[#05AD98]/30 flex items-center justify-center text-[#05AD98] group-hover:scale-110 transition-transform shadow-xs">
                  <Wallet className="w-6 h-6 text-[#05AD98]" />
                </div>
                
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold mb-2">
                    ● Disponível para Testar
                  </div>
                  <h3 className="text-base font-extrabold text-[#111827] group-hover:text-[#05AD98] transition-colors">
                    Controle de Caixa
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1.5 font-medium leading-relaxed">
                    Fluxo financeiro com entradas, saídas, formas de pagamento, saldo do período e exportação de relatório PDF simples.
                  </p>
                </div>
              </div>

              {/* Tag de Recursos */}
              <div className="pt-4 border-t border-[#F0F4F4] flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Filtros por Período
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Relatório PDF
                </span>
              </div>
            </div>

            {/* Rodapé da Janela com Ação em Destaque */}
            <div className="px-5 py-3.5 bg-[#E6F7F5]/50 border-t border-[#05AD98]/20 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#05AD98]">
                Demonstração #01
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#05AD98] group-hover:translate-x-1 transition-transform">
                <span>Abrir Sistema</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEMONSTRAÇÃO 02: ORGANIZADOR DE ARQUIVOS WINDOWS                         */}
          {/* ========================================================================= */}
          <div 
            onClick={() => openDemo('#/demo-organizador')}
            className="rounded-3xl bg-white border-2 border-[#DDE2E2] hover:border-[#05AD98] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
          >
            {/* Top Bar da Janela */}
            <div className="px-4 py-3 bg-[#F8FAFA] border-b border-[#DDE2E2] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB] group-hover:bg-rose-400 group-hover:border-rose-400 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB] group-hover:bg-amber-400 group-hover:border-amber-400 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#05AD98]"></span>
              </div>
              
              <span className="text-[11px] font-mono text-[#6B7280] font-semibold group-hover:text-[#05AD98] transition-colors">
                organizador-windows.exe
              </span>

              <span className="text-[10px] font-mono font-bold text-[#05AD98] bg-[#E6F7F5] px-2 py-0.5 rounded-md">
                02
              </span>
            </div>

            {/* Corpo da Janela */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-white min-h-[280px] sm:min-h-[320px]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Folder className="w-6 h-6 fill-white/20" />
                </div>
                
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold mb-2">
                    ● Disponível para Testar
                  </div>
                  <h3 className="text-base font-extrabold text-[#111827] group-hover:text-[#05AD98] transition-colors">
                    Organizador de Arquivos Windows
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1.5 font-medium leading-relaxed">
                    Emulação desktop com pasta caótica e robô de automação que classifica dezenas de arquivos em pastas padronizadas, com tutorial interativo.
                  </p>
                </div>
              </div>

              {/* Tag de Recursos */}
              <div className="pt-4 border-t border-[#F0F4F4] flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Simulação Windows
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Automação em Lote
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Tutorial Guiado
                </span>
              </div>
            </div>

            {/* Rodapé da Janela com Ação em Destaque */}
            <div className="px-5 py-3.5 bg-[#E6F7F5]/50 border-t border-[#05AD98]/20 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#05AD98]">
                Demonstração #02
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#05AD98] group-hover:translate-x-1 transition-transform">
                <span>Abrir Emulação</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEMONSTRAÇÃO 03: KANBAN DE TAREFAS                                        */}
          {/* ========================================================================= */}
          <div 
            onClick={() => openDemo('#/demo-kanban')}
            className="rounded-3xl bg-white border-2 border-[#DDE2E2] hover:border-[#05AD98] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
          >
            {/* Top Bar da Janela */}
            <div className="px-4 py-3 bg-[#F8FAFA] border-b border-[#DDE2E2] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB] group-hover:bg-rose-400 group-hover:border-rose-400 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#D1D5DB] group-hover:bg-amber-400 group-hover:border-amber-400 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#05AD98]"></span>
              </div>
              
              <span className="text-[11px] font-mono text-[#6B7280] font-semibold group-hover:text-[#05AD98] transition-colors">
                kanban-tarefas.app
              </span>

              <span className="text-[10px] font-mono font-bold text-[#05AD98] bg-[#E6F7F5] px-2 py-0.5 rounded-md">
                03
              </span>
            </div>

            {/* Corpo da Janela */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-white min-h-[280px] sm:min-h-[320px]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#05AD98] to-teal-700 text-white flex items-center justify-center shadow-md shadow-[#05AD98]/20 group-hover:scale-110 transition-transform">
                  <Kanban className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold mb-2">
                    ● Disponível para Testar
                  </div>
                  <h3 className="text-base font-extrabold text-[#111827] group-hover:text-[#05AD98] transition-colors">
                    Kanban de Tarefas
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1.5 font-medium leading-relaxed">
                    Gestão visual de fluxos de trabalho com etapas, pessoas responsáveis, datas de entrega, prioridades e movimentação simples e intuitiva de cartões.
                  </p>
                </div>
              </div>

              {/* Tag de Recursos */}
              <div className="pt-4 border-t border-[#F0F4F4] flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  4 Etapas Ágeis
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Drag & Drop e Botões
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFA] text-[#6B7280] border border-[#E8ECEC]">
                  Gestão Completa (CRUD)
                </span>
              </div>
            </div>

            {/* Rodapé da Janela com Ação em Destaque */}
            <div className="px-5 py-3.5 bg-[#E6F7F5]/50 border-t border-[#05AD98]/20 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#05AD98]">
                Demonstração #03
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#05AD98] group-hover:translate-x-1 transition-transform">
                <span>Abrir Kanban</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
