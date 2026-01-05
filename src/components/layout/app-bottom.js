/**
 * AppBottom - Componente de pie de pagina
 * 
 * Contiene copyright, creditos del autor y enlaces adicionales.
 */

import { BaseComponent } from '../base/base-component.js';

export class AppBottom extends BaseComponent {
  styles() {
    return `
      ${this.getGlobalStyles()}
      
      :host {
        display: block;
        width: 100%;
      }
      
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md) var(--spacing-lg);
        font-family: var(--font-family);
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        background-color: var(--color-primary);
        min-height: 48px;
      }
      
      .bottom-left {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }
      
      .copyright {
        color: var(--color-text-inverse);
        opacity: 0.8;
      }
      
      .bottom-center {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .tech-stack {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--color-text-inverse);
        opacity: 0.6;
        font-size: var(--font-size-xs);
      }
      
      .tech-badge {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-sm);
      }
      
      .bottom-right {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .bottom-link {
        color: var(--color-text-inverse);
        opacity: 0.8;
        text-decoration: none;
        transition: opacity var(--transition-fast);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }
      
      .bottom-link:hover {
        opacity: 1;
      }
      
      .link-icon {
        width: 14px;
        height: 14px;
      }
      
      .separator {
        width: 1px;
        height: 12px;
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      @media (max-width: 768px) {
        .bottom {
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          text-align: center;
        }
        
        .bottom-center {
          order: 1;
        }
        
        .bottom-left {
          order: 2;
        }
        
        .bottom-right {
          order: 3;
        }
        
        .separator {
          display: none;
        }
      }
    `;
  }

  template() {
    const currentYear = new Date().getFullYear();

    return `
      <div class="bottom">
        <div class="bottom-left">
          <span class="copyright">${currentYear} Paises de America. Proyecto educativo.</span>
        </div>
        
        <div class="bottom-center">
          <div class="tech-stack">
            <span class="tech-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Vite
            </span>
            <span class="tech-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
              </svg>
              Web Components
            </span>
            <span class="tech-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v16H4V4m2 2v12h12V6H6z"/>
              </svg>
              CSS3
            </span>
          </div>
        </div>
        
        <div class="bottom-right">
          <a 
            href="https://github.com/kenssHC/PruebaEntelgy" 
            target="_blank" 
            rel="noopener noreferrer"
            class="bottom-link"
          >
            <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          
          <span class="separator"></span>
          
          <a 
            href="https://restcountries.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="bottom-link"
          >
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            API Docs
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('app-bottom', AppBottom);
