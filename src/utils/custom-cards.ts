export interface RegisterCardParams {
  type: string;
  name: string;
  description?: string;
}

declare global {
  interface Window {
    customCards?: Array<RegisterCardParams>;
  }
}

export function registerCustomCard(params: RegisterCardParams): void {
  if (!window.customCards) {
    window.customCards = [];
  }
  window.customCards.push(params);
}
