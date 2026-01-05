/**
 * CountryGrid - Componente de grilla de paises
 * 
 * Muestra los paises en una grilla de 3x4.
 * Este es un placeholder que sera completado en fases posteriores.
 */

import { BaseComponent } from '../base/base-component.js';

export class CountryGrid extends BaseComponent {
  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .grid-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2xl);
        font-family: var(--font-family);
        color: var(--color-text-muted);
        text-align: center;
        min-height: 400px;
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-md);
      }
      
      .placeholder-text {
        font-size: var(--font-size-lg);
      }
    `;
  }

  template() {
    return `
      <div class="grid-placeholder">
        <div class="placeholder-text">
          MainContent<br>
          <small>(Grilla de paises 3x4 - Pendiente)</small>
        </div>
      </div>
    `;
  }
}

customElements.define('country-grid', CountryGrid);
