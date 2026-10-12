import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Workflow, 
  Filter, 
  Globe, 
  Monitor 
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { elevatorScrollToSection } from '../../utils/elevatorScroll';

export const SectionHeroProfile: React.FC = () => {
  return (
    <section id="sobre" className="slide-deck-section slide-deck-1 min-h-screen flex flex-col justify-start pt-20 sm:pt-24 pb-8 sm:pb-12 bg-white relative border-b border-[#E8ECEC]">
      <div className="slide-deck-content max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start lg:items-center">
          
          {/* LADO ESQUERDO: Apresentação, Formação, Foto Mobile ao Lado do Nome, Quadro da Biografia e Competências */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Header do Perfil: Nome + Formação com a Foto Reduzida ao Lado no Mobile */}
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="space-y-1 flex-1 min-w-0">
                {/* Localização e Atendimento */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-[#6B7280] flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#F8FAFA] border border-[#DDE2E2]">
                    <MapPin className="w-3 h-3 text-[#05AD98] shrink-0" />
                    Registro - SP • Remoto & Presencial
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-[#111827] leading-[1.08]">
                  Lucas Pedroso
                </h1>
                
                <div className="pt-0.5">
                  <span className="inline-block text-xs sm:text-sm lg:text-base font-extrabold text-[#05AD98] leading-tight">
                    Bacharel em Engenharia de Produção
                  </span>
                  <span className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-[#374151] mt-0.5 leading-tight">
                    Mapeamento de Processos, Automação e Desenvolvimento de Sistemas
                  </span>
                </div>
              </div>

              {/* Foto Reduzida ao Lado do Nome APENAS na Versão Mobile/Tablet pequeno */}
              <div className="lg:hidden shrink-0 mt-0.5">
                <div className="p-1 bg-white rounded-2xl border-2 border-[#DDE2E2] shadow-xs">
                  <div className="overflow-hidden rounded-xl w-[76px] sm:w-24 aspect-[4/5] bg-[#F8FAFA] relative">
                    <img
                      src="/Perfil.JPEG"
                      alt="Foto de Lucas Pedroso"
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Mini dot verde de status */}
                    <span 
                      className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#05AD98] border-2 border-white animate-pulse" 
                      title="Disponível para Projetos"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco / Quadro da Biografia: Delimitado, Claro e Fácil de Separar do Resto */}
            <div className="relative rounded-2xl bg-[#F8FAFA] border border-[#DDE2E2] p-4 sm:p-5.5 shadow-xs hover:border-[#05AD98]/50 transition-colors">
              {/* Cabeçalho do Bloco */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#E8ECEC]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#05AD98]"></span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#05AD98]">
                    Sobre Minha Atuação
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#878787] hidden sm:inline">
                  Engenharia de Produção + Código
                </span>
              </div>

              {/* Texto da Biografia Justificado com Leitura Fluida */}
              <div className="space-y-2.5 text-xs sm:text-sm text-[#4B5563] font-medium leading-relaxed text-justify">
                <p>
                  Gosto de entender como as coisas funcionam, identificar o que pode ser melhorado e encontrar maneiras de tornar o trabalho mais simples e eficiente. Uno meus conhecimentos em <strong className="text-[#111827] font-bold">Engenharia de Produção</strong> à programação para transformar problemas do dia a dia em soluções tecnológicas que realmente façam sentido.
                </p>
                <p>
                  Acredito que nem todo problema precisa de um sistema complexo, mas que todo processo pode ser analisado para encontrar oportunidades de melhoria. Por isso, busco entender a necessidade antes de pensar na solução, seja automatizando uma tarefa repetitiva, integrando informações ou desenvolvendo um sistema do zero.
                </p>
                <p>
                  Meu objetivo é usar a tecnologia para facilitar rotinas, reduzir trabalhos manuais e criar ferramentas que ajudem as pessoas a trabalhar melhor.
                </p>
              </div>
            </div>

            {/* 4 Competências-Chave em Grid 2x2 para Otimizar o Espaço */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold px-3 py-2 rounded-xl bg-[#F8FAFA] text-[#111827] border border-[#DDE2E2] shadow-2xs hover:border-[#05AD98] transition-colors">
                <Workflow className="w-3.5 h-3.5 text-[#05AD98] shrink-0" />
                <span className="truncate">Mapeamento de processos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold px-3 py-2 rounded-xl bg-[#F8FAFA] text-[#111827] border border-[#DDE2E2] shadow-2xs hover:border-[#05AD98] transition-colors">
                <Filter className="w-3.5 h-3.5 text-[#05AD98] shrink-0" />
                <span className="truncate">Identificação de gargalos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold px-3 py-2 rounded-xl bg-[#F8FAFA] text-[#111827] border border-[#DDE2E2] shadow-2xs hover:border-[#05AD98] transition-colors">
                <Globe className="w-3.5 h-3.5 text-[#05AD98] shrink-0" />
                <span className="truncate">Sistemas Web</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold px-3 py-2 rounded-xl bg-[#F8FAFA] text-[#111827] border border-[#DDE2E2] shadow-2xs hover:border-[#05AD98] transition-colors">
                <Monitor className="w-3.5 h-3.5 text-[#05AD98] shrink-0" />
                <span className="truncate">Automações Desktop</span>
              </div>
            </div>

            {/* CTAs Limpos com Elevador */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <Button
                size="md"
                variant="primary"
                onClick={() => elevatorScrollToSection('trilha')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold text-xs sm:text-sm shadow-xs cursor-pointer flex-1 sm:flex-none justify-center"
              >
                Conhecer a Trilha
              </Button>
              <Button
                size="md"
                variant="outline"
                onClick={() => elevatorScrollToSection('contato')}
                className="font-semibold text-xs sm:text-sm text-[#111827] cursor-pointer flex-1 sm:flex-none justify-center"
              >
                Entrar em Contato
              </Button>
            </div>

          </div>

          {/* LADO DIREITO: Foto Oficial com Apresentação Completa APENAS no Desktop */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-start lg:pt-1">
            <div className="w-full max-w-[320px] sm:max-w-[340px]">
              
              <div className="p-2 bg-white rounded-3xl border-2 border-[#DDE2E2] shadow-sm">
                <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-[#F8FAFA] relative group">
                  <img
                    src="/Perfil.JPEG"
                    alt="Foto de Lucas Pedroso"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Badge Disponível para Projetos */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#05AD98] animate-pulse shrink-0"></span>
                    <span className="font-extrabold text-[#111827] tracking-tight">Disponível para Projetos</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
