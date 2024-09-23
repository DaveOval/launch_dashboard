# Dashboard de Lanzamientos de SpaceX

## Resumen del Proyecto
 **Dashboard de Lanzamientos de SpaceX**, utilizando React y Vite. Esta aplicación consume la [API de SpaceX](https://api.spacexdata.com/v4/launches) para mostrar información detallada sobre lanzamientos espaciales.

### Funcionalidades Clave:
- **Integración con la API**: Recupera y muestra información sobre lanzamientos, incluyendo nombre, fecha, resultado y ubicación.
- **Filtros Avanzados**: Permite filtrar lanzamientos por año, resultado, tipo de cohete y búsqueda por nombre de misión.
- **Visualización en Google Maps**: Muestra la ubicación de los lanzamientos en un mapa interactivo.
- **Manejo de Favoritos**: Permite a los usuarios marcar lanzamientos como favoritos, almacenándolos en localStorage.
- **Interfaz Responsiva**: Diseño visualmente atractivo y optimizado para dispositivos móviles y de escritorio.

### Tecnologías Utilizadas:
- **React** (con TypeScript)
- **Google Maps API**
- **Tailwind CSS**
- **localStorage** para gestión de favoritos
- **React-Router** para gestión de rutas
- **Vercel** PaaS

## Instrucciones para Levantar la Aplicación

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 14 o superior) y [npm](https://www.npmjs.com/get-npm).

### Ejecutar la aplicación
1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/DaveOval/launch_dashboard
   cd launch_dashboard
   ```
2. Instala las dependencias del proyecto:
    ```bash
        npm install
    ```

3. Crea un archivo .env en la raíz del proyecto y añade tu clave de API de Google Maps (Tienes una plantilla en .env.template solo renombrelo quitando el .template):
    ```plaintext
        VITE_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"
    ```
4. Inicia la aplicación en modo de desarrollo:
    ```bash
        npm run dev
    ```

5. Abre tu navegador y visita http://localhost:3000 para ver la aplicación en funcionamiento.






