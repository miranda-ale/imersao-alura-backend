import { getTodosPosts , criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Obtém todos os posts usando a função getTodosPosts
    const posts = await getTodosPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);

    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Erro ao processar requisição."})

    }

}

export async function uploadImg(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCriado);

    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Erro ao processar requisição."})

    }

}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            decricao: descricao,
            alt: req.body.alt,
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);

    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Erro ao processar requisição."})
    }

}
