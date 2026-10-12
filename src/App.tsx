import { useState, useEffect } from 'react';
import { HeaderNav } from './features/portfolio/HeaderNav';
import { SectionHeroProfile } from './features/portfolio/SectionHeroProfile';
import { SectionWorkMethod } from './features/portfolio/SectionWorkMethod';
import { SectionSystemsShowcase } from './features/portfolio/SectionSystemsShowcase';
import { SectionTestimonialsCarousel } from './features/portfolio/SectionTestimonialsCarousel';
import { SectionContactSocial } from './features/portfolio/SectionContactSocial';
import { FloatingSectionNav } from './features/portfolio/FloatingSectionNav';
import { FooterClean } from './features/portfolio/FooterClean';
import { CashControlDemo } from './features/cash-control/CashControlDemo';
import { FileOrganizerDemo } from './features/file-organizer/FileOrganizerDemo';
import { KanbanDemo } from './features/kanban/KanbanDemo';

export function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Se saiu de uma demo e voltou ao portfólio, rola suavemente para o topo se não houver âncora
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Rota dedicada da Demonstração 01: Controle de Caixa
  if (currentHash === '#/demo-caixa' || currentHash.startsWith('#/demo-caixa')) {
    return <CashControlDemo />;
  }

  // Rota dedicada da Demonstração 02: Organizador de Arquivos Windows
  if (currentHash === '#/demo-organizador' || currentHash.startsWith('#/demo-organizador')) {
    return <FileOrganizerDemo />;
  }

  // Rota dedicada da Demonstração 03: Kanban de Tarefas
  if (currentHash === '#/demo-kanban' || currentHash.startsWith('#/demo-kanban')) {
    return <KanbanDemo />;
  }

  // Página Principal do Portfólio
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827] font-sans selection:bg-[#05AD98] selection:text-white">
      {/* Cabeçalho de Navegação com Contato Destacado */}
      <HeaderNav />

      {/* Navegador Flutuante de Seções (Desktop e Mobile) */}
      <FloatingSectionNav />

      {/* Conteúdo Principal Estruturado */}
      <main className="flex-grow">
        {/* 1. Lucas Pedroso com Formação, Especialização e Breve Biografia */}
        <SectionHeroProfile />

        {/* 2. Trilha com 4 Etapas e Conexões por Cima e por Baixo */}
        <SectionWorkMethod />

        {/* 3. Três Janelas Lado a Lado para Demonstrações */}
        <SectionSystemsShowcase />

        {/* 4. Carrossel de Comentários / Avaliações */}
        <SectionTestimonialsCarousel />

        {/* 5. Seção de Contato e Redes */}
        <SectionContactSocial />
      </main>

      {/* Rodapé Clean */}
      <FooterClean />
    </div>
  );
}

export default App;
