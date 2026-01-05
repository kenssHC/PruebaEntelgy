/**
 * AppHeader - Componente de encabezado principal
 * 
 * Contiene el titulo de la aplicacion, descripcion y 
 * seccion de paises favoritos.
 */

import { BaseComponent } from '../base/base-component.js';
import { stateService } from '../../services/state.service.js';

export class AppHeader extends BaseComponent {
  constructor() {
    super();
    this._unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Suscribirse a cambios de estado para actualizar favoritos
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

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .header {
        padding: var(--spacing-lg) var(--spacing-lg);
        font-family: var(--font-family);
        background-color: var(--color-surface);
      }
      
      .header-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }
      
      .header-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--spacing-lg);
      }
      
      .header-info {
        flex: 1;
      }
      
      .header-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
        line-height: 1.2;
      }
      
      .header-subtitle {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        margin: 0;
        max-width: 600px;
        line-height: 1.5;
      }
      
      .favorites-section {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--spacing-sm);
      }
      
      .favorites-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
      
      .favorites-icon {
        width: 16px;
        height: 16px;
        color: var(--color-favorite);
      }
      
      .favorites-count {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 32px;
        padding: 0 var(--spacing-sm);
        background-color: var(--color-favorite);
        color: var(--color-text-inverse);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        border-radius: var(--radius-full);
      }
      
      .favorites-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        justify-content: flex-end;
        max-width: 300px;
      }
      
      .favorite-flag {
        width: 32px;
        height: 24px;
        border-radius: var(--radius-sm);
        object-fit: cover;
        border: 1px solid var(--color-border);
        transition: transform var(--transition-fast);
        cursor: pointer;
      }
      
      .favorite-flag:hover {
        transform: scale(1.15);
        z-index: 1;
      }
      
      .no-favorites {
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        font-style: italic;
      }
      
      @media (max-width: 768px) {
        .header {
          padding: var(--spacing-md);
        }
        
        .header-main {
          flex-direction: column;
          align-items: stretch;
        }
        
        .header-title {
          font-size: var(--font-size-2xl);
        }
        
        .favorites-section {
          align-items: flex-start;
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-border-light);
        }
        
        .favorites-list {
          justify-content: flex-start;
          max-width: none;
        }
      }
    `;
  }

  template() {
    const favoriteCountries = stateService.getFavoriteCountries();
    const favoriteCount = stateService.getFavorites().length;

    return `
      <div class="header">
        <div class="header-content">
          <div class="header-main">
            <div class="header-info">
              <h1 class="header-title">Explora los Paises de America</h1>
              <p class="header-subtitle">
                Descubre informacion sobre capitales, poblacion y datos de interes 
                de los 12 paises mas poblados del continente americano.
              </p>
            </div>
            
            <div class="favorites-section" id="favoritos">
              <div class="favorites-label">
                <svg class="favorites-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Favoritos</span>
                <span class="favorites-count">${favoriteCount}</span>
              </div>
              
              ${favoriteCountries.length > 0 ? `
                <div class="favorites-list">
                  ${favoriteCountries.map(country => `
                    <img 
                      class="favorite-flag" 
                      src="${country.flag}" 
                      alt="${country.name}"
                      title="${country.name}"
                      data-code="${country.code}"
                    />
                  `).join('')}
                </div>
              ` : `
                <span class="no-favorites">No hay paises favoritos</span>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    // Agregar click handlers a las banderas de favoritos
    const flags = this.shadowRoot.querySelectorAll('.favorite-flag');
    flags.forEach(flag => {
      flag.addEventListener('click', () => {
        const code = flag.dataset.code;
        const country = stateService.getCountries().find(c => c.code === code);
        if (country) {
          stateService.openModal(country);
        }
      });
    });
  }
}

customElements.define('app-header', AppHeader);
