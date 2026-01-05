/**
 * AppHeader - Componente de encabezado principal
 * 
 * Contiene el titulo de la aplicacion y navegacion principal.
 */

import { BaseComponent } from '../base/base-component.js';

export class AppHeader extends BaseComponent {
  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-md) var(--spacing-lg);
        font-family: var(--font-family);
        background-color: var(--color-surface);
        min-height: 60px;
      }
      
      .header-content {
        text-align: center;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }
    `;
  }

  template() {
    return `
      <div class="header">
        <div class="header-content">
          Header
        </div>
      </div>
    `;
  }
}

customElements.define('app-header', AppHeader);
