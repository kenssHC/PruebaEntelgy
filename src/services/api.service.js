/**
 * API Service - Servicio para consumir la API de REST Countries
 * 
 * Endpoint: https://restcountries.com/v3.1/region/ame
 * Documentacion: https://restcountries.com/
 */

const API_BASE_URL = 'https://restcountries.com/v3.1';
const REGION = 'ame';
const COUNTRIES_LIMIT = 12;

/**
 * Transforma los datos crudos de la API a un formato mas manejable
 * @param {Object} country - Datos crudos del pais desde la API
 * @returns {Object} Datos del pais formateados
 */
function transformCountryData(country) {
  return {
    // Identificador unico
    code: country.cca3,
    
    // Informacion basica
    name: country.name?.common || 'N/A',
    officialName: country.name?.official || 'N/A',
    capital: country.capital?.[0] || 'N/A',
    population: country.population || 0,
    
    // Ubicacion
    region: country.region || 'N/A',
    subregion: country.subregion || 'N/A',
    
    // Imagenes
    flag: country.flags?.svg || country.flags?.png || '',
    flagAlt: country.flags?.alt || `Bandera de ${country.name?.common}`,
    coatOfArms: country.coatOfArms?.svg || country.coatOfArms?.png || '',
    
    // Informacion adicional
    languages: country.languages ? Object.values(country.languages) : [],
    currencies: country.currencies 
      ? Object.values(country.currencies).map(c => ({
          name: c.name,
          symbol: c.symbol
        }))
      : [],
    
    // Geografia
    area: country.area || 0,
    borders: country.borders || [],
    timezones: country.timezones || [],
    
    // Otros datos de interes
    independent: country.independent || false,
    unMember: country.unMember || false,
    landlocked: country.landlocked || false,
    
    // Mapas
    googleMaps: country.maps?.googleMaps || '',
    openStreetMaps: country.maps?.openStreetMaps || ''
  };
}

/**
 * Servicio de API para paises
 */
export const CountryService = {
  /**
   * Obtiene la lista de paises de America (limitado a 12)
   * @returns {Promise<Array>} Lista de paises formateados
   */
  async getCountries() {
    try {
      const response = await fetch(`${API_BASE_URL}/region/${REGION}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ordenar por poblacion (de mayor a menor) y tomar los primeros 12
      const sortedCountries = data
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, COUNTRIES_LIMIT);
      
      // Transformar los datos
      return sortedCountries.map(transformCountryData);
      
    } catch (error) {
      console.error('CountryService.getCountries Error:', error);
      throw error;
    }
  },

  /**
   * Obtiene un pais especifico por su codigo
   * @param {string} code - Codigo del pais (cca3)
   * @returns {Promise<Object>} Datos del pais formateados
   */
  async getCountryByCode(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/alpha/${code}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // La API retorna un array, tomamos el primer elemento
      return transformCountryData(data[0]);
      
    } catch (error) {
      console.error('CountryService.getCountryByCode Error:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los paises de America (sin limite)
   * @returns {Promise<Array>} Lista completa de paises formateados
   */
  async getAllCountries() {
    try {
      const response = await fetch(`${API_BASE_URL}/region/${REGION}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .map(transformCountryData);
      
    } catch (error) {
      console.error('CountryService.getAllCountries Error:', error);
      throw error;
    }
  }
};

export default CountryService;
