/**
 * FavoriteButton - Componente de boton de favorito
 * 
 * Boton reutilizable para marcar/desmarcar paises como favoritos.
 * Muestra una estrella que se llena cuando el pais es favorito.
 */

import { BaseComponent } from '../base/base-component.js';
import { stateService } from '../../services/state.service.js';

export class FavoriteButton extends BaseComponent {
  static get observedAttributes() {
    return ['code', 'size'];
  }

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

  attributeChangedCallback() {
    this.render();
  }

  get code() {
    return this.getAttribute('code') || '';
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  get isActive() {
    return stateService.isFavorite(this.code);
  }

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: inline-flex;
      }
      
      .favorite-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-full);
        transition: transform var(--transition-fast),
                    background-color var(--transition-fast);
      }
      
      .favorite-btn:hover {
        background-color: rgba(245, 158, 11, 0.1);
        transform: scale(1.1);
      }
      
      .favorite-btn:active {
        transform: scale(0.95);
      }
      
      .favorite-btn.active .star-icon {
        fill: var(--color-favorite);
        stroke: var(--color-favorite);
      }
      
      .favorite-btn.active {
        animation: popIn 0.3s ease;
      }
      
      .star-icon {
        fill: transparent;
        stroke: var(--color-text-muted);
        stroke-width: 2;
        transition: fill var(--transition-fast),
                    stroke var(--transition-fast);
      }
      
      .favorite-btn:hover .star-icon {
        stroke: var(--color-favorite);
      }
      
      /* Tamanos */
      .size-sm .star-icon {
        width: 16px;
        height: 16px;
      }
      
      .size-md .star-icon {
        width: 20px;
        height: 20px;
      }
      
      .size-lg .star-icon {
        width: 24px;
        height: 24px;
      }
      
      @keyframes popIn {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }
    `;
  }

  template() {
    const activeClass = this.isActive ? 'active' : '';
    const sizeClass = `size-${this.size}`;
    const title = this.isActive ? 'Quitar de favoritos' : 'Agregar a favoritos';

    return `
      <button 
        class="favorite-btn ${activeClass} ${sizeClass}" 
        title="${title}"
        aria-label="${title}"
        aria-pressed="${this.isActive}"
      >
        <svg class="star-icon" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>
    `;
  }

  afterRender() {
    const btn = this.shadowRoot.querySelector('.favorite-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.code) {
          stateService.toggleFavorite(this.code);
        }
      });
    }
  }
}

customElements.define('favorite-button', FavoriteButton);
