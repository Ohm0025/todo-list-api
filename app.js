const express = require("express");
const { readTodo, writeTodo } = require("./dbs/file");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/todos", async (req, res) => {
  try {
    res.json({
      todo: await readTodo(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { id, title, completed } = req.body;
    const oldTodos = await readTodo();
    const newTodo = { id, title, completed };
    await writeTodo([newTodo, ...oldTodos]);
    res.status(200).json({ message: "create success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const oldTodos = await readTodo();
    await writeTodo(
      oldTodos.map((item) =>
        item.id === id
          ? {
              ...item,
              title: title ?? item.title,
              completed: completed ?? item.completed,
            }
          : item
      )
    );
    res.status(200).json({ message: "update success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oldTodos = await readTodo();
    await writeTodo(oldTodos.filter((item) => item.id !== id));
    res.status(200).json({ message: "delete success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.listen(8080, () => console.log("server on port 8080"));
