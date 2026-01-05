/**
 * BaseComponent - Clase base para todos los Web Components
 * 
 * Proporciona una estructura comun para la creacion de componentes
 * con Shadow DOM, estilos encapsulados y ciclo de vida.
 */

export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Callback cuando el componente se conecta al DOM
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Callback cuando el componente se desconecta del DOM
   */
  disconnectedCallback() {
    // Limpieza de event listeners si es necesario
  }

  /**
   * Renderiza el componente en el Shadow DOM
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles()}</style>
      ${this.template()}
    `;
    this.afterRender();
  }

  /**
   * Retorna los estilos CSS del componente
   * @returns {string} CSS como string
   */
  styles() {
    return '';
  }

  /**
   * Retorna el template HTML del componente
   * @returns {string} HTML como string
   */
  template() {
    return '';
  }

  /**
   * Se ejecuta despues del render para agregar event listeners
   */
  afterRender() {
    // Sobreescribir en componentes hijos
  }

  /**
   * Obtiene las variables CSS del documento principal
   * para usar en el Shadow DOM
   */
  getGlobalStyles() {
    return `
      :host {
        --color-background: #F8F9FA;
        --color-surface: #FFFFFF;
        --color-primary: #1A1A2E;
        --color-secondary: #16213E;
        --color-accent: #E94560;
        --color-accent-hover: #D13A54;
        --color-text-primary: #1A1A2E;
        --color-text-secondary: #4A4A68;
        --color-text-muted: #8888A0;
        --color-text-inverse: #FFFFFF;
        --color-border: #E8E8EC;
        --color-favorite: #F59E0B;
        --shadow-sm: 0 1px 3px rgba(26, 26, 46, 0.08);
        --shadow-md: 0 4px 12px rgba(26, 26, 46, 0.12);
        --shadow-lg: 0 8px 24px rgba(26, 26, 46, 0.16);
        --spacing-xs: 0.25rem;
        --spacing-sm: 0.5rem;
        --spacing-md: 1rem;
        --spacing-lg: 1.5rem;
        --spacing-xl: 2rem;
        --font-family: 'DM Sans', system-ui, sans-serif;
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 2rem;
        --font-weight-normal: 400;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 12px;
        --radius-full: 9999px;
        --transition-fast: 150ms ease;
        --transition-normal: 250ms ease;
        --transition-slow: 350ms ease;
      }
    `;
  }
}
