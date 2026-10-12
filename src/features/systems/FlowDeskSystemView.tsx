import React from 'react';
import { StandaloneSystemLayout } from './StandaloneSystemLayout';
import { FlowDeskDemo } from '../flowdesk/FlowDeskDemo';
import { Terminal } from 'lucide-react';

interface FlowDeskSystemViewProps {
  onBackToPortfolio: () => void;
  onHireSolution: (systemId: string) => void;
}

export const FlowDeskSystemView: React.FC<FlowDeskSystemViewProps> = ({
  onBackToPortfolio,
  onHireSolution
}) => {
  return (
    <StandaloneSystemLayout
      systemId="flowdesk"
      systemName="FlowDesk Operations Hub"
      systemTagline="Sistema Central de Requisições, Chamados & Gestão Operacional com Auditoria"
      systemBadge="SaaS Enterprise"
      systemIcon={<Terminal className="w-5 h-5 text-[#EA2B1F]" />}
      onBackToPortfolio={onBackToPortfolio}
      onHireSolution={onHireSolution}
    >
      <div className="space-y-6">
        <FlowDeskDemo onContactRequest={() => onHireSolution('flowdesk')} />
      </div>
    </StandaloneSystemLayout>
  );
};
