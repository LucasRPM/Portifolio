import React, { useState, useMemo } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Upload, 
  Play, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

// Exemplo de CSV de teste com problemas conhecidos propositais (duplicados, espaços extras, campo vazio)
const SAMPLE_CSV_CONTENT = `ID;DATA;DESCRICAO_ITEM;CATEGORIA;VALOR;STATUS
PED-101; 2026-03-01 ;Reagente Laboratorial A  ;Quimicos;1250.50;Aprovado
PED-102;2026-03-02;Luvas de Procedimento Nitrílicas;Consumiveis;340.00;Aprovado
PED-103;2026-03-02;Tubo Coleta a Vácuo EDTA;Consumiveis;;Pendente
PED-101; 2026-03-01 ;Reagente Laboratorial A  ;Quimicos;1250.50;Aprovado
PED-104;2026-03-04;  Calibrador Bioquímico Multi ;Quimicos;2100.00;Aprovado
PED-105;2026-03-05;Manutenção Centrífuga de Bancada;Servicos;890.00;Concluido
PED-106;2026-03-06;Papel Grau Cirúrgico Bobina;Consumiveis;450.00;Aprovado
PED-104;2026-03-04;Calibrador Bioquímico Multi;Quimicos;2100.00;Aprovado
PED-107;2026-03-08;;Servicos;150.00;Pendente`;

interface ParsedRow {
  originalIndex: number;
  raw: Record<string, string>;
  cleaned: Record<string, string>;
  isValid: boolean;
  isDuplicate: boolean;
  hasMissingField: boolean;
  issues: string[];
}

interface FlowAutomationDemoProps {
  onContactRequest?: () => void;
}

