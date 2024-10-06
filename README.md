# RIMAC | Prueba técnica | Star Wars Game API 👾🚀👩‍🚀

Este proyecto es una API creada en **Node.js** utilizando el **Serverless Framework** para su despliegue en **AWS Lambda**. El propósito es integrar la **Star Wars API (SWAPI)**, traducir sus modelos de respuesta al español y gestionar puntuaciones de un juego. El juego permite a los jugadores acumular puntos y, si superan los 6 puntos, agregar su puntuación al **Salón de la Fama**. La aplicación está implementada con una arquitectura **serverless** que usa AWS API Gateway, Lambda y DynamoDB para el almacenamiento de los datos de puntuación.

- **Frontend:** SvelteKit para crear una experiencia web rápida y dinámica.
- **Backend:** Node.js y Serverless Framework para la implementación de la API.
- **Base de Datos:** DynamoDB para el almacenamiento de puntuaciones.
- **Integración:** API de Star Wars (SWAPI) para obtener datos de personajes.

Puedes visitar la aplicación en [https://main.d1udxnqb9vkewp.amplifyapp.com/](https://main.d1udxnqb9vkewp.amplifyapp.com/)


## Funcionamiento del Juego

### Dinámica del Juego

El juego tiene dos páginas principales:

1. **Página del Juego**: 
   - El jugador debe seleccionar cartas de personajes de Star Wars según su nombre. Cada selección correcta acumula puntos.
   - El juego continúa hasta que el jugador comete un error. En ese momento, se muestra la puntuación total obtenida.
   - Si el jugador acumula **más de 6 puntos**, puede ingresar su nombre(alias) y guardar su puntuación en el **Salón de la 
   Fama**.
   - Las medallas según puntos son:
   ** 0 a 2 -> NOOB 🐣
   ** 2 a 4 -> MEEH! 😒
   ** 4 a 6 -> MASTER 😎
   ** 6 a más -> GOD 🔥

   
2. **Página del Salón de la Fama**:
   - Muestra las últimas **3 mejores puntuaciones** con los nombres de los jugadores.
   - Solo se permite ingresar al Salón de la Fama si se supera el umbral de 6 puntos.

## Características Principales:

- **Integración con SWAPI**: La API interactúa con SWAPI para obtener información de personajes de Star Wars y traduce los atributos de inglés a español.
- **Salón de la Fama**: Los jugadores que superan 6 puntos pueden agregar su nombre y puntuación a la base de datos, que es mostrada en el salón.
- **Serverless Architecture**: La API está implementada utilizando AWS API Gateway, Lambda y DynamoDB.
- **Traducción de atributos**: Todos los atributos recibidos de la API SWAPI se mapean al español.

## Requisitos del Reto Técnico

- Mínimo 2 endpoints: 
  - `GET` para recuperar la información traducida de SWAPI.
  - `POST` para crear y almacenar un nuevo modelo en DynamoDB (guardar puntuaciones).
- Integración con **SWAPI**.
- Traducción de los atributos de la API SWAPI de inglés a español.
- Uso de **Serverless Framework** y **Node.js**.
- Despliegue sin errores en **AWS Lambda**.
  
### Bonus:
- Pruebas unitarias.
- Uso de **TypeScript**.
- Documentación en **Open API/Swagger**.
- Trabajar en capas y por dominio.

## Arquitectura del Proyecto

El proyecto está diseñado con una arquitectura serverless y frontend moderno, desplegado completamente en AWS. A continuación se detallan los componentes principales:

### 1. Frontend

- **Framework:** SvelteKit, utilizado para crear una experiencia web rápida y dinámica.
- **Páginas:**
  - **Juego:** Los usuarios eligen cartas basadas en personajes de Star Wars. Deben acumular puntos acertando con el personaje correcto. Si superan los 6 puntos, pueden registrar su puntuación en el Salón de la Fama.
  - **Salón de la Fama:** Muestra los tres jugadores con las mejores puntuaciones, permitiendo a los usuarios visualizar sus logros.

El frontend está desplegado en **AWS Amplify**, lo que permite el hosting y la integración continua de la aplicación web, asegurando un proceso de despliegue ágil y eficiente.

### 2. Backend

El backend está implementado utilizando el **framework Serverless**, que permite desplegar funciones en AWS Lambda y conectarlas con otros servicios en la nube. La API maneja dos responsabilidades principales:

- **Integración con SWAPI**: Se hace una llamada a la API de Star Wars (SWAPI) para obtener los datos de los personajes que se usan en el juego.
- **Gestión de Puntuaciones**: Los puntos generados por los jugadores se almacenan en **DynamoDB** y se recuperan para mostrar el Salón de la Fama.

#### Descripción de los Servicios Backend:

1. **AWS API Gateway**: Sirve como puerta de enlace para que el frontend se comunique con las funciones de Lambda, tanto para registrar nuevos puntajes como para recuperar las puntuaciones de los jugadores.
   
2. **AWS Lambda**: Se utiliza para dos funciones clave:
   - **Lambda de Inserción**: Gestiona las solicitudes **POST** para almacenar nuevos jugadores y sus puntuaciones en **DynamoDB**.
   - **Lambda de Consulta**: Gestiona las solicitudes **GET** para recuperar las mejores puntuaciones desde la base de datos.

3. **DynamoDB**: Base de datos NoSQL que almacena los registros de los jugadores y sus puntuaciones. Se utiliza debido a su escalabilidad y costo eficiente, además de integrarse fácilmente con los otros servicios AWS.

### 3. Integración con SWAPI

Se realiza una integración con la **Star Wars API (SWAPI)** para obtener información de personajes que se utiliza en la lógica del juego. Esta integración se realiza desde una función **Lambda**, que transforma los datos en español antes de enviarlos al frontend.

### 4. Despliegue

El despliegue de la aplicación se realiza utilizando **Serverless Framework** con comandos de despliegue que configuran automáticamente los servicios de AWS (Lambda, API Gateway, DynamoDB). El despliegue del frontend con **SvelteKit** está en **AWS Amplify**.

- **SvelteKit + AWS Amplify**: Asegura una experiencia de usuario rápida y con despliegue continuo.
- **Serverless Framework**: Permite el despliegue de las funciones Lambda, con un fácil control sobre las configuraciones de API Gateway y DynamoDB.

Este enfoque garantiza escalabilidad, bajo costo y alta disponibilidad para la aplicación, asegurando una arquitectura moderna y eficiente para soportar el tráfico y las solicitudes en tiempo real.

### 4. Lambda functions
- Agregar mejor puntuación
![Descripción de la imagen](/documentation/lambda/addWinner.png)

- Obtener mejores 3 del ranking
![Descripción de la imagen](/documentation/lambda/getRanking.png)

- Obtener querrero de SWAPI
![Descripción de la imagen](/documentation/lambda/getWarrior.png)
