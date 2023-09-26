import React, { useEffect, useState } from "react";
import {
  createTodo,
  getTodoById,
  updateTodoById,
} from "../Services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const saveTodoOrUpdate = (e) => {
    e.preventDefault();

    const todo = { title, description, completed };

    if (id) {
      updateTodoById(id, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createTodo(todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  };

  const getTodo = () => {
    getTodoById(id)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      getTodo();
    }
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Todo Title:</label>
                <input
                  className="form-control"
                  text="text"
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Description:</label>
                <input
                  className="form-control"
                  text="text"
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button className="btn btn-success" onClick={saveTodoOrUpdate}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
