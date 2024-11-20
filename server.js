import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();

routes(app);

// Inicia o servidor na porta 3000 e exibe mensagem de inicialização
app.listen(process.env.PORT, () => {
    console.log(`Servidor escutando na porta ${process.env.PORT}` +
        `\n http://localhost:${process.env.PORT}`)
});
