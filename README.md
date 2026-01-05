# Paises de America - Web Application

Aplicacion web que muestra informacion de 12 paises de America utilizando
Web Components nativos y CSS3.

## Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

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

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

4. Abrir navegador en http://localhost:5173

## Construccion para Produccion

```bash
npm run build
```

Los archivos se generaran en la carpeta `dist/`

## Vista Previa de Produccion

```bash
npm run preview
```

## Estructura del Proyecto

```
src/
  components/         - Web Components de la aplicacion
    base/             - Componentes base reutilizables
    country/          - Componentes relacionados con paises
    layout/           - Componentes de estructura (header, footer, etc.)
  services/           - Servicios de API y estado
  styles/             - Hojas de estilo CSS
  main.js             - Punto de entrada de la aplicacion
```

## Tecnologias Utilizadas

- Vite JS 5.x - Build tool y servidor de desarrollo
- Web Components (Custom Elements API) - Componentes reutilizables
- CSS3 con CSS Grid y Custom Properties - Estilos y layout
- REST Countries API v3.1 - Datos de paises

## API Utilizada

- Endpoint: https://restcountries.com/v3.1/region/ame
- Documentacion: https://restcountries.com/

## Autor

kenssHC

## Licencia

Este proyecto es de uso educativo.
