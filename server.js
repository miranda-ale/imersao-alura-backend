import express from "express";
import routes from "./src/routes/postsRoutes.js";
import { config } from 'dotenv-safe';
config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static("uploads"))
routes(app);

// Inicia o servidor na porta 3000 e exibe mensagem de inicialização
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}` +
        `\n http://localhost:${PORT}`)
});
