import React, { useEffect, useState } from "react";
import {
  completeTodoById,
  deleteTodoById,
  getAllTodos,
  inCompleteTodoById,
} from "../Services/TodoService";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../Services/AuthService";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  const getTodos = () => {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addNewTodo = (e) => {
    e.preventDefault();
    navigate("/addTodo");
  };

  const updateTodo = (id) => {
    navigate(`/updateTodo/${id}`);
  };

  const deleteTodo = (id) => {
    deleteTodoById(id)
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  };

  const completeTodo = (id) => {
    completeTodoById(id)
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  };

  const inCompleteTodo = (id) => {
    inCompleteTodoById(id)
      .then((response) => getTodos())
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={addNewTodo}>
          Add Todo
        </button>
      )}
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              {isAdmin && (
                <>
                  <th>Update</th>
                  <th>Delete</th>
                </>
              )}

              <th>Complete</th>
              <th>InComplete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                {isAdmin && (
                  <>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => updateTodo(todo.id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => completeTodo(todo.id)}
                  >
                    Complete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => inCompleteTodo(todo.id)}
                  >
                    InComplete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodo;
