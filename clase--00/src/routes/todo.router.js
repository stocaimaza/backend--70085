import { Router } from "express";
const router = Router(); 
import TodoModel from "../models/todo.model.js";


///Rutas

router.get("/", async (req, res) => {
    try {
        const todos = await TodoModel.find().lean(); 
        res.render("todos", {todos});
    } catch (error) {
        res.status(500).send("Error en el servidor, nos vamos a re morir sin dinero");
    }
})

///Ruta para crear un nuevo Tuduuu

router.post("/todos", async (req, res) => {
    const {title, description} = req.body; 
    const nuevoTodo = new TodoModel({title, description}); 

    try {
        await nuevoTodo.save(); 
        res.redirect("/"); 
    } catch (error) {
        res.status(500).send("Error en el servidor, nos vamos a re morir sin dinero");
    }
})

//Ruta para mostrar el formulario de carga
router.get("/new", (req, res) => {
    res.render("new");
})

//Ruta para marcar un tudu como completado: 
router.post("/todos/:id/complete", async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        todo.completed = true; 
        await todo.save(); 
        res.redirect("/"); 
    } catch (error) {
        res.status(500).send("Error del servidor al completar una actividad, tenes que estudiar mas ");
    }
})

//Ruta para borrar un tudu

router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id); 
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Todo marcha mal, vamos a diseño de indumentaria");
    }
})



export default router; 