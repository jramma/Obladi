# Ob-La-Di

Ob-La-Di es una aplicación basada en **Next.js** diseñada para ayudar a encontrar objetos perdidos.

## Configuración del entorno

Antes de iniciar el proyecto, asegúrate de crear un archivo `.env.local` basado en el archivo `.env.example`, copiando todas las variables necesarias.

Si decides usar MongoDB en local, deberás tener una instancia de MongoDB corriendo en tu máquina. Alternativamente, puedes configurarlo con un servicio online como MongoDB Atlas.

> ⚠️ Las variables relacionadas con MongoDB también deben añadirse al archivo `.env.local` para que el proyecto funcione correctamente.

## Requisitos previos

Este proyecto utiliza el gestor de paquetes **Bun**. Aunque es posible usar `npm` o `yarn`, se recomienda usar **Bun** para garantizar el correcto funcionamiento.

Si no tienes **Bun** instalado, puedes instalarlo siguiendo las instrucciones en su [sitio oficial](https://bun.sh/).

## Comandos disponibles

### Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
bun i
```

### Iniciar el servidor de desarrollo

Para iniciar el servidor de desarrollo en el puerto `3000`, utiliza:

```bash
bun dev
```

### Construir el proyecto

Para generar una versión de producción del proyecto, ejecuta:

```bash
bun build
```

## Notas adicionales

- Asegúrate de configurar las variables de entorno necesarias en un archivo `.env.local`. Por ejemplo, para Google Maps, necesitas definir `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
- Este proyecto utiliza **Tailwind CSS** para el diseño y **next-themes** para la gestión de temas (modo claro/oscuro).
- Si tienes problemas con **Bun**, puedes intentar usar `npm` o `yarn`, pero no se garantiza el soporte.

## Tecnologías utilizadas

- **Next.js**: Framework principal.
- **Tailwind CSS**: Para estilos.
- **next-themes**: Gestión de temas.
- **react-hook-form**: Manejo de formularios.
- **@react-google-maps/api**: Integración con Google Maps.
- **Bun**: Gestor de paquetes.

## Servers

Netlify - web
AWS - imagenes
Mongo - base de datos
Resend - mailing
