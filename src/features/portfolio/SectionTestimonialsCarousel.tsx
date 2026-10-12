import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_CONTENT } from '../../data/portfolio-content';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MessageSquareQuote,
  Quote
} from 'lucide-react';

export const SectionTestimonialsCarousel: React.FC = () => {
  const { testimonials } = PORTFOLIO_CONTENT;
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Variáveis para suporte a Touch Swipe no celular
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Ajusta dinamicamente a quantidade de cards visíveis conforme a largura da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Garante que o startIndex não exceda o maxIndex ao redimensionar
  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, startIndex]);

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Suporte a gestos touch (deslizar o dedo no mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide(); // Arrastou para a esquerda -> próximo
    } else if (distance < -45) {
      prevSlide(); // Arrastou para a direita -> anterior
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-play suave com pausa no hover ou toque
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [startIndex, isPaused, maxIndex]);

  // Porcentagem de deslocamento por slide
  const stepPercentage = 100 / visibleCount;

  return (
    <section id="comentarios" className="slide-deck-section slide-deck-4 min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-12 sm:py-16 lg:py-20 bg-[#0B1120] text-white relative border-t border-slate-800 shadow-[0_-30px_60px_rgba(0,0,0,0.65)] overflow-hidden">
      
      {/* Luz ambiente de fundo no tema escuro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#05AD98]/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>

      <div className="slide-deck-content max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 lg:space-y-10 relative z-10 w-full">
        
        {/* Cabeçalho com Navegação Integrada e Tipografia Responsiva */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05AD98]/15 text-[#05AD98] text-[11px] sm:text-xs font-mono font-bold border border-[#05AD98]/30 shadow-xs">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              Depoimentos & Prova Social
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              O que dizem sobre as entregas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
              Feedbacks de coordenadores e gestores após implantação da padronização e sistemas sob medida.
            </p>
          </div>

          {/* Controles do Carrossel (Contador + Botões de Navegação) */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400">
              0{startIndex + 1} — 0{Math.min(startIndex + visibleCount, testimonials.length)} <span className="text-slate-600">/ 0{testimonials.length}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#131B2E] border border-slate-700 hover:border-[#05AD98] text-white hover:text-[#05AD98] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                aria-label="Avaliações anteriores"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#131B2E] border border-slate-700 hover:border-[#05AD98] text-white hover:text-[#05AD98] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                aria-label="Próximas avaliações"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONTAINER MULTI-CARD DESLIZANTE COM SUPORTE A SWIPE TOUCH NO CELULAR     */}
        {/* ========================================================================= */}
        <div 
          className="overflow-hidden py-1 touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${startIndex * stepPercentage}%)`
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-1.5 sm:px-2.5 flex"
              >
                <div className="w-full p-4.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#131B2E] border border-slate-700/80 hover:border-[#05AD98] shadow-lg shadow-black/30 flex flex-col justify-between transition-all duration-300 group text-left">
                  
                  {/* Topo: Tag de Destaque & 5 Estrelas */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-extrabold text-[#05AD98] uppercase px-2 py-0.5 rounded-md bg-[#05AD98]/15 border border-[#05AD98]/30">
                        ★ {item.highlightTag}
                      </span>
                      <div className="flex items-center gap-0.5 text-[#05AD98]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current text-[#05AD98]" />
                        ))}
                      </div>
                    </div>

                    {/* Aspas & Depoimento */}
                    <div className="relative pt-1">
                      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#05AD98]/20 absolute -top-1.5 -left-1 -z-0" />
                      <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic relative z-10">
                        "{item.content}"
                      </p>
                    </div>
                  </div>

                  {/* Rodapé do Card: Autor & Contexto */}
                  <div className="pt-3.5 sm:pt-4 mt-3.5 sm:mt-4 border-t border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#05AD98]/15 border border-[#05AD98]/30 text-[#05AD98] font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {item.avatarInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-xs sm:text-sm text-white truncate group-hover:text-[#05AD98] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
                        {item.role} • <span className="text-[#05AD98]">{item.companyContext}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores / Dots de Paginação */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStartIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                startIndex === idx ? 'w-6 sm:w-8 bg-[#05AD98]' : 'w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Página de depoimentos ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
