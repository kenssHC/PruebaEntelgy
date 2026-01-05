/**
 * State Service - Servicio de estado global de la aplicacion
 * 
 * Maneja el estado de:
 * - Lista de paises
 * - Paises favoritos (con persistencia en localStorage)
 * - Estado de carga
 * - Pais seleccionado para el modal
 * 
 * Implementa un patron de suscripcion (Observer) para notificar
 * cambios a los componentes interesados.
 */

const STORAGE_KEY = 'paises_favoritos';

/**
 * Clase que maneja el estado global de la aplicacion
 */
class StateService {
  constructor() {
    // Estado inicial
    this.state = {
      countries: [],
      favorites: this._loadFavorites(),
      loading: false,
      error: null,
      selectedCountry: null,
      modalOpen: false
    };
    
    // Listeners para el patron Observer
    this._listeners = new Map();
    this._listenerId = 0;
  }

  // ============================================
  // PERSISTENCIA EN LOCALSTORAGE
  // ============================================

  /**
   * Carga los favoritos desde localStorage
   * @private
   * @returns {Array} Lista de codigos de paises favoritos
   */
  _loadFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      return [];
    }
  }

  /**
   * Guarda los favoritos en localStorage
   * @private
   */
  _saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.favorites));
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }

  // ============================================
  // PATRON OBSERVER - SUSCRIPCIONES
  // ============================================

  /**
   * Suscribe un callback para recibir cambios de estado
   * @param {Function} callback - Funcion que recibe el estado actualizado
   * @returns {Function} Funcion para cancelar la suscripcion
   */
  subscribe(callback) {
    const id = ++this._listenerId;
    this._listeners.set(id, callback);
    
    // Retorna funcion para cancelar suscripcion
    return () => {
      this._listeners.delete(id);
    };
  }

  /**
   * Notifica a todos los suscriptores sobre cambios de estado
   * @private
   */
  _notify() {
    const stateCopy = { ...this.state };
    this._listeners.forEach(callback => {
      try {
        callback(stateCopy);
      } catch (error) {
        console.error('Error en listener de estado:', error);
      }
    });
  }

  // ============================================
  // GETTERS DE ESTADO
  // ============================================

  /**
   * Obtiene el estado actual
   * @returns {Object} Estado actual
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Obtiene la lista de paises
   * @returns {Array} Lista de paises
   */
  getCountries() {
    return [...this.state.countries];
  }

  /**
   * Obtiene la lista de codigos de paises favoritos
   * @returns {Array} Lista de codigos
   */
  getFavorites() {
    return [...this.state.favorites];
  }

  /**
   * Obtiene los paises marcados como favoritos
   * @returns {Array} Lista de paises favoritos
   */
  getFavoriteCountries() {
    return this.state.countries.filter(country => 
      this.state.favorites.includes(country.code)
    );
  }

  /**
   * Verifica si un pais esta marcado como favorito
   * @param {string} code - Codigo del pais
   * @returns {boolean} True si es favorito
   */
  isFavorite(code) {
    return this.state.favorites.includes(code);
  }

  /**
   * Obtiene el pais seleccionado actualmente
   * @returns {Object|null} Pais seleccionado
   */
  getSelectedCountry() {
    return this.state.selectedCountry;
  }

  /**
   * Verifica si el modal esta abierto
   * @returns {boolean} True si esta abierto
   */
  isModalOpen() {
    return this.state.modalOpen;
  }

  /**
   * Verifica si esta cargando datos
   * @returns {boolean} True si esta cargando
   */
  isLoading() {
    return this.state.loading;
  }

  /**
   * Obtiene el error actual si existe
   * @returns {string|null} Mensaje de error
   */
  getError() {
    return this.state.error;
  }

  // ============================================
  // SETTERS DE ESTADO
  // ============================================

  /**
   * Establece la lista de paises
   * @param {Array} countries - Lista de paises
   */
  setCountries(countries) {
    this.state.countries = countries;
    this._notify();
  }

  /**
   * Establece el estado de carga
   * @param {boolean} loading - Estado de carga
   */
  setLoading(loading) {
    this.state.loading = loading;
    this._notify();
  }

  /**
   * Establece un error
   * @param {string|null} error - Mensaje de error
   */
  setError(error) {
    this.state.error = error;
    this._notify();
  }

  // ============================================
  // ACCIONES DE FAVORITOS
  // ============================================

  /**
   * Alterna el estado de favorito de un pais
   * @param {string} code - Codigo del pais
   */
  toggleFavorite(code) {
    const index = this.state.favorites.indexOf(code);
    
    if (index > -1) {
      // Quitar de favoritos
      this.state.favorites.splice(index, 1);
    } else {
      // Agregar a favoritos
      this.state.favorites.push(code);
    }
    
    this._saveFavorites();
    this._notify();
  }

  /**
   * Agrega un pais a favoritos
   * @param {string} code - Codigo del pais
   */
  addFavorite(code) {
    if (!this.state.favorites.includes(code)) {
      this.state.favorites.push(code);
      this._saveFavorites();
      this._notify();
    }
  }

  /**
   * Quita un pais de favoritos
   * @param {string} code - Codigo del pais
   */
  removeFavorite(code) {
    const index = this.state.favorites.indexOf(code);
    if (index > -1) {
      this.state.favorites.splice(index, 1);
      this._saveFavorites();
      this._notify();
    }
  }

  /**
   * Limpia todos los favoritos
   */
  clearFavorites() {
    this.state.favorites = [];
    this._saveFavorites();
    this._notify();
  }

  // ============================================
  // ACCIONES DEL MODAL
  // ============================================

  /**
   * Abre el modal con un pais seleccionado
   * @param {Object} country - Pais a mostrar en el modal
   */
  openModal(country) {
    this.state.selectedCountry = country;
    this.state.modalOpen = true;
    this._notify();
  }

  /**
   * Cierra el modal
   */
  closeModal() {
    this.state.modalOpen = false;
    this.state.selectedCountry = null;
    this._notify();
  }

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Reinicia el estado a los valores iniciales
   */
  reset() {
    this.state = {
      countries: [],
      favorites: this._loadFavorites(),
      loading: false,
      error: null,
      selectedCountry: null,
      modalOpen: false
    };
    this._notify();
  }

  /**
   * Obtiene estadisticas del estado actual
   * @returns {Object} Estadisticas
   */
  getStats() {
    return {
      totalCountries: this.state.countries.length,
      totalFavorites: this.state.favorites.length,
      totalPopulation: this.state.countries.reduce(
        (sum, country) => sum + (country.population || 0), 
        0
      )
    };
  }
}

// Exportar instancia singleton
export const stateService = new StateService();

export default stateService;
