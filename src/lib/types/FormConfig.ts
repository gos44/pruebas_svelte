export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string | number; label: string }[]; // Para select y radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  class?: string;
}

export interface FormConfig {
  title?: string;
  fields: FormField[];
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  class?: string;
}