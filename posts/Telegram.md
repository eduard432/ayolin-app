---
title: "Conecta tu Chatbot"
date: "2 de Agosto del 2025"
excerpt: "Aprende a conectar tu Chatbot a Telegram."
---

# 🧾 Guía para obtener un Token de Telegram Bot y conectarlo a un Ayolin-Bot

Esta guía te enseña paso a paso cómo obtener el token de un bot en Telegram para usarlo en tu chatbot.

---

## ✅ Requisitos previos

- Tener una cuenta de Telegram.
- Tener instalada la app de Telegram en tu dispositivo o usar [Telegram Web](https://web.telegram.org/).

---

## 📲 Paso 1: Abre conversación con **@BotFather**

1. Abre Telegram.
2. En la barra de búsqueda, escribe `@BotFather` y selecciona el bot verificado con ese nombre.
3. Presiona **Start** o escribe `/start`.

---

## 🤖 Paso 2: Crea tu bot

1. Escribe el comando:

    ```
    /newbot
    ```

2. El bot te pedirá que ingreses el **nombre de tu bot**. Este puede ser cualquier nombre (ej. `MiBotPersonal`).
3. Luego te pedirá un **nombre de usuario para el bot**, que **debe terminar en `bot`** (ej. `mibotgenial_bot` o `miSuperBot_bot`).

---

## 🔑 Paso 3: Obtén tu Token

Después de crear el bot, **@BotFather** te enviará un mensaje con el token. Este se verá así:

```
Use this token to access the HTTP API:
123456789:ABCDefGhIJKlmnoPQRsTUVwxyZ
```

⚠️ **Guarda este token de forma segura.** Es como una contraseña para controlar tu bot.

---

## 🧪 Paso 4: Conectar Telegram con tu chatbot:

Entra al menu interactivo de tu chatbot:

[Aquí](https::/ayolin.com/dashboard/general)

---

- Entra a integraciones
- Entra a marletplace
- En la sección "All" busca la integración de Telegram y da click: "Instalar"
- Ingresa tu token de Telegram (Asegurate de tener un token válido)
- Listo!!!

En estos momentos, cualquier mensaje enviado a esa cuenta de telegram será respondido automáticamente por tu chatbot.