export const FlowAutomationDemo: React.FC<FlowAutomationDemoProps> = ({ onContactRequest }) => {
  const [csvRawText, setCsvRawText] = useState<string>(SAMPLE_CSV_CONTENT);
  const [fileName, setFileName] = useState<string>('pedidos_administrativos_exemplo.csv');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState<'todos' | 'validos' | 'inconsistentes'>('todos');

  // Parse e Análise do CSV
  const parseResult = useMemo(() => {
    if (!csvRawText.trim()) {
      return { headers: [], rows: [] as ParsedRow[], totalRows: 0 };
    }

    const lines = csvRawText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      return { headers: [], rows: [] as ParsedRow[], totalRows: 0 };
    }

    // Detecta delimitador (; ou ,)
    const delimiter = lines[0].includes(';') ? ';' : ',';
    const headers = lines[0].split(delimiter).map(h => h.trim());

    const seenIds = new Set<string>();
    const rows: ParsedRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(delimiter);
      const raw: Record<string, string> = {};
      const cleaned: Record<string, string> = {};
      const issues: string[] = [];

      let hasMissing = false;
      let isDup = false;

      headers.forEach((header, colIndex) => {
        const val = parts[colIndex] !== undefined ? parts[colIndex] : '';
        raw[header] = val;

        // Sanitização: Remoção de espaços extras no início e fim
        const trimmedVal = val.trim();
        cleaned[header] = trimmedVal;

        // Checagem de campo vazio obrigatório
        if (trimmedVal === '') {
          hasMissing = true;
          issues.push(`Campo "${header}" em branco.`);
        }
      });

      // Detecção de Duplicidade (pelo ID ou chave composta)
      const idKey = cleaned['ID'] || cleaned[headers[0]] || `linha-${i}`;
      if (seenIds.has(idKey)) {
        isDup = true;
        issues.push(`Registro duplicado encontrado com ID: "${idKey}".`);
      } else {
        seenIds.add(idKey);
      }

      // Validação de formato de Valor numérico (se existir coluna VALOR)
      if (cleaned['VALOR'] && isNaN(Number(cleaned['VALOR'].replace(',', '.')))) {
        issues.push(`Valor numérico inválido: "${cleaned['VALOR']}".`);
      }

      const isValid = !hasMissing && !isDup && issues.length === 0;

      rows.push({
        originalIndex: i,
        raw,
        cleaned,
        isValid,
        isDuplicate: isDup,
        hasMissingField: hasMissing,
        issues
      });
    }

    return { headers, rows, totalRows: rows.length };
  }, [csvRawText]);

  // Estatísticas calculadas a partir dos dados processados reais
  const stats = useMemo(() => {
    const total = parseResult.rows.length;
    const valid = parseResult.rows.filter(r => r.isValid).length;
    const duplicates = parseResult.rows.filter(r => r.isDuplicate).length;
    const missing = parseResult.rows.filter(r => r.hasMissingField).length;
    const withIssues = parseResult.rows.filter(r => !r.isValid).length;

    return { total, valid, duplicates, missing, withIssues };
  }, [parseResult]);

  // Executar o Processamento
  const handleRunProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  // Carregar Arquivo de Teste Padrão
  const handleLoadSample = () => {
    setCsvRawText(SAMPLE_CSV_CONTENT);
    setFileName('pedidos_administrativos_exemplo.csv');
  };

  // Upload de Arquivo Próprio
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Para a demonstração no navegador, o limite é de arquivos de até 2MB.");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvRawText(content);
    };
    reader.readAsText(file);
  };

  // Exportar/Baixar CSV Limpo e Sanitizado
  const handleExportCleanCsv = () => {
    if (parseResult.rows.length === 0) return;

    const headers = parseResult.headers;
    const validRows = parseResult.rows.filter(r => r.isValid);

    let csvOut = headers.join(';') + '\r\n';
    validRows.forEach(row => {
      const line = headers.map(h => row.cleaned[h] || '').join(';');
      csvOut += line + '\r\n';
    });

    const blob = new Blob([csvOut], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `limpo_${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Linhas a serem exibidas conforme a aba ativa
  const displayedRows = useMemo(() => {
    if (activeViewTab === 'validos') {
      return parseResult.rows.filter(r => r.isValid);
    }
    if (activeViewTab === 'inconsistentes') {
      return parseResult.rows.filter(r => !r.isValid);
    }
    return parseResult.rows;
  }, [parseResult.rows, activeViewTab]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Notificação e Controles de Upload */}
      <div className="p-5 rounded-xl bg-[#1F2B37] border border-[#36485C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#77F2A1] uppercase font-bold">
            <Sparkles className="w-4 h-4" />
            Processador & Sanitizador de Planilhas CSV
          </div>
          <p className="text-sm text-white font-medium">
            Arquivo Atual: <span className="text-[#85A1FC] font-mono">{fileName}</span>
          </p>
          <p className="text-xs text-[#8B9EAF]">
            O arquivo de teste contém deliberadamente duplicidades e campos vazios para você ver o robô atuando.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handleLoadSample}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#77F2A1]" />}
            className="text-xs"
          >
            Carregar Exemplo
          </Button>

          <label className="cursor-pointer">
            <span className="inline-flex items-center justify-center font-medium rounded-lg text-xs px-3 py-1.5 gap-1.5 bg-[#253443] hover:bg-[#2D3E50] text-[#F9F9F9] border border-[#36485C] transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 text-[#85A1FC]" />
              Carregar Meu CSV
            </span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <Button
            size="sm"
            variant="mint"
            onClick={handleRunProcessing}
            isLoading={isProcessing}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
            className="text-xs font-bold"
          >
            Executar Processamento
          </Button>
        </div>
      </div>

      {/* DASHBOARD DE MÉTRICAS REAIS DE TRATAMENTO */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card variant="solid" className="p-4 bg-[#253443] border-[#36485C]">
          <div className="text-xs font-mono text-[#8B9EAF] uppercase tracking-wider font-semibold">Registros Recebidos</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F9F9F9] mt-1">{stats.total}</div>
          <div className="text-[11px] text-[#8B9EAF] mt-1">Lidos no arquivo original</div>
        </Card>

        <Card variant="solid" className="p-4 bg-[#253443] border-[#36485C]">
          <div className="text-xs font-mono text-[#77F2A1] uppercase tracking-wider font-semibold">Registros Válidos</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#77F2A1] mt-1">{stats.valid}</div>
          <div className="text-[11px] text-[#8B9EAF] mt-1">Prontos para integração</div>
        </Card>

        <Card variant="solid" className="p-4 bg-[#253443] border-[#36485C]">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">Duplicidades</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">{stats.duplicates}</div>
          <div className="text-[11px] text-[#8B9EAF] mt-1">Detectadas e isoladas</div>
        </Card>

        <Card variant="solid" className="p-4 bg-[#253443] border-[#36485C]">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">Campos Faltantes</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1">{stats.missing}</div>
          <div className="text-[11px] text-[#8B9EAF] mt-1">Inconsistências para correção</div>
        </Card>

      </div>

      {/* SELETOR DE VISUALIZAÇÃO E DOWNLOAD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#36485C] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveViewTab('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeViewTab === 'todos'
                ? 'bg-[#4F76F6] text-white'
                : 'text-[#8B9EAF] hover:text-white hover:bg-[#253443]'
            }`}
          >
            Todos os Registros ({stats.total})
          </button>
          <button
            onClick={() => setActiveViewTab('validos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeViewTab === 'validos'
                ? 'bg-[#77F2A1] text-[#141D26]'
                : 'text-[#8B9EAF] hover:text-white hover:bg-[#253443]'
            }`}
          >
            Apenas Válidos ({stats.valid})
          </button>
          <button
            onClick={() => setActiveViewTab('inconsistentes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeViewTab === 'inconsistentes'
                ? 'bg-rose-600 text-white'
                : 'text-[#8B9EAF] hover:text-white hover:bg-[#253443]'
            }`}
          >
            Com Inconsistências ({stats.withIssues})
          </button>
        </div>

        {stats.valid > 0 && (
          <Button
            size="sm"
            variant="mint"
            onClick={handleExportCleanCsv}
            leftIcon={<Download className="w-4 h-4" />}
            className="text-xs font-bold"
          >
            Baixar CSV Higienizado ({stats.valid} linhas)
          </Button>
        )}
      </div>

      {/* TABELA COMPARATIVA DE DADOS */}
      <div className="rounded-xl bg-[#1F2B37] border border-[#36485C] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141D26] font-mono uppercase text-[#8B9EAF] border-b border-[#36485C]">
              <tr>
                <th className="py-3 px-3">Linha</th>
                <th className="py-3 px-3">Diagnóstico</th>
                {parseResult.headers.map((h, i) => (
                  <th key={i} className="py-3 px-3">{h}</th>
                ))}
                <th className="py-3 px-3 text-right">Ação / Tratamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#36485C]/60">
              {displayedRows.length === 0 ? (
                <tr>
                  <td colSpan={parseResult.headers.length + 3} className="py-10 text-center text-[#8B9EAF]">
                    Nenhum registro encontrado nesta categoria.
                  </td>
                </tr>
              ) : (
                displayedRows.map((row) => (
                  <tr 
                    key={row.originalIndex}
                    className={`transition-colors ${
                      row.isValid
                        ? 'hover:bg-[#253443]/50'
                        : row.isDuplicate
                        ? 'bg-amber-500/5 hover:bg-amber-500/10'
                        : 'bg-rose-500/5 hover:bg-rose-500/10'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono text-[#8B9EAF]">
                      #{row.originalIndex}
                    </td>

                    {/* Status da Validação */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {row.isValid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#77F2A1] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Higienizado
                        </span>
                      ) : row.isDuplicate ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Duplicidade
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-semibold">
                          <XCircle className="w-3.5 h-3.5" />
                          Incompleto
                        </span>
                      )}
                    </td>

                    {/* Valores das Colunas Higienizadas */}
                    {parseResult.headers.map((h, colIdx) => {
                      const val = row.cleaned[h];
                      const isEmpty = !val;
                      return (
                        <td key={colIdx} className="py-3 px-3 font-mono">
                          {isEmpty ? (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] italic">
                              [Vazio]
                            </span>
                          ) : (
                            <span className="text-white">
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}

                    {/* Resumo da Ação / Alerta */}
                    <td className="py-3 px-3 text-right">
                      {row.issues.length > 0 ? (
                        <span className="text-[11px] text-rose-300 font-mono" title={row.issues.join(' | ')}>
                          {row.issues[0]}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#77F2A1] font-mono">
                          Espaços corrigidos, pronto para uso
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BANNER COMERCIAL CONTEXTUAL */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#1F2B37] via-[#253443] to-[#1F2B37] border border-[#77F2A1]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-white">
            Existe alguma tarefa repetitiva de conferência de planilhas na sua empresa?
          </h4>
          <p className="text-xs text-[#C5D1DE]">
            Posso desenvolver um script ou ferramenta web em Python para validar e integrar seus arquivos automaticamente.
          </p>
        </div>
        <Button
          variant="mint"
          size="sm"
          onClick={onContactRequest}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0 font-bold"
        >
          Automatizar Essa Rotina
        </Button>
      </div>

    </div>
  );
};
