/**
 * AppTop - Componente de barra superior
 * 
 * Contiene navegacion secundaria, branding y enlaces utiles.
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
        justify-content: space-between;
        padding: var(--spacing-xs) var(--spacing-lg);
        font-family: var(--font-family);
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        background-color: var(--color-primary);
        min-height: 36px;
      }
      
      .top-left {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .top-right {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
      }
      
      .brand {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--color-text-inverse);
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-sm);
      }
      
      .brand-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-links {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .nav-link {
        color: var(--color-text-inverse);
        opacity: 0.8;
        text-decoration: none;
        transition: opacity var(--transition-fast);
        font-size: var(--font-size-xs);
      }
      
      .nav-link:hover {
        opacity: 1;
      }
      
      .separator {
        width: 1px;
        height: 12px;
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      .api-badge {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-full);
        color: var(--color-text-inverse);
        font-size: var(--font-size-xs);
      }
      
      .api-status {
        width: 6px;
        height: 6px;
        background-color: var(--color-success);
        border-radius: var(--radius-full);
        animation: pulse 2s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      @media (max-width: 600px) {
        .top-bar {
          padding: var(--spacing-xs) var(--spacing-md);
        }
        
        .nav-links {
          display: none;
        }
        
        .separator {
          display: none;
        }
      }
    `;
  }

  template() {
    return `
      <div class="top-bar">
        <div class="top-left">
          <div class="brand">
            <span class="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </span>
            <span>Paises de America</span>
          </div>
          
          <span class="separator"></span>
          
          <nav class="nav-links">
            <a href="#inicio" class="nav-link">Inicio</a>
            <a href="#favoritos" class="nav-link">Favoritos</a>
          </nav>
        </div>
        
        <div class="top-right">
          <div class="api-badge">
            <span class="api-status"></span>
            <span>REST Countries API</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-top', AppTop);
