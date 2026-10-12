import React from 'react';
import type { NavPage } from '../../data/navigation';
import { PERSONAL_INFO } from '../../data/personal-info';
import { ProfileAvatar } from '../../components/common/ProfileAvatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Printer, 
  GraduationCap, 
  Briefcase, 
  Code, 
  CheckCircle2, 
  Clock, 
  Mail, 
  MapPin, 
  FileText, 
  Layers, 
  Cpu, 
  Workflow,
  ArrowRight
} from 'lucide-react';

interface CurriculumPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenSystem?: (systemId: string) => void;
}

export const CurriculumPage: React.FC<CurriculumPageProps> = ({ onNavigate, onOpenSystem }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 md:py-16 bg-[#121316] text-[#F9F9FA] print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Barra Superior de Ações do Currículo (Oculta na Impressão) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#181A1D] border border-[#343840] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EA2B1F]/15 border border-[#EA2B1F]/30 flex items-center justify-center text-[#EA2B1F]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F9F9FA]">Currículo Profissional Oficial</h2>
              <p className="text-xs text-[#AEC3BA]">Formatação executiva para análise técnica e exportação direta em PDF</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate('contato')}
              className="text-xs"
            >
              Falar com Lucas
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
              className="text-xs print-include"
            >
              Imprimir / Salvar em PDF
            </Button>
          </div>
        </div>

        {/* ÁREA DO CURRÍCULO (Otimizada para Tela e para Impressão) */}
        <div className="print-area p-8 sm:p-12 rounded-2xl bg-[#181A1D] border border-[#343840] shadow-2xl space-y-10 print:border-none print:shadow-none print:p-0 print:bg-white">
          
          {/* HEADER DO CURRÍCULO: Espaço para Nome e Foto Oficial */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-[#343840] pb-8 print:border-b-2 print:border-gray-300">
            
            {/* Foto de Perfil Oficial */}
            <div className="shrink-0">
              <ProfileAvatar name={PERSONAL_INFO.name} size="xl" />
            </div>

            {/* Informações de Cabeçalho */}
            <div className="space-y-3 text-center sm:text-left flex-grow">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Badge variant="red" icon={<Workflow className="w-3 h-3" />}>
                  Engenharia de Produção
                </Badge>
                <Badge variant="mint" icon={<Cpu className="w-3 h-3" />}>
                  Mapeamento & Automação de Processos
                </Badge>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F9F9FA] tracking-tight print:text-black">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#AEC3BA] font-mono mt-1 print:text-gray-800">
                  {PERSONAL_INFO.title}
                </p>
              </div>

              {/* Informações de Contato / Localização */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-5 text-xs text-[#9DA7B3] font-mono print:text-gray-700">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EA2B1F] print:text-black" />
                  {PERSONAL_INFO.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#AEC3BA] print:text-black" />
                  {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#EA2B1F] print:text-black" />
                  Disponível para Projetos & Contratação
                </span>
              </div>
            </div>

          </div>

          {/* RESUMO PROFISSIONAL */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-[#AEC3BA] flex items-center gap-2 print:text-black">
              <Cpu className="w-4 h-4 text-[#EA2B1F] print:text-black" />
              Resumo Profissional & Proposta de Valor
            </h2>
            <div className="p-5 rounded-xl bg-[#22252A] border border-[#343840] space-y-3 text-sm text-[#F9F9FA] leading-relaxed print:bg-gray-50 print:border-gray-200 print:text-black">
              <p>
                Profissional com formação sólida em <strong>Engenharia de Produção</strong> direcionado ao desenvolvimento de sistemas sob medida, automação de processos empresariais e arquitetura de dados operacionais.
              </p>
              <p>
                Visão sistêmica orientada a identificar gargalos, desenhar fluxos de valor e implementar ferramentas digitais práticas (Python, FastAPI, React, SQL) que eliminam retrabalhos manuais e elevam a confiabilidade das informações.
              </p>
              <div className="p-3.5 rounded-lg bg-[#181A1D] border border-[#EA2B1F]/30 text-xs text-[#F9F9FA] font-mono flex items-center gap-3 print:border-gray-300 print:text-black">
                <Clock className="w-4 h-4 text-[#EA2B1F] shrink-0 print:text-black" />
                <span>
                  <strong className="text-[#AEC3BA]">Conquista prática documentada:</strong> Redução de aproximadamente 1/3 do tempo de execução em rotinas operacionais administrativas por meio de planilhas integradas e rotinas automatizadas.
                </span>
              </div>
            </div>
          </div>

          {/* FORMAÇÃO ACADÊMICA */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-[#AEC3BA] flex items-center gap-2 print:text-black">
              <GraduationCap className="w-4 h-4 text-[#EA2B1F] print:text-black" />
              Formação Acadêmica
            </h2>
            <div className="space-y-3">
              {PERSONAL_INFO.education.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#22252A] border border-[#343840] space-y-2 print:bg-transparent print:border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-white print:text-black">{edu.degree}</h3>
                    <span className="text-xs font-mono text-[#AEC3BA] bg-[#121316] px-2.5 py-0.5 rounded border border-[#343840] self-start sm:self-auto print:text-gray-800 print:bg-gray-100">
                      {edu.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#EA2B1F] font-semibold print:text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-[#9DA7B3] leading-relaxed print:text-gray-700">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* EXPERIÊNCIAS PROFISSIONAIS */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-[#AEC3BA] flex items-center gap-2 print:text-black">
              <Briefcase className="w-4 h-4 text-[#EA2B1F] print:text-black" />
              Experiência Profissional
            </h2>
            <div className="space-y-4">
              {PERSONAL_INFO.experiences.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#22252A] border border-[#343840] space-y-3 print:bg-transparent print:border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#343840] pb-2 print:border-gray-300">
                    <div>
                      <h3 className="text-base font-bold text-white print:text-black">{exp.role}</h3>
                      <p className="text-xs font-mono text-[#AEC3BA] print:text-gray-700">{exp.organization} • {exp.focus}</p>
                    </div>
                    <span className="text-xs font-mono text-[#9DA7B3] print:text-gray-700">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-[#9DA7B3] flex items-start gap-2.5 print:text-gray-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EA2B1F] shrink-0 mt-0.5 print:text-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* COMPETÊNCIAS E HABILIDADES */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-[#AEC3BA] flex items-center gap-2 print:text-black">
              <Code className="w-4 h-4 text-[#EA2B1F] print:text-black" />
              Competências Técnicas & Tecnologias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PERSONAL_INFO.skillCategories.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#22252A] border border-[#343840] space-y-3 print:bg-transparent print:border-gray-300">
                  <h3 className="text-xs font-mono font-bold text-[#AEC3BA] uppercase print:text-black">
                    {cat.title}
                  </h3>
                  <div className="space-y-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="text-xs flex items-center justify-between text-[#9DA7B3] print:text-gray-800">
                        <span>{skill.name}</span>
                        <span className="text-[10px] font-mono text-[#EA2B1F] font-semibold print:text-gray-600">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEMONSTRAÇÕES PRÁTICAS DO PORTFÓLIO (Links diretos para os sistemas isolados) */}
          <div className="space-y-3 print:hidden">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-[#AEC3BA] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#EA2B1F]" />
              Sistemas Demonstrativos Interativos Desenvolvidos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                onClick={() => onOpenSystem ? onOpenSystem('flowdesk') : onNavigate('demonstracoes')}
                className="p-4 rounded-xl bg-[#22252A] border border-[#343840] hover:border-[#EA2B1F] cursor-pointer transition-colors space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#EA2B1F] transition-colors">01. FlowDesk</span>
                  <span className="text-[10px] font-mono text-[#AEC3BA]">SaaS</span>
                </div>
                <p className="text-xs text-[#9DA7B3]">Central de Chamados Operacionais com Kanban e auditoria de tickets.</p>
                <div className="text-[11px] font-mono text-[#EA2B1F] pt-1 flex items-center gap-1">
                  Abrir Sistema Isolado <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div 
                onClick={() => onOpenSystem ? onOpenSystem('flow-automation') : onNavigate('demonstracoes')}
                className="p-4 rounded-xl bg-[#22252A] border border-[#343840] hover:border-[#EA2B1F] cursor-pointer transition-colors space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#EA2B1F] transition-colors">02. Flow Automation</span>
                  <span className="text-[10px] font-mono text-[#AEC3BA]">Dados</span>
                </div>
                <p className="text-xs text-[#9DA7B3]">Motor de higienização, remoção de duplicados e padronização de CSVs.</p>
                <div className="text-[11px] font-mono text-[#EA2B1F] pt-1 flex items-center gap-1">
                  Abrir Sistema Isolado <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div 
                onClick={() => onOpenSystem ? onOpenSystem('process-impact') : onNavigate('demonstracoes')}
                className="p-4 rounded-xl bg-[#22252A] border border-[#343840] hover:border-[#EA2B1F] cursor-pointer transition-colors space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#EA2B1F] transition-colors">03. Process Impact</span>
                  <span className="text-[10px] font-mono text-[#AEC3BA]">ROI</span>
                </div>
                <p className="text-xs text-[#9DA7B3]">Simulador operacional e financeiro de payback de projetos de automação.</p>
                <div className="text-[11px] font-mono text-[#EA2B1F] pt-1 flex items-center gap-1">
                  Abrir Sistema Isolado <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* RODAPÉ DO CURRÍCULO COM CTA */}
          <div className="no-print pt-6 border-t border-[#343840] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#9DA7B3]">
              Perfil oficial de Lucas Raphael Pedroso Muniz para contratações e projetos.
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Imprimir CV
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('contato')}
              >
                Entrar em Contato
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
