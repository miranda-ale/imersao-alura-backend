import conectarAoBanco from "../config/dbConfig.js";


const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;

// Conecta ao banco de dados usando a string de conexão fornecida pelo ambiente
const conexao = await conectarAoBanco(mongoUri);

// Função assíncrona para obter todos os posts da coleção "posts"
export async function getTodosPosts() {
    // Obtém o banco de dados "imersao-alura-backend"
    const db = conexao.db(process.env.MONGO_DBNAME);
    // Obtém a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db(process.env.MONGO_DBNAME);
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}
