import React from 'react';
import { StandaloneSystemLayout } from './StandaloneSystemLayout';
import { FlowAutomationDemo } from '../flow-automation/FlowAutomationDemo';
import { Layers } from 'lucide-react';

interface FlowAutomationSystemViewProps {
  onBackToPortfolio: () => void;
  onHireSolution: (systemId: string) => void;
}

export const FlowAutomationSystemView: React.FC<FlowAutomationSystemViewProps> = ({
  onBackToPortfolio,
  onHireSolution
}) => {
  return (
    <StandaloneSystemLayout
      systemId="flow-automation"
      systemName="Flow Automation Engine"
      systemTagline="Pipeline Automatizado de Higienização, Validação e Padronização de Planilhas CSV"
      systemBadge="Data Processing Engine"
      systemIcon={<Layers className="w-5 h-5 text-[#EA2B1F]" />}
      onBackToPortfolio={onBackToPortfolio}
      onHireSolution={onHireSolution}
    >
      <div className="space-y-6">
        <FlowAutomationDemo onContactRequest={() => onHireSolution('flow-automation')} />
      </div>
    </StandaloneSystemLayout>
  );
};
