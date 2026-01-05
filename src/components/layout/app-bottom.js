/**
 * AppBottom - Componente de pie de pagina
 * 
 * Contiene creditos, copyright y enlaces adicionales.
 */

import { BaseComponent } from '../base/base-component.js';

export class AppBottom extends BaseComponent {
  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-sm) var(--spacing-lg);
        font-family: var(--font-family);
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        background-color: var(--color-surface);
        min-height: 40px;
      }
      
      .bottom-content {
        text-align: center;
      }
    `;
  }

  template() {
    return `
      <div class="bottom">
        <div class="bottom-content">
          Bottom
        </div>
      </div>
    `;
  }
}

customElements.define('app-bottom', AppBottom);
