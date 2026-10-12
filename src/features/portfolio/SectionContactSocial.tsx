import React, { useState } from 'react';
import { PORTFOLIO_CONTENT } from '../../data/portfolio-content';
import { Button } from '../../components/common/Button';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MapPin, 
  MessageSquare,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface ContactFormData {
  name: string;
  contactInfo: string;
  needType: string;
  message: string;
}

export const SectionContactSocial: React.FC = () => {
  const { profile } = PORTFOLIO_CONTENT;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    contactInfo: '',
    needType: 'sistema-web',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errs.name = 'Por favor, informe seu nome completo.';
    }

    if (!formData.contactInfo.trim()) {
      errs.contactInfo = 'Informe seu e-mail ou WhatsApp para contato.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Descreva brevemente o gargalo ou necessidade da sua equipe.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      contactInfo: '',
      needType: 'sistema-web',
      message: ''
    });
    setStatus('idle');
    setErrors({});
  };

  return (
    <section id="contato" className="slide-deck-section slide-deck-5 min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-16 sm:py-20 bg-white relative border-t border-[#E8ECEC] shadow-[0_-20px_50px_rgba(0,0,0,0.12)]">
      <div className="slide-deck-content max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Grid Dividido em Esquerda e Direita com Alto Contraste */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LADO ESQUERDO: Contatos Diretos & Redes Sociais */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#05AD98] text-xs font-mono font-bold border border-[#05AD98]/25 shadow-xs">
                <MessageSquare className="w-3.5 h-3.5" />
                Contato Direto
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111827]">
                Vamos conversar?
              </h2>
            </div>

            {/* Cards de Contato com Alto Contraste */}
            <div className="space-y-3">
              
              {/* Card E-mail com botão de cópia */}
              <div className="p-4 rounded-2xl bg-white border-2 border-[#DDE2E2] hover:border-[#05AD98] shadow-xs flex items-center justify-between gap-3 transition-all group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#05AD98] flex items-center justify-center shrink-0 border border-[#05AD98]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#6B7280] uppercase font-bold">E-mail Profissional</div>
                    <a 
                      href={`mailto:${profile.email}`}
                      className="text-xs sm:text-sm font-extrabold text-[#111827] group-hover:text-[#05AD98] transition-colors truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-xl bg-[#F8FAFA] hover:bg-[#E6F7F5] hover:text-[#05AD98] text-[#4B5563] transition-colors shrink-0 cursor-pointer border border-[#E8ECEC]"
                  title="Copiar e-mail"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#05AD98]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Localização */}
              <div className="p-4 rounded-2xl bg-white border-2 border-[#DDE2E2] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0F4F4] text-[#111827] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#6B7280] uppercase font-bold">Disponibilidade</div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#111827]">
                    {profile.location}
                  </div>
                </div>
              </div>

            </div>

            {/* Redes Sociais */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-mono uppercase text-[#111827] block font-black">
                Redes Profissionais:
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://www.linkedin.com/in/lucas-raphael-319613108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white border-2 border-[#DDE2E2] hover:border-[#05AD98] text-xs font-extrabold text-[#111827] hover:text-[#05AD98] flex items-center gap-2 transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 text-[#05AD98] fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.76.78 1.76 1.75-.79 1.76-1.76 1.76m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                  </svg>
                  <span>LinkedIn / Lucas Pedroso</span>
                  <ExternalLink className="w-3 h-3 text-[#6B7280]" />
                </a>

                <a
                  href="https://github.com/LucasRPM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white border-2 border-[#DDE2E2] hover:border-[#05AD98] text-xs font-extrabold text-[#111827] hover:text-[#05AD98] flex items-center gap-2 transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 text-[#111827] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                  <span>GitHub / LucasRPM</span>
                  <ExternalLink className="w-3 h-3 text-[#6B7280]" />
                </a>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: Formulário Enxuto & Rápido */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#DDE2E2] shadow-sm">
              
              {status === 'success' ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-[#E6F7F5] text-[#05AD98] flex items-center justify-center mx-auto border-2 border-[#05AD98]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-black text-[#111827]">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] font-medium max-w-sm mx-auto">
                      Retornarei em até 24h úteis para conversar sobre seus processos e ferramentas.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset} className="font-bold border-[#DDE2E2]">
                    Enviar Outra Mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-black text-[#111827] uppercase">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nome completo"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#F8FAFA] border-2 text-xs sm:text-sm text-[#111827] placeholder-[#BBBFBF] focus:outline-none focus:ring-2 focus:ring-[#05AD98] focus:bg-white transition-colors font-medium ${
                          errors.name ? 'border-rose-400' : 'border-[#DDE2E2]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-bold text-rose-600">{errors.name}</p>
                      )}
                    </div>

                    {/* Contato */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-black text-[#111827] uppercase">
                        E-mail ou WhatsApp *
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="contato@empresa.com ou (11) 9..."
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#F8FAFA] border-2 text-xs sm:text-sm text-[#111827] placeholder-[#BBBFBF] focus:outline-none focus:ring-2 focus:ring-[#05AD98] focus:bg-white transition-colors font-medium ${
                          errors.contactInfo ? 'border-rose-400' : 'border-[#DDE2E2]'
                        }`}
                      />
                      {errors.contactInfo && (
                        <p className="text-[11px] font-bold text-rose-600">{errors.contactInfo}</p>
                      )}
                    </div>
                  </div>

                  {/* Categoria */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-black text-[#111827] uppercase">
                      Interesse Principal
                    </label>
                    <select
                      value={formData.needType}
                      onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFA] border-2 border-[#DDE2E2] text-xs sm:text-sm text-[#111827] font-semibold focus:outline-none focus:ring-2 focus:ring-[#05AD98] focus:bg-white"
                    >
                      <option value="sistema-web">Sistema Web</option>
                      <option value="automacao-desktop">Automação Desktop</option>
                      <option value="mapeamento-processos">Mapeamento de Processos</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-black text-[#111827] uppercase">
                      Descreva Brevemente o Gargalo ou Demanda *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ex: Minha equipe gasta muito tempo conferindo planilhas manuais ou com pedidos perdidos em mensagens..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#F8FAFA] border-2 text-xs sm:text-sm text-[#111827] placeholder-[#BBBFBF] focus:outline-none focus:ring-2 focus:ring-[#05AD98] focus:bg-white transition-colors leading-relaxed font-medium ${
                        errors.message ? 'border-rose-400' : 'border-[#DDE2E2]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-bold text-rose-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Botão de Envio */}
                  <div className="pt-1">
                    <Button
                      type="submit"
                      size="md"
                      variant="primary"
                      isLoading={status === 'loading'}
                      leftIcon={<Send className="w-4 h-4" />}
                      className="w-full font-extrabold shadow-md shadow-[#05AD98]/20 text-sm"
                    >
                      Enviar Mensagem
                    </Button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
