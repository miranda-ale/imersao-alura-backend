import express from "express";
import {listarPosts} from "../controllers/postsController.js";

const routes = (app) => {
    // Habilita o parser JSON para lidar com requisições com corpo JSON
    app.use(express.json());
    // Rota GET para obter todos os posts
    app.get("/posts", listarPosts);
}

export default routes;
