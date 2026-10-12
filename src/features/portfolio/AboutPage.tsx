import React from 'react';
import type { NavPage } from '../../data/navigation';
import { PERSONAL_INFO } from '../../data/personal-info';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Code, 
  Info,
  Clock,
  Workflow
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 md:py-20 bg-[#121316] text-[#F9F9FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Cabeçalho Editorial */}
        <div className="space-y-4 text-left border-b border-[#343840] pb-10">
          <Badge variant="red" icon={<Workflow className="w-3.5 h-3.5" />}>
            Trajetória & Filosofia Profissional
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F9F9FA] tracking-tight">
            Engenharia de Produção aliada ao desenvolvimento de soluções úteis
          </h1>
          <p className="text-lg text-[#9DA7B3] leading-relaxed max-w-3xl">
            A tecnologia gera o seu maior valor quando parte de uma compreensão clara, estruturada e analítica do fluxo operacional do negócio.
          </p>
        </div>

        {/* Texto Base Editorial Oficial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-8 space-y-6 text-[#9DA7B3] leading-relaxed text-base">
            <p className="text-lg text-[#F9F9FA] font-medium leading-relaxed">
              {PERSONAL_INFO.aboutStory.paragraph1}
            </p>

            <p>
              {PERSONAL_INFO.aboutStory.paragraph2}
            </p>

            {/* Destaque da Redução Prática de Tempo */}
            <div className="my-6 p-5 rounded-xl bg-[#181A1D] border border-[#EA2B1F]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#FF6358] font-mono text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#EA2B1F]" />
                Experiência com Automação Operacional
              </div>
              <p className="text-sm text-[#F9F9FA]">
                {PERSONAL_INFO.aboutStory.paragraph3}
              </p>
            </div>

            <p>
              {PERSONAL_INFO.aboutStory.paragraph4}
            </p>

            <p>
              {PERSONAL_INFO.aboutStory.paragraph5}
            </p>

            <p className="font-semibold text-white pt-2 border-t border-[#343840]">
              {PERSONAL_INFO.aboutStory.closing}
            </p>
          </div>

          {/* Card Lateral de Resumo Executivo */}
          <div className="md:col-span-4 space-y-6">
            <Card variant="solid" className="p-6 bg-[#181A1D] border-[#343840] space-y-4">
              <h3 className="text-sm font-mono uppercase text-[#AEC3BA] tracking-wider font-semibold">
                Perfil em Resumo
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[#9DA7B3]">Formação Acadêmica</div>
                  <div className="font-semibold text-white">Bacharel em Engenharia de Produção</div>
                </div>
                <div>
                  <div className="text-[#9DA7B3]">Especialização de Atuação</div>
                  <div className="font-semibold text-white">Mapeamento & Automação de Processos</div>
                </div>
                <div>
                  <div className="text-[#9DA7B3]">Diferencial Competitivo</div>
                  <div className="font-semibold text-[#EA2B1F]">Diagnóstico do processo antes do código</div>
                </div>
                <div>
                  <div className="text-[#9DA7B3]">Localização</div>
                  <div className="font-semibold text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#343840]">
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => onNavigate('contato')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Iniciar Conversa
                </Button>
              </div>
            </Card>

            <div className="p-4 rounded-xl bg-[#181A1D] border border-[#343840] text-xs text-[#9DA7B3] space-y-2">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Info className="w-4 h-4 text-[#AEC3BA]" />
                Segurança e Ética de Dados
              </div>
              <p>
                As informações compartilhadas refletem competências e metodologias de engenharia. Nenhum dado confidencial corporativo é exposto.
              </p>
            </div>
          </div>

        </div>

        {/* Linha do Tempo de Experiências Práticas */}
        <div className="space-y-8 pt-8 border-t border-[#343840]">
          <div className="space-y-2">
            <Badge variant="mint" icon={<Briefcase className="w-3.5 h-3.5" />}>
              Experiência Prática Aplicada
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Vivência em rotinas reais de empresas e fluxos operacionais
            </h2>
          </div>

          <div className="space-y-6">
            {PERSONAL_INFO.experiences.map((exp, idx) => (
              <Card key={idx} variant="solid" className="p-6 bg-[#181A1D] border-[#343840] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#343840] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-mono text-[#AEC3BA]">{exp.organization} • {exp.focus}</p>
                  </div>
                  <span className="text-xs font-mono text-[#9DA7B3] bg-[#22252A] px-2.5 py-1 rounded border border-[#343840] self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="text-sm text-[#9DA7B3] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#EA2B1F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.resultsNote && (
                  <div className="pt-2 text-xs text-[#AEC3BA] italic font-mono border-t border-[#343840]">
                    * {exp.resultsNote}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Matriz de Competências Técnicas */}
        <div className="space-y-8 pt-8 border-t border-[#343840]">
          <div className="space-y-2">
            <Badge variant="slate" icon={<Code className="w-3.5 h-3.5 text-[#EA2B1F]" />}>
              Matriz de Competências
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Habilidades organizadas com clareza e transparência
            </h2>
            <p className="text-sm text-[#9DA7B3]">
              Diferenciação clara entre conhecimentos com aplicação prática consolidada e tecnologias em aprofundamento contínuo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAL_INFO.skillCategories.map((cat, idx) => (
              <Card key={idx} variant="solid" className="p-6 bg-[#181A1D] border-[#343840] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{cat.title}</h3>
                    <p className="text-xs text-[#9DA7B3]">{cat.description}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-lg bg-[#22252A] border border-[#343840] flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white">{skill.name}</div>
                          {skill.context && (
                            <div className="text-[11px] text-[#9DA7B3]">{skill.context}</div>
                          )}
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                          skill.level === 'prática'
                            ? 'bg-[#EA2B1F]/15 text-[#FF6358] border border-[#EA2B1F]/30'
                            : 'bg-[#AEC3BA]/15 text-[#AEC3BA] border border-[#AEC3BA]/30'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chamada Final da Página Sobre */}
        <div className="p-8 rounded-2xl bg-[#181A1D] border border-[#EA2B1F]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              Quer avaliar como sua empresa pode ganhar eficiência operacional?
            </h3>
            <p className="text-sm text-[#9DA7B3]">
              Vamos conversar sobre seus processos atuais e estruturar soluções tecnológicas sob medida.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => onNavigate('contato')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0 font-bold"
          >
            Falar Sobre um Projeto
          </Button>
        </div>

      </div>
    </div>
  );
};
