import { useEffect, useState } from "react";
import { Button, TextField } from "react-aria-components";
import { IconMoon, IconSun } from "./components/Icons";
import iconCross from "./assets/images/icon-cross.svg";
import Circle from "./components/circle";
import Todo from "./components/Todo";

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
      <main className="relative bg-light-1 h-screen text-light-5 text-lg flex flex-col items-center pt-20">
        <header className="absolute top-0 left-0 z-0 w-full flex flex-row items-start justify-between p-8 bg-center bg-no-repeat bg-cover bg-[url('src/assets/images/bg-mobile-light.jpg')] h-1/4">
          <h1 className="text-white uppercase font-bold tracking-[8px] text-3xl">
            todo
          </h1>
          <Button className="p-1">
            {theme == "sun" ? <IconSun></IconSun> : <IconMoon></IconMoon>}
          </Button>
        </header>
        <section className="z-10">
          <form action="" className="bg-white">
            <TextField></TextField>
          </form>
          <ul className="flex flex-col rounded-lg overflow-hidden">
            {todos.map((elem, index) => (
              <Todo key={index} {...elem}></Todo>
            ))}
          </ul>
          <div className="flex flex-col gap-4 bg-white">
            <div className="flex flex-row items-center justify-between p-4 text-light-4">
              <span>{todos.length} items left</span>
              <Button>Clear Completed</Button>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 p-4">
              <Button>All</Button>
              <Button>Active</Button>
              <Button>Completed</Button>
            </div>
          </div>
        </section>

        <span className="text-light-4 pt-8">Drag and Drop to reorder list</span>
      </main>
    </>
  );
}

export default App;
