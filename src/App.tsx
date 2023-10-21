import { useEffect, useState } from "react";
import { Button, TextField } from "react-aria-components";
import imgMoon from "./assets/images/icon-moon.svg";
import imgSun from "./assets/images/icon-sun.svg";
import iconCross from "./assets/images/icon-cross.svg";

type TodoProps = {
  description: string;
  completed: boolean;
};

function App() {
  const [theme, setTheme] = useState("sun");
  const [todos, setTodos] = useState<TodoProps[]>([
    { description: "test", completed: false },
  ]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  console.log(todos);

  return (
    <>
      <header>
        <h1>todo</h1>
        <Button>
          <img src={theme == "sun" ? imgSun : imgMoon} alt="theme icon" />
        </Button>
      </header>
      <main>
        <form action="">
          <TextField></TextField>
        </form>
        <ul>
          {todos.map((elem, index) => (
            <li key={index}>
              <div>circle</div>
              <span>{elem.description}</span>
              <Button>
                <img src={iconCross} alt="delete todo" />
              </Button>
            </li>
          ))}
        </ul>
        <div>
          <div>
            <span>{todos.length} items left</span>
            <Button>Clear Completed</Button>
          </div>
          <div>
            <Button>All</Button>
            <Button>Active</Button>
            <Button>Completed</Button>
          </div>
        </div>
        <span>Drag and Drop to reorder list</span>
      </main>
    </>
  );
}

export default App;
