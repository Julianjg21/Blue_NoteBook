# Blue Notebook

**Blue Notebook** es una plataforma web diseñada para facilitar la organización personal y el manejo de notas y tareas. El proyecto incluye un sistema de autenticación seguro donde los usuarios pueden **registrarse, iniciar sesión** y **restaurar su contraseña** cuando lo necesiten.

## Módulos principales

1. **Home**: En este módulo, los usuarios pueden visualizar todas sus notas y tareas registradas. Desde aquí, es posible **editar**, **eliminar** y gestionar rápidamente su contenido, brindando una experiencia eficiente para mantenerse al día con sus pendientes.

2. **New Notes**: Un espacio dedicado a la creación de nuevas notas. Los usuarios pueden aprovechar un editor de texto enriquecido para generar notas de manera intuitiva y estilizada.

3. **Watch Notes**: Aquí, los usuarios pueden consultar todas sus notas en un formato más detallado. Además, pueden **crear nuevas notas**, **editar** las existentes o **eliminarlas** si ya no son necesarias.

4. **Add Tasks**: Un módulo diseñado para el control de las tareas diarias. Los usuarios pueden registrar sus pendientes, **modificarlas**, **eliminarlas** y realizar un seguimiento de sus responsabilidades.

## Funcionalidades adicionales

- **Buscador de tareas y notas**: Los usuarios pueden buscar tareas o notas específicas mediante su título, lo que permite un acceso rápido a la información relevante.

**Blue Notebook** es una herramienta ideal para aquellos que buscan llevar un mejor control sobre sus notas y tareas, todo en un entorno simple, intuitivo y eficiente.

## Tecnologías Usadas

El proyecto **Blue Notebook** fue desarrollado utilizando las siguientes tecnologías:

### Frontend

- **React.js**: Para la creación de la interfaz de usuario y la lógica de la aplicación.
- **React Router**: Para el manejo de la navegación entre páginas.
- **Bootstrap**: Para el diseño responsivo y componentes visuales.
- **Axios**: Para la comunicación con el backend mediante peticiones HTTP.
- **Draft.js** y **React-Quill**: Para la implementación de editores de texto enriquecido.
- **FontAwesome**: Para los iconos utilizados en la interfaz.

### Backend

- **Node.js** con **Express.js**: Para el desarrollo del servidor y las API REST.
- **MySQL**: Para la gestión de la base de datos.
- **bcrypt**: Para la encriptación de contraseñas.
- **jsonwebtoken**: Para la autenticación y gestión de tokens.
- **Nodemailer**: Para el envío de correos electrónicos (recuperación de contraseña, etc.).

### Otros

- **js-cookie**: Para la gestión de cookies en el frontend.
- **dotenv**: Para manejar variables de entorno en el backend.
- **CORS**: Para manejar la seguridad de las peticiones entre dominios.
