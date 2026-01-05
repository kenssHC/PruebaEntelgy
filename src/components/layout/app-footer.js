/**
 * AppFooter - Componente de pie de seccion
 * 
 * Contiene informacion adicional util para el visitante.
 */

import { BaseComponent } from '../base/base-component.js';

export class AppFooter extends BaseComponent {
  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-md) var(--spacing-lg);
        font-family: var(--font-family);
        background-color: var(--color-surface);
        min-height: 60px;
      }
      
      .footer-content {
        text-align: center;
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
      }
    `;
  }

  template() {
    return `
      <div class="footer">
        <div class="footer-content">
          Footer
        </div>
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
