import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { PERSONAL_INFO } from '../../data/personal-info';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Building,
  Mail,
  User,
  Workflow
} from 'lucide-react';

interface ContactFormData {
  name: string;
  company: string;
  contactInfo: string;
  needType: string;
  problemDescription: string;
  preferredChannel: string;
}

interface ContactPageProps {
  initialNeed?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialNeed = 'sistemas' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    contactInfo: '',
    needType: initialNeed,
    problemDescription: '',
    preferredChannel: 'whatsapp'
  });

  useEffect(() => {
    if (initialNeed) {
      setFormData(prev => ({ ...prev, needType: initialNeed }));
    }
  }, [initialNeed]);

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errs.name = 'Por favor, informe seu nome.';
    }

    if (!formData.contactInfo.trim()) {
      errs.contactInfo = 'Informe seu e-mail ou WhatsApp para retorno.';
    } else if (
      !formData.contactInfo.includes('@') && 
      formData.contactInfo.replace(/\D/g, '').length < 8
    ) {
      errs.contactInfo = 'Informe um e-mail válido ou telefone com DDD.';
    }

    if (!formData.problemDescription.trim()) {
      errs.problemDescription = 'Descreva brevemente o problema operacional que deseja resolver.';
    } else if (formData.problemDescription.trim().length < 15) {
      errs.problemDescription = 'Conte com um pouco mais de detalhes (mínimo 15 caracteres).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    setTimeout(() => {
      try {
        const submissionPayload = {
          ...formData,
          submittedAt: new Date().toISOString()
        };
        console.log('Mensagem de contato registrada localmente:', submissionPayload);
        
        setStatus('success');
        setSuccessMessage('Solicitação de diagnóstico recebida com sucesso! Analisarei os detalhes e entrarei em contato.');
      } catch {
        setStatus('error');
      }
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      contactInfo: '',
      needType: 'sistemas',
      problemDescription: '',
      preferredChannel: 'whatsapp'
    });
    setStatus('idle');
    setErrors({});
  };

  return (
    <div className="py-12 md:py-20 bg-[#121316] text-[#F9F9FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="red" icon={<MessageSquare className="w-3.5 h-3.5" />}>
            Canal de Diagnóstico & Contato
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F9F9FA] tracking-tight">
            Conte sobre o desafio da sua operação
          </h1>
          <p className="text-base sm:text-lg text-[#9DA7B3]">
            Explique a rotina atual, o que consome tempo da equipe e onde ocorrem gargalos. Vamos estruturar juntos uma solução tecnológica sob medida.
          </p>
        </div>

        {/* Formulário ou Mensagem de Sucesso */}
        <Card variant="solid" className="p-8 sm:p-10 bg-[#181A1D] border-[#343840]">
          
          {status === 'success' ? (
            <div className="text-center py-12 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#EA2B1F]/20 border border-[#EA2B1F]/40 text-[#FF6358] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl font-bold text-white">
                  Diagnóstico Enviado!
                </h3>
                <p className="text-sm text-[#9DA7B3] leading-relaxed">
                  {successMessage}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#22252A] border border-[#343840] text-xs text-[#9DA7B3] max-w-md mx-auto text-left space-y-1.5 font-mono">
                <div><strong className="text-white">Profissional:</strong> {PERSONAL_INFO.name}</div>
                <div><strong className="text-white">Solicitante:</strong> {formData.name}</div>
                <div><strong className="text-white">Contato:</strong> {formData.contactInfo}</div>
                <div><strong className="text-white">Categoria:</strong> {formData.needType}</div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                Enviar Outra Solicitação
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nome */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-mono font-semibold text-[#9DA7B3] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#EA2B1F]" />
                    Seu Nome *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Carlos Silva"
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#121316] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EA2B1F] transition-colors ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-[#343840]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Empresa */}
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-xs font-mono font-semibold text-[#9DA7B3] uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#AEC3BA]" />
                    Empresa (Opcional)
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ex: Laboratório ou Indústria Exemplo"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#121316] border border-[#343840] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EA2B1F] transition-colors"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* E-mail ou WhatsApp */}
                <div className="space-y-2">
                  <label htmlFor="contactInfo" className="block text-xs font-mono font-semibold text-[#9DA7B3] uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#AEC3BA]" />
                    E-mail ou WhatsApp *
                  </label>
                  <input
                    id="contactInfo"
                    type="text"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    placeholder="seu.email@empresa.com ou (11) 99999-9999"
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#121316] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EA2B1F] transition-colors ${
                      errors.contactInfo ? 'border-rose-500 focus:ring-rose-500' : 'border-[#343840]'
                    }`}
                  />
                  {errors.contactInfo && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.contactInfo}
                    </p>
                  )}
                </div>

                {/* Tipo de Necessidade */}
                <div className="space-y-2">
                  <label htmlFor="needType" className="block text-xs font-mono font-semibold text-[#9DA7B3] uppercase tracking-wider flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-[#EA2B1F]" />
                    Tipo de Necessidade
                  </label>
                  <select
                    id="needType"
                    value={formData.needType}
                    onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#121316] border border-[#343840] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#EA2B1F]"
                  >
                    <option value="sistemas">Sistema Web Personalizado (Como o FlowDesk)</option>
                    <option value="automacao">Automação de Planilhas CSV (Como o Flow Automation)</option>
                    <option value="processos">Simulação de Impacto Operacional / Mapeamento</option>
                    <option value="outro">Outro Desafio Operacional</option>
                  </select>
                </div>

              </div>

              {/* Descrição do Problema */}
              <div className="space-y-2">
                <label htmlFor="problemDescription" className="block text-xs font-mono font-semibold text-[#9DA7B3] uppercase tracking-wider">
                  Descreva a Rotina Atual e o Gargalo Encontrado *
                </label>
                <textarea
                  id="problemDescription"
                  rows={4}
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  placeholder="Ex: Hoje nossa equipe gasta cerca de 3 horas por dia cruzando duas planilhas manualmente para conferir divergências, e gostaríamos de uma ferramenta que fizesse essa validação automática e gerasse os alertas..."
                  className={`w-full px-4 py-3 rounded-lg bg-[#121316] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EA2B1F] transition-colors leading-relaxed ${
                    errors.problemDescription ? 'border-rose-500 focus:ring-rose-500' : 'border-[#343840]'
                  }`}
                />
                {errors.problemDescription && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.problemDescription}
                  </p>
                )}
              </div>

              {/* Botão de Envio */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#9DA7B3] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#AEC3BA] shrink-0" />
                  <span>Retorno técnico direto com Lucas Muniz em até 24h úteis.</span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={status === 'loading'}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto font-bold shadow-lg shadow-[#EA2B1F]/30"
                >
                  Enviar Solicitação de Diagnóstico
                </Button>
              </div>

            </form>
          )}

        </Card>

      </div>
    </div>
  );
};
