// navbar.types.ts
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
}

export interface NavbarConfig {
  brand?: {
    text?: string;
    logo?: string;
    href?: string;
  };
  items: NavItem[];
  actions?: NavbarAction[];
  style?: 'default' | 'transparent' | 'colored';
  position?: 'static' | 'fixed' | 'sticky';
  showMobileMenu?: boolean;
}

export interface NavbarAction {
  id: string;
  type: 'button' | 'link';
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  icon?: string;
}