# Swagger Docs API

---

## Pour générer la documentation de votre API à l'aide de swagger-jsdoc, vous pouvez suivre les étapes suivantes :

#### Installez le package swagger-jsdoc et swagger-ui-express en exécutant la commande suivante :

    npm install swagger-ui-express swagger-jsdoc
    ou
    yarn add swagger-ui-express swagger-jsdoc

#### Voici un exemple de fichier de configuration `swagger-jsdoc.js` qui génère la documentation de tous les fichiers JavaScript du répertoire routes :

    import swaggerJsdoc from "swagger-jsdoc";

    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Swagger Bob! Desk API",
                version: process.env.RELEASE_VERSION,
                description: "Welcome to Bob! Desk's API Documentation with Swagger<br /><a href='http://localhost:8080'>Back to home API<a>",
                contact: {
                    name: "Bob! Desk",
                },
            },
        },
        apis: [`${__dirname}/utils/api-docs.js`], // Your JSDoc files go here
    };

    export const swaggerSpec = swaggerJsdoc(options);

#### Dans l'`index.js` Utilisez la fonction setup de swagger-ui-express pour configurer l'interface utilisateur Swagger avec la documentation générée :

    imoprt swaggerUi from 'swagger-ui-express';
    import { swaggerSpec } from './api-docs';

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

#### une fois ceci fait, vous pouvez ajouter la documentation de votre API dans vos fichiers JavaScript en utilisant les commentaires JSDoc. Par exemple, voici un exemple de commentaires JSDoc qui contient la documentation de l'API :

    /**
     * @swagger
     * /api-docs:
     *   get:
     *     description: Use to request all users
     *     responses:
     *       200:
     *         description: A successful response
     *       400:
     *         description: Bad request
     */

#### Démarrez votre application Node.js et accédez à l'URL http://localhost:8080/api-docs pour afficher l'interface utilisateur Swagger dans votre navigateur. Vous devriez maintenant pouvoir explorer votre API et voir la documentation générée à partir de votre code source.

---