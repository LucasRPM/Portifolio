export type NavPage = 'home' | 'solucoes' | 'demonstracoes' | 'curriculo' | 'sobre' | 'contato';

export interface NavItem {
  id: NavPage;
  label: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Início' },
  { id: 'demonstracoes', label: 'Demonstrações', badge: '3 Apps' },
  { id: 'solucoes', label: 'Soluções' },
  { id: 'curriculo', label: 'Currículo', badge: 'CV' },
  { id: 'sobre', label: 'Sobre Mim' },
  { id: 'contato', label: 'Contato' }
];
