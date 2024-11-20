import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Gatinho curioso",
        imagem: "https://placecats.com/200/300"
    },
    {
        id: 2,
        descricao: "Gatinho dormindo",
        imagem: "https://placecats.com/300/200"
    },
    {
        id: 3,
        descricao: "Gatinho brincando com um novelo de lã",
        imagem: "https://placecats.com/400/300"
    },
    {
        id: 4,
        descricao: "Gatinho olhando para a janela",
        imagem: "https://placecats.com/300/400"
    },
    {
        id: 5,
        descricao: "Dois gatinhos brincando",
        imagem: "https://placecats.com/500/500"
    },
    {
        id: 6,
        descricao: "Gatinho com uma expressão divertida",
        imagem: "https://placecats.com/200/200"
    }
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000." +
        "\n http://localhost:3000")
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscaPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscaPostPorID(req.params.id);
    res.status(200).json(posts[index]);
})
