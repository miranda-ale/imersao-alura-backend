import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImg } from "../controllers/postsController.js";

/**
 * Configura o armazenamento de arquivos para o upload de imagens.
 * 
 * @typedef {Object} MulterStorageConfig
 * @property {function} destination - Função que define o diretório de destino para o arquivo.
 * @property {function} filename - Função que define o nome do arquivo após o upload.
 * 
 * @type {MulterStorageConfig}
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

/**
 * Instancia o middleware Multer para upload de arquivos únicos com o campo "img".
 * 
 * @type {Multer}
 */
const upload = multer({ dest: "./uploads", storage });

/**
 * Define as rotas da aplicação.
 * 
 * @param {express.Application} app - Instância da aplicação Express.
 * @returns {void}
 */
const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições com corpo JSON
  app.use(express.json());

  // Rota GET para obter todos os posts
  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Obter todos os posts
   *     responses:
   *       200:
   *         description: Retorna uma lista de posts
   */
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Criar um novo post
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               descricao:
   *                 type: string
   *                 description: Descrição do post
   *               imgUrl:
   *                 type: string
   *                 description: URL da imagem do post
   *     responses:
   *       200:
   *         description: Retorna o post criado
   *       400:
   *         description: Erro na criação do post
   */
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem
  /**
   * @swagger
   * /upload:
   *   post:
   *     summary: Upload de imagem
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               img:
   *                 type: string
   *                 format: binary
   *                 description: Imagem a ser enviada
   *     responses:
   *       200:
   *         description: Retorna o URL da imagem salva
   *       400:
   *         description: Erro no upload da imagem
   */
  app.post("/upload", upload.single("img"), uploadImg);
};

export default routes;
