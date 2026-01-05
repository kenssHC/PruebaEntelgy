/**
 * AppTop - Componente de barra superior
 * 
 * Contiene navegacion secundaria o branding de la aplicacion.
 */

import { BaseComponent } from '../base/base-component.js';

export class AppTop extends BaseComponent {
  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .top-bar {
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
      
      .top-content {
        text-align: center;
      }
    `;
  }

  template() {
    return `
      <div class="top-bar">
        <div class="top-content">
          Top
        </div>
      </div>
    `;
  }
}

customElements.define('app-top', AppTop);
