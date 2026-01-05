/**
 * CountryModal - Componente de modal para detalles de pais
 * 
 * Muestra informacion detallada de un pais seleccionado.
 * Este es un placeholder que sera completado en fases posteriores.
 */

import { BaseComponent } from '../base/base-component.js';

export class CountryModal extends BaseComponent {
  styles() {
    return `
      :host {
        display: none;
      }
    `;
  }

  template() {
    return `
      <!-- Modal sera implementado en fases posteriores -->
    `;
  }
}

customElements.define('country-modal', CountryModal);
