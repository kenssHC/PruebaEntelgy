/**
 * CountryModal - Componente de modal para detalles de pais
 * 
 * Muestra informacion detallada de un pais seleccionado:
 * - Bandera y nombre
 * - Capital y poblacion
 * - Idiomas, monedas, zona horaria
 * - Otros datos de interes
 * - Opcion de marcar/desmarcar como favorito
 */

import { BaseComponent } from '../base/base-component.js';
import { stateService } from '../../services/state.service.js';

export class CountryModal extends BaseComponent {
  constructor() {
    super();
    this._unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribe = stateService.subscribe(() => {
      this.render();
    });
    
    // Cerrar modal con Escape
    this._handleKeyDown = (e) => {
      if (e.key === 'Escape' && stateService.isModalOpen()) {
        stateService.closeModal();
      }
    };
    document.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  /**
   * Formatea un numero con separadores de miles
   */
  formatNumber(num) {
    return new Intl.NumberFormat('es-ES').format(num);
  }

  /**
   * Formatea el area en km2
   */
  formatArea(area) {
    if (!area) return 'N/A';
    return `${this.formatNumber(area)} km2`;
  }

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
      }
      
      .overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--transition-normal),
                    visibility var(--transition-normal);
        padding: var(--spacing-md);
      }
      
      .overlay.open {
        opacity: 1;
        visibility: visible;
      }
      
      .modal {
        background-color: var(--color-surface);
        border-radius: var(--radius-xl);
        max-width: 560px;
        width: 100%;
        max-height: 90vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: scale(0.9) translateY(20px);
        transition: transform var(--transition-normal);
        box-shadow: var(--shadow-xl);
      }
      
      .overlay.open .modal {
        transform: scale(1) translateY(0);
      }
      
      .modal-header {
        position: relative;
        height: 200px;
        flex-shrink: 0;
        overflow: hidden;
      }
      
      .modal-flag {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .modal-header-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 50%, rgba(26, 26, 46, 0.8) 100%);
      }
      
      .close-btn {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        border: none;
        background-color: var(--color-surface);
        color: var(--color-text-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--transition-fast),
                    background-color var(--transition-fast);
        box-shadow: var(--shadow-md);
      }
      
      .close-btn:hover {
        transform: scale(1.1);
        background-color: var(--color-background);
      }
      
      .modal-country-name {
        position: absolute;
        bottom: var(--spacing-md);
        left: var(--spacing-lg);
        right: var(--spacing-lg);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-inverse);
        margin: 0;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
      
      .modal-body {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-lg);
      }
      
      .info-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .info-section:last-child {
        margin-bottom: 0;
      }
      
      .section-title {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--spacing-sm);
      }
      
      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
      }
      
      .info-item {
        padding: var(--spacing-sm) var(--spacing-md);
        background-color: var(--color-background);
        border-radius: var(--radius-md);
      }
      
      .info-item.full-width {
        grid-column: span 2;
      }
      
      .info-label {
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        margin-bottom: var(--spacing-xs);
      }
      
      .info-value {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }
      
      .info-value.highlight {
        color: var(--color-accent);
        font-size: var(--font-size-lg);
      }
      
      .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
      }
      
      .tag {
        display: inline-flex;
        align-items: center;
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: var(--color-background);
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
      
      .modal-footer {
        flex-shrink: 0;
        padding: var(--spacing-md) var(--spacing-lg);
        border-top: 1px solid var(--color-border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .favorite-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-md);
        border: 2px solid var(--color-favorite);
        background-color: transparent;
        color: var(--color-favorite);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: all var(--transition-fast);
      }
      
      .favorite-btn:hover {
        background-color: var(--color-favorite);
        color: var(--color-text-inverse);
      }
      
      .favorite-btn.active {
        background-color: var(--color-favorite);
        color: var(--color-text-inverse);
      }
      
      .favorite-btn.active:hover {
        background-color: transparent;
        color: var(--color-favorite);
      }
      
      .map-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        background-color: transparent;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
        text-decoration: none;
        transition: all var(--transition-fast);
      }
      
      .map-link:hover {
        background-color: var(--color-background);
        color: var(--color-text-primary);
        border-color: var(--color-text-muted);
      }
      
      @media (max-width: 600px) {
        .modal-header {
          height: 160px;
        }
        
        .modal-body {
          padding: var(--spacing-md);
        }
        
        .info-grid {
          grid-template-columns: 1fr;
        }
        
        .info-item.full-width {
          grid-column: span 1;
        }
        
        .modal-footer {
          flex-direction: column;
        }
        
        .favorite-btn,
        .map-link {
          width: 100%;
          justify-content: center;
        }
      }
    `;
  }

  template() {
    const isOpen = stateService.isModalOpen();
    const country = stateService.getSelectedCountry();

    if (!country) {
      return `<div class="overlay"></div>`;
    }

    const {
      code,
      name,
      officialName,
      capital,
      population,
      flag,
      flagAlt,
      region,
      subregion,
      languages,
      currencies,
      area,
      timezones,
      independent,
      unMember,
      landlocked,
      googleMaps
    } = country;

    const isFavorite = stateService.isFavorite(code);

    return `
      <div class="overlay ${isOpen ? 'open' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal">
          <div class="modal-header">
            <img 
              class="modal-flag" 
              src="${flag}" 
              alt="${flagAlt}"
            />
            <div class="modal-header-overlay"></div>
            <button class="close-btn" aria-label="Cerrar modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <h2 class="modal-country-name" id="modal-title">${name}</h2>
          </div>
          
          <div class="modal-body">
            <div class="info-section">
              <h3 class="section-title">Informacion General</h3>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Capital</div>
                  <div class="info-value highlight">${capital}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Poblacion</div>
                  <div class="info-value highlight">${this.formatNumber(population)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Region</div>
                  <div class="info-value">${region}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Subregion</div>
                  <div class="info-value">${subregion}</div>
                </div>
                <div class="info-item full-width">
                  <div class="info-label">Nombre Oficial</div>
                  <div class="info-value">${officialName}</div>
                </div>
              </div>
            </div>
            
            <div class="info-section">
              <h3 class="section-title">Datos de Interes</h3>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Area</div>
                  <div class="info-value">${this.formatArea(area)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Zona Horaria</div>
                  <div class="info-value">${timezones[0] || 'N/A'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Independiente</div>
                  <div class="info-value">${independent ? 'Si' : 'No'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Miembro ONU</div>
                  <div class="info-value">${unMember ? 'Si' : 'No'}</div>
                </div>
              </div>
            </div>
            
            ${languages.length > 0 ? `
              <div class="info-section">
                <h3 class="section-title">Idiomas</h3>
                <div class="tags-list">
                  ${languages.map(lang => `
                    <span class="tag">${lang}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            ${currencies.length > 0 ? `
              <div class="info-section">
                <h3 class="section-title">Monedas</h3>
                <div class="tags-list">
                  ${currencies.map(curr => `
                    <span class="tag">${curr.name} ${curr.symbol ? `(${curr.symbol})` : ''}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
          
          <div class="modal-footer">
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-code="${code}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              ${isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            </button>
            
            ${googleMaps ? `
              <a 
                href="${googleMaps}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="map-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Ver en Mapa
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  afterRender() {
    const overlay = this.shadowRoot.querySelector('.overlay');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const favoriteBtn = this.shadowRoot.querySelector('.favorite-btn');

    // Cerrar al hacer clic en overlay
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          stateService.closeModal();
        }
      });
    }

    // Boton cerrar
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        stateService.closeModal();
      });
    }

    // Boton favorito
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        const code = favoriteBtn.dataset.code;
        stateService.toggleFavorite(code);
      });
    }

    // Bloquear scroll del body cuando modal esta abierto
    if (stateService.isModalOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

customElements.define('country-modal', CountryModal);
