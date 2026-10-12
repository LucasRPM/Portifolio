import React, { useState, useEffect } from 'react';
import { Route, X, Target, Lightbulb, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

export const SectionWorkMethod: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedStep(null);
    };
    if (selectedStep) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStep]);

  const steps = [
    {
      step: '01',
      title: 'Entender o Problema',
      subtitle: 'Onde a rotina trava',
      position: 'top', // Etapa 1 EM CIMA
      summary: 'Descobrir onde se perde tempo e o que gera retrabalho',
      details: {
        howItWorks: 'Converso com você e com quem vive a rotina todo dia para mapear exatamente onde o trabalho fica lento, confuso ou dependente de conferências manuais.',
        realExample: 'Planilhas soltas onde ninguém sabe qual é a versão certa, ou informações digitadas duas vezes em lugares diferentes.',
        benefit: 'Clareza total do que realmente precisa ser consertado antes de gastar tempo ou dinheiro criando coisas desnecessárias.'
      },
      // Ilustração 1: Mapa com "X" vermelho e computadores em rede com um em alerta
      renderIllustration: () => (
        <div className="w-full h-36 flex items-center justify-center relative">
          <svg width="200" height="130" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid de fundo suave / mapa de rede */}
            <path d="M 20 65 L 180 65" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 100 20 L 100 110" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 45 40 L 100 65 L 155 40" stroke="#05AD98" strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M 45 90 L 100 65 L 155 90" stroke="#05AD98" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Computador 1 (OK) */}
            <g transform="translate(30, 25)">
              <rect width="30" height="22" rx="4" fill="#1E293B" stroke="#05AD98" strokeWidth="1.5" />
              <rect x="5" y="5" width="20" height="12" rx="2" fill="#0B1120" />
              <path d="M 15 22 L 15 27 M 10 27 L 20 27" stroke="#05AD98" strokeWidth="1.5" />
            </g>

            {/* Computador 2 (OK) */}
            <g transform="translate(140, 25)">
              <rect width="30" height="22" rx="4" fill="#1E293B" stroke="#05AD98" strokeWidth="1.5" />
              <rect x="5" y="5" width="20" height="12" rx="2" fill="#0B1120" />
              <path d="M 15 22 L 15 27 M 10 27 L 20 27" stroke="#05AD98" strokeWidth="1.5" />
            </g>

            {/* Computador 3 (OK) */}
            <g transform="translate(140, 75)">
              <rect width="30" height="22" rx="4" fill="#1E293B" stroke="#05AD98" strokeWidth="1.5" />
              <rect x="5" y="5" width="20" height="12" rx="2" fill="#0B1120" />
              <path d="M 15 22 L 15 27 M 10 27 L 20 27" stroke="#05AD98" strokeWidth="1.5" />
            </g>

            {/* Computador Central com o GARGALO / "X" VERMELHO */}
            <g transform="translate(85, 48)">
              {/* Pulso vermelho de alerta */}
              <circle cx="15" cy="14" r="22" fill="#EF4444" fillOpacity="0.15" />
              <rect width="30" height="22" rx="4" fill="#450A0A" stroke="#EF4444" strokeWidth="2" />
              <rect x="5" y="5" width="20" height="12" rx="2" fill="#180505" />
              {/* O "X" Vermelho no monitor */}
              <path d="M 11 8 L 19 14 M 19 8 L 11 14" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <path d="M 15 22 L 15 27 M 10 27 L 20 27" stroke="#EF4444" strokeWidth="1.5" />
              {/* Pin de localização do problema */}
              <circle cx="15" cy="-2" r="4" fill="#EF4444" />
              <path d="M 15 2 L 15 6" stroke="#EF4444" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      )
    },
    {
      step: '02',
      title: 'Desenhar a Solução',
      subtitle: 'Passo a passo organizado',
      position: 'bottom', // Etapa 2 EM BAIXO
      summary: 'Definir regras claras antes de programar qualquer coisa',
      details: {
        howItWorks: 'Organizo o caminho ideal de trabalho em etapas simples e crio regras práticas e padronizadas para que qualquer pessoa consiga seguir sem dúvidas.',
        realExample: 'Um fluxo claro: o pedido entra aqui, é conferido assim e só vai para a próxima fase se não houver dados faltando.',
        benefit: 'Processos à prova de esquecimento e sem ambiguidades, preparando o terreno perfeito para a ferramenta digital.'
      },
      // Ilustração 2: Blueprint de fluxograma limpo com regras e carimbo de aprovação
      renderIllustration: () => (
        <div className="w-full h-36 flex items-center justify-center relative">
          <svg width="200" height="130" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Prancheta / Folha de Blueprint */}
            <rect x="25" y="15" width="150" height="100" rx="8" fill="#0B1120" stroke="#334155" strokeWidth="1.5" />
            
            {/* Linhas de grade técnica */}
            <path d="M 35 35 L 165 35 M 35 65 L 165 65 M 35 95 L 165 95" stroke="#1E293B" strokeWidth="1" />
            <path d="M 75 25 L 75 105 M 125 25 L 125 105" stroke="#1E293B" strokeWidth="1" />

            {/* Fluxo de Blocos Padronizados */}
            {/* Bloco 1: Início */}
            <rect x="40" y="53" width="28" height="24" rx="4" fill="#1E293B" stroke="#05AD98" strokeWidth="1.5" />
            <path d="M 47 65 L 61 65" stroke="#05AD98" strokeWidth="1.5" strokeLinecap="round" />

            {/* Seta conectora */}
            <path d="M 68 65 L 85 65" stroke="#05AD98" strokeWidth="1.5" markerEnd="url(#arrowTiny)" />

            {/* Bloco 2: Regra / Decisão (Diamante) */}
            <g transform="translate(86, 51)">
              <polygon points="14,0 28,14 14,28 0,14" fill="#132E2B" stroke="#05AD98" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="3" fill="#05AD98" />
            </g>

            {/* Seta conectora */}
            <path d="M 114 65 L 131 65" stroke="#05AD98" strokeWidth="1.5" />

            {/* Bloco 3: Validação Aprovada com Selo */}
            <rect x="132" y="53" width="28" height="24" rx="4" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
            <path d="M 140 65 L 145 70 L 153 60" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Selo de Fluxo Aprovado */}
            <g transform="translate(130, 20)">
              <rect width="44" height="15" rx="3" fill="#05AD98" fillOpacity="0.2" stroke="#05AD98" strokeWidth="1" />
              <text x="22" y="11" fill="#05AD98" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                FLUXO OK
              </text>
            </g>
          </svg>
        </div>
      )
    },
    {
      step: '03',
      title: 'Construir e Testar',
      subtitle: 'Ferramenta prática na mão',
      position: 'top', // Etapa 3 EM CIMA
      summary: 'Criar a automação ou sistema e validar no dia a dia',
      details: {
        howItWorks: 'Desenvolvo a aplicação ou automação sob medida para a sua necessidade e testo cada detalhe com quem realmente vai usar.',
        realExample: 'Um sistema web onde com 1 clique o relatório é gerado, ou uma automação que lê planilhas e avisa divergências na hora.',
        benefit: 'Ferramenta leve, rápida e intuitiva, que funciona desde o primeiro dia sem exigir treinamentos complicados.'
      },
      // Ilustração 3: Tela de software com testes 100% aprovados e engrenagens
      renderIllustration: () => (
        <div className="w-full h-36 flex items-center justify-center relative">
          <svg width="200" height="130" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Moldura da Tela de Software */}
            <rect x="25" y="15" width="150" height="100" rx="8" fill="#0B1120" stroke="#334155" strokeWidth="1.5" />
            
            {/* Top Bar da Janela com 3 pontos */}
            <rect x="25" y="15" width="150" height="18" rx="8" fill="#1E293B" />
            <circle cx="36" cy="24" r="2.5" fill="#EF4444" />
            <circle cx="44" cy="24" r="2.5" fill="#F59E0B" />
            <circle cx="52" cy="24" r="2.5" fill="#10B981" />
            <text x="100" y="27" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">
              app_build.py
            </text>

            {/* Painel Interno de Testes Aprovados */}
            <g transform="translate(38, 42)">
              {/* Barra de progresso verde de 100% */}
              <rect width="124" height="6" rx="3" fill="#1E293B" />
              <rect width="124" height="6" rx="3" fill="#05AD98" />

              {/* Linhas de código limpo simuladas */}
              <rect x="0" y="15" width="45" height="5" rx="2" fill="#38BDF8" fillOpacity="0.7" />
              <rect x="52" y="15" width="60" height="5" rx="2" fill="#94A3B8" fillOpacity="0.5" />
              
              <rect x="0" y="26" width="70" height="5" rx="2" fill="#94A3B8" fillOpacity="0.5" />
              <rect x="76" y="26" width="35" height="5" rx="2" fill="#05AD98" fillOpacity="0.8" />

              {/* Badge de Testes Passados */}
              <rect x="0" y="40" width="124" height="22" rx="4" fill="#064E3B" fillOpacity="0.5" stroke="#10B981" strokeWidth="1" />
              <path d="M 12 51 L 17 56 L 26 46" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="34" y="54" fill="#34D399" fontSize="9" fontFamily="monospace" fontWeight="bold">
                100% TESTS PASS
              </text>
            </g>
          </svg>
        </div>
      )
    },
    {
      step: '04',
      title: 'Colocar para Rodar',
      subtitle: 'Evolução contínua',
      position: 'bottom', // Etapa 4 EM BAIXO
      summary: 'Equipe com autonomia, trabalho ágil e melhorias constantes',
      details: {
        howItWorks: 'Acompanho a operação no dia a dia, capacito a equipe para ter total autonomia e faço ajustes finos conforme o negócio cresce.',
        realExample: 'A equipe ganha horas livres no dia, reduz erros a quase zero e passa a focar no que traz receita em vez de apagar incêndios.',
        benefit: 'Trabalho mais ágil, rotina mais leve e uma operação pronta para crescer sem desespero.'
      },
      // Ilustração 4: Múltiplos computadores em rede todos verdes e gráfico em alta
      renderIllustration: () => (
        <div className="w-full h-36 flex items-center justify-center relative">
          <svg width="200" height="130" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Rede Sincronizada: 3 Computadores todos Verdes / OK */}
            <g transform="translate(20, 65)">
              <rect width="26" height="20" rx="3" fill="#132E2B" stroke="#05AD98" strokeWidth="1.5" />
              <circle cx="13" cy="10" r="3" fill="#10B981" />
              <path d="M 13 20 L 13 25 M 8 25 L 18 25" stroke="#05AD98" strokeWidth="1.5" />
            </g>

            <g transform="translate(60, 65)">
              <rect width="26" height="20" rx="3" fill="#132E2B" stroke="#05AD98" strokeWidth="1.5" />
              <circle cx="13" cy="10" r="3" fill="#10B981" />
              <path d="M 13 20 L 13 25 M 8 25 L 18 25" stroke="#05AD98" strokeWidth="1.5" />
            </g>

            <g transform="translate(100, 65)">
              <rect width="26" height="20" rx="3" fill="#132E2B" stroke="#05AD98" strokeWidth="1.5" />
              <circle cx="13" cy="10" r="3" fill="#10B981" />
              <path d="M 13 20 L 13 25 M 8 25 L 18 25" stroke="#05AD98" strokeWidth="1.5" />
            </g>

            {/* Linha de conexão entre os nós */}
            <path d="M 46 75 L 60 75 M 86 75 L 100 75" stroke="#05AD98" strokeWidth="1.5" />

            {/* Gráfico Ascendente de Produtividade à Direita */}
            <g transform="translate(138, 25)">
              <rect x="0" y="0" width="45" height="75" rx="6" fill="#0B1120" stroke="#334155" strokeWidth="1.5" />
              {/* Barras em crescimento */}
              <rect x="7" y="50" width="7" height="18" rx="2" fill="#334155" />
              <rect x="18" y="36" width="7" height="32" rx="2" fill="#05AD98" fillOpacity="0.6" />
              <rect x="29" y="20" width="7" height="48" rx="2" fill="#05AD98" />
              {/* Seta de crescimento */}
              <path d="M 6 45 L 34 14 M 34 14 L 26 14 M 34 14 L 34 22" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Ciclo de Melhoria Contínua (Loop Infinito) */}
            <g transform="translate(70, 20)">
              <circle cx="14" cy="14" r="12" stroke="#05AD98" strokeWidth="1.5" strokeDasharray="5 3" />
              <path d="M 23 10 L 26 14 L 20 15" stroke="#05AD98" strokeWidth="1.5" fill="none" />
              <path d="M 5 18 L 2 14 L 8 13" stroke="#05AD98" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        </div>
      )
    },
  ];

  return (
    <section id="trilha" className="slide-deck-section slide-deck-2 min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-16 sm:py-20 bg-[#0B1120] text-white relative border-t border-slate-800 shadow-[0_-30px_60px_rgba(0,0,0,0.65)] overflow-hidden">
      
      {/* Luz ambiente suave de fundo no escuro */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#05AD98]/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>

      <div className="slide-deck-content max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 relative z-10 w-full">
        
        {/* Cabeçalho da Seção em Negativo com Termos Acessíveis */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05AD98]/15 text-[#05AD98] text-xs font-mono font-bold border border-[#05AD98]/30 shadow-xs">
            <Route className="w-3.5 h-3.5" />
            Como Funciona o Trabalho
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Do problema real à rotina organizada
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Uma jornada clara em 4 etapas diretas. Clique em qualquer etapa para entender os detalhes na prática.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* VISUALIZAÇÃO DESKTOP: Alternância CIMA -> BAIXO -> CIMA -> BAIXO           */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative min-h-[490px]">
          <div className="grid grid-cols-4 gap-6 items-stretch min-h-[490px]">
            {steps.map((item) => {
              const isTop = item.position === 'top';

              return (
                <div 
                  key={item.step} 
                  className="h-[490px] flex flex-col items-center justify-between"
                >
                  {isTop ? (
                    /* CASO 1 (Cards 01 e 03): CARD EM CIMA -> TÍTULO NO MEIO -> NÚMERO EMBAIXO */
                    <>
                      {/* Bloco Superior: Card + Título */}
                      <div className="w-full flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedStep(item)}
                          className="w-full rounded-2xl bg-[#131B2E] border border-slate-700/80 hover:border-[#05AD98] shadow-xl shadow-black/40 p-4 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#05AD98]/20"
                        >
                          {item.renderIllustration()}
                          <div className="pt-2.5 mt-1 border-t border-slate-800 text-center">
                            <span className="text-[11px] font-mono font-semibold text-slate-300 block">
                              {item.summary}
                            </span>
                          </div>
                          <div className="pt-2 mt-0.5 flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-[#05AD98] opacity-80 group-hover:opacity-100 transition-opacity">
                            <span>Ver detalhes</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>

                        {/* Título entre o Card e o Número */}
                        <div className="space-y-0.5 px-2 text-center mt-3 h-[46px] flex flex-col justify-center">
                          <h3 className="text-base font-extrabold text-white tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-[#05AD98] block">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Linha vertical conectando para baixo até o Número */}
                      <div className="flex-1 w-0.5 min-h-[36px] bg-gradient-to-b from-[#05AD98]/20 to-[#05AD98] my-2"></div>

                      {/* Número da Etapa Embaixo (Clicável) */}
                      <button 
                        onClick={() => setSelectedStep(item)}
                        className="relative group/circle cursor-pointer focus:outline-none"
                        title="Ver detalhes da etapa"
                      >
                        <div className="absolute -inset-2 rounded-full bg-[#05AD98]/25 blur-sm group-hover/circle:bg-[#05AD98]/45 transition-all"></div>
                        <div className="relative w-12 h-12 rounded-full bg-[#0B1120] border-2 border-[#05AD98] shadow-md shadow-[#05AD98]/30 flex items-center justify-center text-white group-hover/circle:scale-110 transition-transform">
                          <span className="text-xs font-mono font-black text-[#05AD98]">
                            {item.step}
                          </span>
                        </div>
                      </button>
                    </>
                  ) : (
                    /* CASO 2 (Cards 02 e 04): NÚMERO NO TOPO -> TÍTULO NO MEIO -> CARD EMBAIXO */
                    <>
                      {/* Número da Etapa no Topo (Clicável) */}
                      <button 
                        onClick={() => setSelectedStep(item)}
                        className="relative group/circle cursor-pointer focus:outline-none"
                        title="Ver detalhes da etapa"
                      >
                        <div className="absolute -inset-2 rounded-full bg-[#05AD98]/25 blur-sm group-hover/circle:bg-[#05AD98]/45 transition-all"></div>
                        <div className="relative w-12 h-12 rounded-full bg-[#0B1120] border-2 border-[#05AD98] shadow-md shadow-[#05AD98]/30 flex items-center justify-center text-white group-hover/circle:scale-110 transition-transform">
                          <span className="text-xs font-mono font-black text-[#05AD98]">
                            {item.step}
                          </span>
                        </div>
                      </button>

                      {/* Linha vertical conectando para baixo até o Título */}
                      <div className="flex-1 w-0.5 min-h-[36px] bg-gradient-to-b from-[#05AD98] to-[#05AD98]/20 my-2"></div>

                      {/* Bloco Inferior: Título + Card */}
                      <div className="w-full flex flex-col items-center">
                        {/* Título entre o Número e o Card */}
                        <div className="space-y-0.5 px-2 text-center mb-3 h-[46px] flex flex-col justify-center">
                          <h3 className="text-base font-extrabold text-white tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-[#05AD98] block">
                            {item.subtitle}
                          </span>
                        </div>

                        {/* Card Embaixo */}
                        <div 
                          onClick={() => setSelectedStep(item)}
                          className="w-full rounded-2xl bg-[#131B2E] border border-slate-700/80 hover:border-[#05AD98] shadow-xl shadow-black/40 p-4 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#05AD98]/20"
                        >
                          {item.renderIllustration()}
                          <div className="pt-2.5 mt-1 border-t border-slate-800 text-center">
                            <span className="text-[11px] font-mono font-semibold text-slate-300 block">
                              {item.summary}
                            </span>
                          </div>
                          <div className="pt-2 mt-0.5 flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-[#05AD98] opacity-80 group-hover:opacity-100 transition-opacity">
                            <span>Ver detalhes</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VISUALIZAÇÃO MOBILE & TABLET: Fluxo Vertical Limpo e Despoluído           */}
        {/* ========================================================================= */}
        <div className="lg:hidden space-y-4 text-left">
          {steps.map((item) => (
            <div 
              key={item.step} 
              onClick={() => setSelectedStep(item)}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#131B2E] border border-slate-700/80 hover:border-[#05AD98] cursor-pointer transition-all group"
            >
              {/* Círculo com o Número */}
              <div className="w-10 h-10 rounded-full bg-[#0B1120] border-2 border-[#05AD98] shadow-md shadow-[#05AD98]/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-mono font-black text-[#05AD98]">
                  {item.step}
                </span>
              </div>

              {/* Conteúdo do Card */}
              <div className="flex-1 space-y-2.5 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {item.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#05AD98]">
                      {item.subtitle}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#05AD98] px-2 py-0.5 rounded bg-[#05AD98]/10 border border-[#05AD98]/20 shrink-0">
                    Detalhes +
                  </span>
                </div>

                <div className="py-1">
                  {item.renderIllustration()}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-xs font-mono font-semibold text-slate-300 block">
                    {item.summary}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL EXPANDIDO DE DETALHES DA ETAPA (EM TERMOS SIMPLES)                  */}
      {/* ========================================================================= */}
      {selectedStep && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedStep(null)}
        >
          <div 
            className="w-full max-w-xl bg-[#0F172A] border-2 border-[#05AD98]/60 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-left relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de Fechar */}
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-[#05AD98] text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
              title="Fechar (ESC)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do Modal */}
            <div className="space-y-1.5 pr-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#05AD98]/20 text-[#05AD98] text-xs font-mono font-black border border-[#05AD98]/40">
                  Etapa {selectedStep.step}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedStep.subtitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {selectedStep.title}
              </h3>
            </div>

            {/* Ilustração Visual da Etapa */}
            <div className="p-3 rounded-2xl bg-[#131B2E] border border-slate-700/60 flex items-center justify-center">
              {selectedStep.renderIllustration()}
            </div>

            {/* 3 Blocos de Explicação Descomplicada */}
            <div className="space-y-3">
              
              {/* 1. O que é feito na prática */}
              <div className="p-4 rounded-2xl bg-[#131B2E] border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-[#05AD98]">
                  <Target className="w-4 h-4" />
                  <span>O que é feito na prática:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedStep.details.howItWorks}
                </p>
              </div>

              {/* 2. Exemplo real do dia a dia */}
              <div className="p-4 rounded-2xl bg-[#131B2E] border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Exemplo do dia a dia:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {selectedStep.details.realExample}
                </p>
              </div>

              {/* 3. O que você ganha com isso */}
              <div className="p-4 rounded-2xl bg-[#131B2E] border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-emerald-400">
                  <Rocket className="w-4 h-4" />
                  <span>O que você ganha com isso:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {selectedStep.details.benefit}
                </p>
              </div>

            </div>

            {/* Navegação entre etapas no rodapé do modal */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(s => s.step === selectedStep.step);
                  const prevIndex = (currentIndex - 1 + steps.length) % steps.length;
                  setSelectedStep(steps[prevIndex]);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-[#05AD98] text-xs font-mono font-bold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Etapa Anterior</span>
              </button>

              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(s => s.step === selectedStep.step);
                  const nextIndex = (currentIndex + 1) % steps.length;
                  setSelectedStep(steps[nextIndex]);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#05AD98] hover:bg-[#049381] text-xs font-mono font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#05AD98]/20"
              >
                <span>Próxima Etapa</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
