import Header from "./Components/Header";
import ListTodo from "./Components/ListTodo";
import { Routes, Route, Navigate } from "react-router-dom";
import Todo from "./Components/Todo";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { isUserLoggedIn } from "./Services/AuthService";

function App() {
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();

    if (isAuth) return children;

    return <Navigate to="/" />;
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodo />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/addTodo"
          element={
            <AuthenticatedRoute>
              <Todo />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/updateTodo/:id"
          element={
            <AuthenticatedRoute>
              <Todo />
            </AuthenticatedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
