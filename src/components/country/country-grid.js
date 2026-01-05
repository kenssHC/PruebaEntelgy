/**
 * CountryGrid - Componente de grilla de paises
 * 
 * Muestra los paises en una grilla de 3 columnas x 4 filas.
 * Consume la API de REST Countries y maneja estados de carga y error.
 */

import { BaseComponent } from '../base/base-component.js';
import { CountryService } from '../../services/api.service.js';
import { stateService } from '../../services/state.service.js';
import './country-card.js';

export class CountryGrid extends BaseComponent {
  constructor() {
    super();
    this.countries = [];
    this.loading = true;
    this.error = null;
  }

  async connectedCallback() {
    this.renderLoading();
    await this.loadCountries();
  }

  /**
   * Carga los paises desde la API
   */
  async loadCountries() {
    try {
      this.loading = true;
      this.error = null;
      stateService.setLoading(true);
      
      this.countries = await CountryService.getCountries();
      stateService.setCountries(this.countries);
      
      this.loading = false;
      stateService.setLoading(false);
      this.render();
      
    } catch (error) {
      console.error('Error al cargar paises:', error);
      this.error = 'No se pudieron cargar los paises. Por favor, intenta nuevamente.';
      this.loading = false;
      stateService.setLoading(false);
      stateService.setError(this.error);
      this.render();
    }
  }

  /**
   * Renderiza el estado de carga con skeleton loaders
   */
  renderLoading() {
    const skeletonCards = Array(12).fill(0).map((_, i) => `
      <div class="skeleton-card" style="animation-delay: ${i * 50}ms">
        <div class="skeleton skeleton-flag"></div>
        <div class="skeleton-body">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
      </div>
    `).join('');

    this.shadowRoot.innerHTML = `
      <style>${this.styles()}</style>
      <div class="grid">
        ${skeletonCards}
      </div>
    `;
  }

  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
        padding: var(--spacing-sm);
      }
      
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2xl);
        min-height: 400px;
        gap: var(--spacing-lg);
      }
      
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid var(--color-border);
        border-top-color: var(--color-accent);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      
      .loading-text {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        margin: 0;
      }
      
      .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2xl);
        min-height: 400px;
        gap: var(--spacing-lg);
        text-align: center;
      }
      
      .error-icon {
        width: 64px;
        height: 64px;
        color: var(--color-error);
      }
      
      .error-message {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        margin: 0;
        max-width: 400px;
      }
      
      .retry-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-lg);
        background-color: var(--color-accent);
        color: var(--color-text-inverse);
        border: none;
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: background-color var(--transition-fast),
                    transform var(--transition-fast);
      }
      
      .retry-btn:hover {
        background-color: var(--color-accent-hover);
        transform: translateY(-2px);
      }
      
      .retry-btn:active {
        transform: translateY(0);
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Skeleton Loaders */
      .skeleton-card {
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        animation: fadeIn 0.3s ease backwards;
      }
      
      .skeleton {
        background: linear-gradient(
          90deg,
          var(--color-background) 25%,
          var(--color-border-light) 50%,
          var(--color-background) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
      
      .skeleton-flag {
        height: 140px;
        border-radius: 0;
      }
      
      .skeleton-body {
        padding: var(--spacing-md);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .skeleton-title {
        height: 24px;
        width: 70%;
        border-radius: var(--radius-sm);
      }
      
      .skeleton-text {
        height: 16px;
        width: 100%;
        border-radius: var(--radius-sm);
      }
      
      .skeleton-text.short {
        width: 50%;
      }
      
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Responsive: 2 columnas en tablet */
      @media (max-width: 900px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
        }
      }
      
      /* Responsive: 1 columna en movil */
      @media (max-width: 600px) {
        .grid {
          grid-template-columns: 1fr;
          gap: var(--spacing-md);
          padding: var(--spacing-xs);
        }
      }
    `;
  }

  template() {
    // Estado de error
    if (this.error) {
      return `
        <div class="error-container">
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p class="error-message">${this.error}</p>
          <button class="retry-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6"/>
              <path d="M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Reintentar
          </button>
        </div>
      `;
    }

    // Estado con datos
    return `
      <div class="grid">
        ${this.countries.map((country, index) => `
          <country-card 
            country-data='${JSON.stringify(country).replace(/'/g, "&#39;")}'
            style="animation-delay: ${index * 50}ms"
          ></country-card>
        `).join('')}
      </div>
    `;
  }

  afterRender() {
    // Handler para boton de reintentar
    const retryBtn = this.shadowRoot.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.renderLoading();
        this.loadCountries();
      });
    }
  }
}

customElements.define('country-grid', CountryGrid);
