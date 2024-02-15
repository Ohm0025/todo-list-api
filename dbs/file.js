const {readFile , writeFile} = require("fs/promises");

exports.readTodo = () => 
    readFile("dbs/todo.json" , "utf-8")
    .then(data => {
        return JSON.parse(data);
    })
    .catch(err => console.log(err));

exports.writeTodo = (data) =>
    writeFile("dbs/todo.json" , JSON.stringify(data) , "utf-8");
