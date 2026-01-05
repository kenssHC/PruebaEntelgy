/**
 * FavoritesSection - Seccion de paises favoritos
 * 
 * Muestra los paises marcados como favoritos en una seccion dedicada.
 * Permite ver rapidamente los favoritos y acceder a sus detalles.
 */

import { BaseComponent } from '../base/base-component.js';
import { stateService } from '../../services/state.service.js';

export class FavoritesSection extends BaseComponent {
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

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .favorites-container {
        padding: var(--spacing-md);
        background-color: var(--color-surface);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border-light);
      }
      
      .favorites-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-sm);
        border-bottom: 1px solid var(--color-border-light);
      }
      
      .favorites-title {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        margin: 0;
      }
      
      .favorites-icon {
        width: 20px;
        height: 20px;
        color: var(--color-favorite);
      }
      
      .favorites-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 24px;
        padding: 0 var(--spacing-xs);
        background-color: var(--color-favorite);
        color: var(--color-text-inverse);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        border-radius: var(--radius-full);
      }
      
      .clear-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-xs) var(--spacing-sm);
        background: transparent;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        color: var(--color-text-secondary);
        font-size: var(--font-size-xs);
        cursor: pointer;
        transition: all var(--transition-fast);
      }
      
      .clear-btn:hover {
        background-color: var(--color-error);
        border-color: var(--color-error);
        color: var(--color-text-inverse);
      }
      
      .favorites-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--spacing-md);
      }
      
      .favorite-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-sm);
        background-color: var(--color-background);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        animation: fadeInUp 0.3s ease backwards;
      }
      
      .favorite-item:hover {
        background-color: var(--color-border-light);
        transform: translateX(4px);
      }
      
      .favorite-flag {
        width: 48px;
        height: 32px;
        object-fit: cover;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-sm);
      }
      
      .favorite-info {
        flex: 1;
        min-width: 0;
      }
      
      .favorite-name {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .favorite-capital {
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        margin: 0;
      }
      
      .remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: transparent;
        border: none;
        border-radius: var(--radius-full);
        color: var(--color-text-muted);
        cursor: pointer;
        transition: all var(--transition-fast);
        flex-shrink: 0;
      }
      
      .remove-btn:hover {
        background-color: var(--color-error);
        color: var(--color-text-inverse);
      }
      
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-xl);
        text-align: center;
        color: var(--color-text-muted);
      }
      
      .empty-icon {
        width: 48px;
        height: 48px;
        margin-bottom: var(--spacing-md);
        opacity: 0.5;
      }
      
      .empty-text {
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .empty-hint {
        font-size: var(--font-size-xs);
        margin-top: var(--spacing-xs);
        opacity: 0.7;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @media (max-width: 600px) {
        .favorites-grid {
          grid-template-columns: 1fr;
        }
        
        .favorites-header {
          flex-direction: column;
          align-items: flex-start;
          gap: var(--spacing-sm);
        }
      }
    `;
  }

  template() {
    const favoriteCountries = stateService.getFavoriteCountries();
    const count = favoriteCountries.length;

    return `
      <div class="favorites-container">
        <div class="favorites-header">
          <h3 class="favorites-title">
            <svg class="favorites-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Mis Favoritos
            <span class="favorites-count">${count}</span>
          </h3>
          
          ${count > 0 ? `
            <button class="clear-btn" title="Limpiar todos los favoritos">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Limpiar
            </button>
          ` : ''}
        </div>
        
        ${count > 0 ? `
          <div class="favorites-grid">
            ${favoriteCountries.map((country, index) => `
              <div class="favorite-item" data-code="${country.code}" style="animation-delay: ${index * 50}ms">
                <img 
                  class="favorite-flag" 
                  src="${country.flag}" 
                  alt="Bandera de ${country.name}"
                  loading="lazy"
                />
                <div class="favorite-info">
                  <p class="favorite-name">${country.name}</p>
                  <p class="favorite-capital">${country.capital}</p>
                </div>
                <button class="remove-btn" data-code="${country.code}" title="Quitar de favoritos">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <p class="empty-text">No tienes paises favoritos</p>
            <p class="empty-hint">Haz clic en la estrella de un pais para agregarlo</p>
          </div>
        `}
      </div>
    `;
  }

  afterRender() {
    // Handler para items de favoritos (abrir modal)
    const items = this.shadowRoot.querySelectorAll('.favorite-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        // No abrir modal si se hizo clic en el boton de remover
        if (e.target.closest('.remove-btn')) return;
        
        const code = item.dataset.code;
        const country = stateService.getCountries().find(c => c.code === code);
        if (country) {
          stateService.openModal(country);
        }
      });
    });

    // Handler para botones de remover
    const removeButtons = this.shadowRoot.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.dataset.code;
        stateService.removeFavorite(code);
      });
    });

    // Handler para boton de limpiar todos
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Estas seguro de eliminar todos los favoritos?')) {
          stateService.clearFavorites();
        }
      });
    }
  }
}

customElements.define('favorites-section', FavoritesSection);
