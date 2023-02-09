import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  //todoEditing será responsável pela renderização condiciona tanto do campo relacionado ao texto referente a tarefa quando dos botões editar ou salvar, caso o state contenha o id daquela tarefa será renderizado um input para edição ao invés da div com o texto e um botão para salvar a alteração ao invés do botão para editar.
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  // Add the handlesubmit code here
  // Essa função cria um objeto que representará a tarefa que o usuário digitou no input para ser adicionada a lista de afazeres
  // o método trim() remove os espaços em branco no início e final da string;
  // após verificado se não é uma string vazia a lista de tarefas representada pelo state 'todos' será atualizada com todas as tarefas já existentes sendo passadas através do spread mais a nova tarefa adicionada ao array pelo método concat.
  // Em seguida o campo input é limpo representado pelo state todo.
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");
    
    } else {
        
        alert("Enter Valid Task");
        setTodo("");
    }
  }
  // Add the deleteToDo code here
  //A função deleTodo cria uma variável chamada updatedTodos que recebe todas as tarefas que há no array todos aplicado o método filter que resultará em um novo array onde somente as tarefas com id diferente do id passado como parâmetro para a função irão permanecer
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here
  // Aqui novamente foi criada uma variável para receber a atualização na lista de tarefas;
  // o método map() foi aplicado no array de tarefas e para àquela tarefa que o id for igual ao id passado como parâmetro será alternado a proriedade completed.
  // por fim setTodos vai atualizar o state todos com o novo array gerado.
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  // a tarefa que possuir o mesmo id que a função recebeu como parâmetro receberá o valor do state editingText na propriedade text;
  // por fim a lista de tarefas será atualizada com a tarefa que foi editada e o state responsável pelo renderização condicional referente a edição retornará a null, com isso nenhum campo estará com o input de edição.
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

  
return(
<div className ="App">
<h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task"
          value={todo}
        />
            <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => 
          <div className="todo" key={todo.id}>
            <div>

            <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
            {todo.id === todoEditing ? (
                <input type="text" onChange={(e) => setEditingText(e.target.value)} />
                ) : (
                    <div>{todo.text}</div>
                    )}
            </div>
            <div className="todo-actions">
            {todo.id === todoEditing ? (
                <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                    <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                    )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button> 
                </div>
          </div>
        )}
</div>
);
};
export default App;
