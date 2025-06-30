# TODO LIST:


- ### Cambiar los nombre de todas las rutas a inglés

Ejemplo: /nuevo -> /general 

- ### Crear componente de chateo

Crear componente de chateo con todas las características de un chat

Referencia de una página ya hecha: https://github.com/vercel/ai-chatbot/tree/main

- ### Agregar página: .../dashboard/[chatbotId]/prubea

Página donde se implementa el componente de chateo para que los usuarios puedan probar la configuración de su chatbot, tiene que verse muy similiar a otras plataformas...

- ### Agregar el rol de usuarios:

Agregar el rol de FREE y PRO en el schema de usuarios

- ### Estándarizar Estilos (cuando tengamos tiempo):
    - Usar full componentes de Shadcn
    - Hacer responsive todas las páginas, (específicamente para telefono):
    Usar preferemente grid (12 columnas): `grid grid-cols-12`

    ```
    // Ejemplo
    <div className="grid grid-cols-1 lg:grid-cols-12" >
        // Abarca una columna (todo el ancho) en telefonos y 1/3 en computadoras
        <article className="col-span-1 lg:col-span-4" />
    </div>
    ```

    - Agregar estilos para el modo oscuro

    *Explicación:* Si usamos componentes de shadcn, de manera nativa ya incluyen estilos en tema oscuro y claro, sin embargo, si usamos nuestros propios estilos tenemos que configurar el cambio de color, ejemplo:

    ```
    // Negro cuando esta modo claro y blanco cunado este modo oscuro
    // Usamos `dark:` para indicar cuando son estilos del modo oscuro
    <p className="text-neutral-600 dark:text-neutral-50" >Texto uno</p>
    ```

    - Crear componentes para los textos y titulos como: p, h1, h2, ...
    ```
    <H1>TEXTO PERSONALIZADO</H1>
    <p>parrafo</p>
    ```
    - Usar el mismo padding para todas las páginas y estandarizarlo en el layout
    - Usar correcta semántica para todas las páginas usando article, etc...

## Pendientes extra (a largo plazo):
- Configurar stripe para emepzar a cobrar
- Usar tailwind para cambiar estilos de los correos electrónicos
- Crear un blog con guias para los usuarios, con ayuda de archivos .mdx y configurar en nextjs el blog
- Configurar traducción de la página, con i11n, solo para inglés y español



## Otros:
- Maybe Lunixu :)