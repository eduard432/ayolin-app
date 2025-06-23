# Lista de Rutas:

## Auth
- /api/v2/auth/[...nextauth] (GET, POST)

## Chatbots y sus recursos asociados
- `/api/v2/chatbots (POST: crear chatbot)`
- `/api/v2/chatbots/:chatbotId (PUT, DELETE: actualizar o eliminar)`

### Chats
- `/api/v2/chatbots/:chatbotId/chats (GET: obtener todos los chats del chatbot)`
### Chat Link
- `/api/v2/chatbots/:chatbotId/link (GET: generar link para nuevo chat)`
### Plugins
- `/app/api/chatbots/:chatbotId/plugins (GET: obtener todos los plugins disponibles, POST: Agregar plugin al chatbot)`
- `/app/api/chatbots/:chatbotId/plugins/:pluginId (PUT: Actualizar configuración de plugin, DELETE: Eliminar plugin del chatbot)`

## Chats y mensajes
- `/api/v2/chats/:chatId (GET: obtener chat con mensajes, POST: agregar mensaje)`
- `/api/v2/chats/:chatId/messages (DELETE: eliminar todos los mensajes del chat)`

## Content:

### Libros y búsqueda de contenido
- `/api/v2/content/books (POST: crear job de procesamiento)`
- `/api/v2/content/books/:bookId/search (GET: búsqueda semántica dentro del libro)`

## WIP
- `/api/v2/content/conversations (WIP)`
- `/api/v2/cloudinary/credentials (POST: obtener credenciales)`


```bash
│   └── v2
│       ├── chatbots
│       │   └── [chatBotId]
│       │       ├── chats
│       │       └── link
│       ├── chats
│       │   └── [chatId]
│       │       └── messages
│       └── content
│           └── books
│               └── [bookId]
│                   └── search
```