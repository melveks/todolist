import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [itemsList, setItemsList] = useState([]);

  function handleChangeInput(event) {
    const inputTask = event.target.value;
    setTask(inputTask);
  }
  function handleAddItemToList(event) {
    event.preventDefault(); // desabilita o refresh da pagina ao enviar

    if (!task) {
      return;
    }
    setItemsList([...itemsList, task]); // <----- Copia todos os items ja existentes e entao adiociona o novo item
    setTask("");
  }

  const deleteItem = (index) => () =>
    setItemsList((itemsList) => itemsList.filter((_, i) => i !== index));

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = task.findIndex((task) => {
      return task.id === id;
    });

    const tempTasks = [...task];

    tempTasks[taskIndex].isComplete = !tempTasks[taskIndex].isComplete;

    setTask(tempTasks);
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form className="form_task" onSubmit={handleAddItemToList}>
        <input
          className="text"
          type="text"
          placeholder="Adicione uma tarefa"
          onChange={handleChangeInput}
          value={task}
        />
        <button className="submit" type="submit">
          {" "}
          Adicionar
        </button>
        <ul className="todo_list">
          {itemsList.map((item, index) => (
            <li className="item_list" key={index}>
              <div>
                <input
                  className="checkbox"
                  type="checkbox"
                  readOnly
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskCompletion(task.id)}
                />

                <label
                  className="list_task"
                  type="text"
                  placeholder="tarefa"
                  onChange={handleChangeInput}
                  value={item}
                >
                  {item}
                </label>

                <button className="button_delete" onClick={deleteItem(index)}>
                  {" "}
                  deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
