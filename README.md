# parcial2_hfds

Proyecto independiente de Hector Fernando Duran Silva (HFDS) para agenda cultural.

## Ejecutar con DBeaver y Postman

Requiere Node.js 20+, PostgreSQL, DBeaver y Postman.

1. En DBeaver, conecta al servidor PostgreSQL con un usuario administrador y ejecuta `database/01_crear_bd.sql`. Luego crea una conexión a la base `parcial2_hfds` usando el usuario `usrparcial2` y la contraseña `CAMBIAR_ESTA_CLAVE`.
2. En `be_p2_hfds`, copia `.env.example` como `.env`. El ejemplo usa el puerto habitual de PostgreSQL, `5432`.
3. Instala y ejecuta la API:

   `cd be_p2_hfds`

   `Copy-Item .env.example .env`

   `npm install`

   `npm run start:dev`

La API queda en http://localhost:3000 y Swagger en http://localhost:3000/docs. Con `DB_SYNCHRONIZE=true`, NestJS crea las tablas `recintos` y `eventos_culturales` al iniciar.

### Pruebas en Postman

Configura una variable `baseUrl` con `http://localhost:3000` y prueba:

- `GET {{baseUrl}}/recintos`
- `GET {{baseUrl}}/recintos/1`
- `POST {{baseUrl}}/recintos` con `{ "nombre": "Teatro Gran Mariscal", "ciudad": "Sucre", "aforo_maximo": 500 }`
- `PATCH {{baseUrl}}/recintos/1` con `{ "aforo_maximo": 600 }`
- `DELETE {{baseUrl}}/recintos/1`
- `GET {{baseUrl}}/eventos`
- `GET {{baseUrl}}/eventos/1`
- `POST {{baseUrl}}/eventos` con `{ "id_recinto": 1, "titulo": "Noche cultural", "artista_principal": "Artista local", "duracion_minutos": 90, "precio_entrada": 50.5, "fecha_evento": "2026-11-20", "estado": "Programado" }`
- `PATCH {{baseUrl}}/eventos/1`
- `DELETE {{baseUrl}}/eventos/1`

Para el frontend, en otra terminal:

1. `cd fe_p2_hfds`
2. `npx serve -l 5500`
3. Abrir http://localhost:5500

La relación es Recinto (1) a EventoCultural (N). El frontend permite listar, crear, editar y eliminar ambas entidades. El borrado es lógico. El enunciado dice “PATH”; se implementó como PATCH.


