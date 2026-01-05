/**
 * AppFooter - Componente de pie de seccion
 * 
 * Contiene estadisticas de los paises, informacion adicional
 * y creditos de la API utilizada.
 */

import { BaseComponent } from '../base/base-component.js';
import { stateService } from '../../services/state.service.js';

export class AppFooter extends BaseComponent {
  constructor() {
    super();
    this._unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribe = stateService.subscribe(() => {
      this.render();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  /**
   * Formatea un numero grande con separadores de miles
   */
  formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .footer {
        padding: var(--spacing-lg);
        font-family: var(--font-family);
        background-color: var(--color-surface);
      }
      
      .footer-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }
      
      .stats-section {
        display: flex;
        justify-content: center;
        gap: var(--spacing-xl);
        padding: var(--spacing-md) 0;
      }
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-md) var(--spacing-lg);
        background-color: var(--color-background);
        border-radius: var(--radius-lg);
        min-width: 140px;
      }
      
      .stat-value {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-accent);
      }
      
      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        text-align: center;
      }
      
      .info-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--spacing-md);
        border-top: 1px solid var(--color-border-light);
      }
      
      .api-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .api-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
      
      .api-link {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: var(--font-weight-medium);
        transition: opacity var(--transition-fast);
      }
      
      .api-link:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
      
      .region-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
      
      .region-icon {
        width: 18px;
        height: 18px;
        color: var(--color-text-secondary);
      }
      
      @media (max-width: 768px) {
        .footer {
          padding: var(--spacing-md);
        }
        
        .stats-section {
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }
        
        .stat-item {
          flex: 1;
          min-width: 100px;
          padding: var(--spacing-sm) var(--spacing-md);
        }
        
        .stat-value {
          font-size: var(--font-size-xl);
        }
        
        .info-section {
          flex-direction: column;
          gap: var(--spacing-md);
          text-align: center;
        }
      }
    `;
  }

  template() {
    const stats = stateService.getStats();

    return `
      <div class="footer">
        <div class="footer-content">
          <div class="stats-section">
            <div class="stat-item">
              <span class="stat-value">${stats.totalCountries}</span>
              <span class="stat-label">Paises mostrados</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${stats.totalFavorites}</span>
              <span class="stat-label">Favoritos guardados</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.formatNumber(stats.totalPopulation)}</span>
              <span class="stat-label">Poblacion total</span>
            </div>
          </div>
          
          <div class="info-section">
            <div class="api-info">
              <span class="api-text">Datos proporcionados por</span>
              <a 
                href="https://restcountries.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="api-link"
              >
                REST Countries API
              </a>
            </div>
            
            <div class="region-info">
              <svg class="region-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Region: Americas</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
