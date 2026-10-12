import React from 'react';
import { PORTFOLIO_CONTENT } from '../../data/portfolio-content';
import { ArrowUp } from 'lucide-react';
import { elevatorScrollToSection } from '../../utils/elevatorScroll';

export const FooterClean: React.FC = () => {
  const { profile } = PORTFOLIO_CONTENT;

  const scrollToTop = () => {
    elevatorScrollToSection('sobre');
  };

  return (
    <footer className="relative z-[35] w-full bg-[#0B1120] border-t border-slate-800 py-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Marca / Identidade */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#05AD98]/15 border border-[#05AD98]/30 text-[#05AD98] font-mono font-black text-xs flex items-center justify-center shadow-xs">
              LP
            </div>
            <div>
              <div className="font-black text-white text-sm">
                Lucas Pedroso
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {profile.academicDegree}
              </div>
            </div>
          </div>

          {/* Links Rápidos com Alto Contraste */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300">
            <button onClick={() => elevatorScrollToSection('sobre')} className="hover:text-[#05AD98] transition-colors cursor-pointer">Sobre</button>
            <button onClick={() => elevatorScrollToSection('trilha')} className="hover:text-[#05AD98] transition-colors cursor-pointer">Trilha</button>
            <button onClick={() => elevatorScrollToSection('demonstracoes')} className="hover:text-[#05AD98] transition-colors cursor-pointer">Demonstrações</button>
            <button onClick={() => elevatorScrollToSection('comentarios')} className="hover:text-[#05AD98] transition-colors cursor-pointer">Comentários</button>
            <button onClick={() => elevatorScrollToSection('contato')} className="hover:text-[#05AD98] transition-colors cursor-pointer">Contato</button>
          </div>

          {/* Botão Voltar ao Topo */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#131B2E] hover:bg-[#05AD98]/20 hover:text-[#05AD98] border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer text-white"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#05AD98]" />
          </button>

        </div>

        {/* Linha Inferior com Copyright e Localização */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <p>
            © {new Date().getFullYear()} Lucas Pedroso. Registro - SP.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
            <span className="text-white">Engenharia & Automação</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
