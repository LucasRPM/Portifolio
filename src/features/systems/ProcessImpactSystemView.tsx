import React from 'react';
import { StandaloneSystemLayout } from './StandaloneSystemLayout';
import { ProcessImpactDemo } from '../process-impact/ProcessImpactDemo';
import { Calculator } from 'lucide-react';

interface ProcessImpactSystemViewProps {
  onBackToPortfolio: () => void;
  onHireSolution: (systemId: string) => void;
}

export const ProcessImpactSystemView: React.FC<ProcessImpactSystemViewProps> = ({
  onBackToPortfolio,
  onHireSolution
}) => {
  return (
    <StandaloneSystemLayout
      systemId="process-impact"
      systemName="Process Impact Simulator"
      systemTagline="Simulador Operacional de Engenharia: Redução de Custos, Horas Liberadas & Payback"
      systemBadge="ROI Analytics"
      systemIcon={<Calculator className="w-5 h-5 text-[#EA2B1F]" />}
      onBackToPortfolio={onBackToPortfolio}
      onHireSolution={onHireSolution}
    >
      <div className="space-y-6">
        <ProcessImpactDemo onContactRequest={() => onHireSolution('process-impact')} />
      </div>
    </StandaloneSystemLayout>
  );
};
