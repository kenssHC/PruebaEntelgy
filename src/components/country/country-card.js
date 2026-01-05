/**
 * CountryCard - Componente de tarjeta de pais
 * 
 * Muestra la informacion basica de un pais:
 * - Bandera
 * - Nombre (clickeable para abrir modal)
 * - Capital
 * - Poblacion
 * - Boton de favorito
 */

import { BaseComponent } from '../base/base-component.js';
import { stateService } from '../../services/state.service.js';
import './favorite-button.js';

export class CountryCard extends BaseComponent {
  static get observedAttributes() {
    return ['country-data'];
  }

  attributeChangedCallback() {
    this.render();
  }

  get country() {
    const data = this.getAttribute('country-data');
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing country data:', e);
      return null;
    }
  }

  /**
   * Formatea la poblacion con separadores de miles
   */
  formatPopulation(population) {
    return new Intl.NumberFormat('es-ES').format(population);
  }

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        height: 100%;
      }
      
      .card {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        transition: transform var(--transition-normal),
                    box-shadow var(--transition-normal);
        animation: fadeInUp 0.4s ease backwards;
      }
      
      .card:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
      }
      
      .flag-container {
        position: relative;
        height: 140px;
        overflow: hidden;
        background-color: var(--color-background);
      }
      
      .flag {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
      }
      
      .card:hover .flag {
        transform: scale(1.08);
      }
      
      .favorite-wrapper {
        position: absolute;
        top: var(--spacing-sm);
        right: var(--spacing-sm);
        background: var(--color-surface);
        border-radius: var(--radius-full);
        padding: 2px;
        box-shadow: var(--shadow-md);
      }
      
      .card-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: var(--spacing-md);
        gap: var(--spacing-sm);
      }
      
      .country-name {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        margin: 0;
        cursor: pointer;
        transition: color var(--transition-fast);
        line-height: 1.3;
      }
      
      .country-name:hover {
        color: var(--color-accent);
      }
      
      .info-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        margin-top: auto;
      }
      
      .info-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
      
      .info-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        color: var(--color-text-muted);
      }
      
      .info-label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text-muted);
        min-width: 60px;
      }
      
      .info-value {
        color: var(--color-text-primary);
      }
      
      .region-badge {
        display: inline-flex;
        align-items: center;
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: var(--color-background);
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-sm);
        align-self: flex-start;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @media (max-width: 480px) {
        .flag-container {
          height: 120px;
        }
        
        .card-body {
          padding: var(--spacing-sm);
        }
        
        .country-name {
          font-size: var(--font-size-base);
        }
      }
    `;
  }

  template() {
    if (!this.country) {
      return `<div class="card"><div class="card-body">Cargando...</div></div>`;
    }

    const { code, name, capital, population, flag, flagAlt, subregion } = this.country;

    return `
      <article class="card">
        <div class="flag-container">
          <img 
            class="flag" 
            src="${flag}" 
            alt="${flagAlt}"
            loading="lazy"
          />
          <div class="favorite-wrapper">
            <favorite-button code="${code}" size="md"></favorite-button>
          </div>
        </div>
        
        <div class="card-body">
          <h3 class="country-name" data-code="${code}" tabindex="0" role="button">
            ${name}
          </h3>
          
          <div class="info-list">
            <div class="info-item">
              <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>
                <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
              </svg>
              <span class="info-label">Capital:</span>
              <span class="info-value">${capital}</span>
            </div>
            
            <div class="info-item">
              <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span class="info-label">Poblacion:</span>
              <span class="info-value">${this.formatPopulation(population)}</span>
            </div>
          </div>
          
          ${subregion ? `
            <span class="region-badge">${subregion}</span>
          ` : ''}
        </div>
      </article>
    `;
  }

  afterRender() {
    const nameEl = this.shadowRoot.querySelector('.country-name');
    if (nameEl && this.country) {
      // Click handler
      nameEl.addEventListener('click', () => {
        stateService.openModal(this.country);
      });
      
      // Keyboard handler para accesibilidad
      nameEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          stateService.openModal(this.country);
        }
      });
    }
  }
}

customElements.define('country-card', CountryCard);
