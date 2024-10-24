# API de Prueba

## Interfaces

**Los únicos datos obligatorios son los que tienen la etiqueta `required`.**

Las interfaces son los modelos de datos que se manejan en la API.

Solo son representaciones de los datos que se manejan en la API, no son clases ni estructuras de datos.

```js
"email": // <-- Nombre de la columna
[
  "string", // <-- Tipo de dato
  "required", // <-- Obligatorio
  "unique" // <-- No se puede repetir
]
```

Cada interfaz tiene un conjunto de propiedades que definen la estructura de los datos que se manejan en la API.

### Usuario

Un usuario es la única entidad que puede indentificarse en la API.

```json
{
  "id": ["number"],
  "name": ["string", "required"],
  "email": ["string", "required", "unique"],
  "password": ["string", "required"],
  "createdAt": ["date"],
  "updatedAt": ["date"]
}
```

### Post

Un post es una entidad que pertenece a un usuario y contiene un título y un contenido.

Un usuario puede crear, leer, actualizar y eliminar sus propios posts cuando está autenticado.

```json
{
  "id": ["number"],
  "title": ["string", "required"],
  "content": ["string", "required"],
  "userId": ["number", "required", "foreignKey:users"],
  "createdAt": ["date"],
  "updatedAt": ["date"]
}
```

## Endpoints

### POST /auth/register

**Headers:**

```json
{
  "Accept": "application/json"
}
```

**Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Respuesta:**

```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### POST /auth/login

**Headers:**

```json
{
  "Accept": "application/json"
}
```

**Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Respuesta:**

```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### GET /me

**Headers:**

```json
{
  "Accept": "application/json",
  "Authorization": "Bearer token"
}
```

**Respuesta:**

```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### POST /posts

**Headers:**

```json
{
  "Accept": "application/json",
  "Authorization": "Bearer token"
}
```

**Body:**

```json
{
  "title": "string",
  "content": "string"
}
```

### GET /posts

**Headers:**

```json
{
  "Accept": "application/json",
  "Authorization": "Bearer token"
}
```

**Respuesta:**

```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "userId": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### GET /posts/:id

**Headers:**

```json
{
  "Accept": "application/json",
  "Authorization": "Bearer token"
}
```

**Respuesta:**

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "userId": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### PUT /posts/:id

**Headers:**

```json
{
  "Accept": "application/json",
  "Authorization": "Bearer token"
}
```

**Body:**

```json
{
  "title": "string",
  "content": "string"
}
```

**Respuesta:**

> Devuelve el número de filas afectadas. (generalmente 1)

```json
{
  "post": ["number"]
}
```

### DELETE /posts/:id

**Headers:**

```json
{
  "Accept": "application/json",
  "Authorization": "Bearer token"
}
```
