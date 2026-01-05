# Paises de America - Web Application

Aplicacion web que muestra informacion de 12 paises de America utilizando
Web Components nativos y CSS3. Consume la API REST Countries para obtener
datos actualizados de capitales, poblacion y otros datos de interes.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalacion](#instalacion)
3. [Ejecucion](#ejecucion)
4. [Construccion para Produccion](#construccion-para-produccion)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Arquitectura](#arquitectura)
7. [Funcionalidades](#funcionalidades)
8. [Tecnologias Utilizadas](#tecnologias-utilizadas)
9. [API Utilizada](#api-utilizada)
10. [Navegadores Soportados](#navegadores-soportados)

## Requisitos

- Node.js >= 18.0.0 (recomendado v20.x o superior)
- npm >= 9.0.0

Para verificar las versiones instaladas:

```bash
node --version
npm --version
```

## Instalacion

1. Clonar el repositorio:

```bash
git clone https://github.com/kenssHC/PruebaEntelgy.git
cd PruebaEntelgy
```

2. Instalar dependencias:

```bash
npm install
```

## Ejecucion

Para ejecutar la aplicacion en modo desarrollo:

```bash
npm run dev
```

La aplicacion estara disponible en: http://localhost:5173

El servidor de desarrollo incluye:
- Hot Module Replacement (HMR) para recarga en caliente
- Soporte para ES Modules
- Compilacion rapida con Vite

## Construccion para Produccion

Para generar los archivos optimizados para produccion:

```bash
npm run build
```

Los archivos se generaran en la carpeta `dist/`

Para previsualizar la build de produccion:

```bash
npm run preview
```

## Estructura del Proyecto

```
PruebaEntelgy/
|-- index.html                 # Documento HTML principal
|-- package.json               # Dependencias y scripts
|-- vite.config.js             # Configuracion de Vite (si existe)
|-- README.md                  # Documentacion del proyecto
|
|-- src/
|   |-- main.js                # Punto de entrada de la aplicacion
|   |
|   |-- components/
|   |   |-- base/
|   |   |   |-- base-component.js    # Clase base para Web Components
|   |   |
|   |   |-- layout/
|   |   |   |-- app-top.js           # Barra superior con navegacion
|   |   |   |-- app-header.js        # Encabezado con titulo y favoritos
|   |   |   |-- app-footer.js        # Pie con estadisticas
|   |   |   |-- app-bottom.js        # Pie de pagina con creditos
|   |   |
|   |   |-- country/
|   |       |-- country-grid.js      # Grilla 3x4 de paises
|   |       |-- country-card.js      # Tarjeta individual de pais
|   |       |-- country-modal.js     # Modal de detalles
|   |       |-- favorite-button.js   # Boton de favorito
|   |       |-- favorites-section.js # Seccion de favoritos
|   |
|   |-- services/
|   |   |-- index.js                 # Exportaciones de servicios
|   |   |-- api.service.js           # Consumo de REST Countries API
|   |   |-- state.service.js         # Estado global y favoritos
|   |
|   |-- styles/
|       |-- main.css                 # Estilos principales e imports
|       |-- variables.css            # Variables CSS del sistema
|       |-- layout.css               # Estilos del layout
|       |-- animations.css           # Animaciones CSS
|       |-- utilities.css            # Clases utilitarias
|       |-- components.css           # Estilos de componentes UI
```

## Arquitectura

La aplicacion sigue una arquitectura basada en Web Components nativos:

### Patron de Componentes

- **BaseComponent**: Clase base que extiende HTMLElement y proporciona
  Shadow DOM, metodos de renderizado y ciclo de vida.
  
- **Componentes de Layout**: Definen la estructura visual de la pagina
  (Top, Header, Content, Footer, Bottom).
  
- **Componentes de Negocio**: Manejan la logica de paises y favoritos.

### Patron de Estado

- **StateService**: Implementa el patron Observer para manejar el estado
  global de la aplicacion. Notifica a los componentes suscritos cuando
  hay cambios en los datos.

- **Persistencia**: Los favoritos se guardan en localStorage para
  mantenerlos entre sesiones.

### Flujo de Datos

1. La aplicacion carga y solicita datos a REST Countries API
2. Los datos se transforman y almacenan en StateService
3. Los componentes suscritos se actualizan automaticamente
4. Las interacciones del usuario modifican el estado
5. Los cambios se reflejan en todos los componentes suscritos

## Funcionalidades

### Lista de Paises
- Muestra 12 paises de America ordenados por poblacion
- Grilla responsive de 3x4 (adaptable a 2 y 1 columna)
- Skeleton loaders durante la carga
- Manejo de errores con opcion de reintentar

### Tarjetas de Pais
- Bandera del pais con efecto hover
- Nombre, capital y poblacion
- Indicador de subregion
- Boton de favorito integrado

### Modal de Detalles
- Se abre al hacer clic en el nombre del pais
- Muestra informacion completa:
  - Nombre oficial
  - Capital y poblacion
  - Region y subregion
  - Area y zona horaria
  - Idiomas y monedas
  - Estado de independencia y membresia ONU
- Enlace a Google Maps
- Opcion de agregar/quitar de favoritos
- Cierre con clic fuera, boton X o tecla Escape

### Sistema de Favoritos
- Marcar/desmarcar paises como favoritos
- Seccion dedicada para ver todos los favoritos
- Persistencia en localStorage
- Visualizacion de banderas en el header
- Opcion de limpiar todos los favoritos

### Navegacion
- Barra superior con enlaces a Inicio y Favoritos
- Scroll suave entre secciones
- Indicador de estado de la API

### Animaciones
- Animaciones de entrada stagger en la grilla
- Transiciones suaves en hover
- Skeleton loaders animados
- Animaciones del modal
- Respeto a preferencias de movimiento reducido

## Tecnologias Utilizadas

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Vite | 5.x | Build tool y servidor de desarrollo |
| JavaScript | ES2022+ | Logica de la aplicacion |
| Web Components | Native API | Componentes reutilizables |
| CSS3 | - | Estilos y animaciones |
| CSS Grid/Flexbox | - | Sistema de layout |
| CSS Custom Properties | - | Sistema de diseno |

### Sin Frameworks

Esta aplicacion NO utiliza frameworks como Angular, React o Vue.
Todos los componentes estan construidos con la API nativa de
Web Components (Custom Elements + Shadow DOM).

## API Utilizada

**REST Countries API v3.1**

- Endpoint principal: `https://restcountries.com/v3.1/region/ame`
- Documentacion: https://restcountries.com/

La API proporciona informacion sobre:
- Nombres (comun y oficial)
- Capital
- Poblacion
- Banderas (SVG y PNG)
- Region y subregion
- Idiomas
- Monedas
- Area
- Zonas horarias
- Enlaces a mapas

## Navegadores Soportados

La aplicacion es compatible con navegadores modernos que soporten:
- ES Modules
- Custom Elements v1
- Shadow DOM v1
- CSS Grid y Flexbox
- CSS Custom Properties

Navegadores recomendados:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera build de produccion |
| `npm run preview` | Previsualiza build de produccion |

## Autor

kenssHC

## Licencia

Este proyecto es de uso educativo.
