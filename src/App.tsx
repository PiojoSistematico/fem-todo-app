import { useEffect, useRef, useState } from "react";
import { Button } from "react-aria-components";
import { IconMoon, IconSun } from "./components/Icons";
import Todo from "./components/Todo";
import CustomForm from "./components/CustomForm";

type TodoProps = {
  description: string;
  completed: boolean;
};

type FilterProps = "All" | "Active" | "Completed";

function App() {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState<TodoProps[]>([
    { description: "test", completed: false },
  ]);
  const [filter, setFilter] = useState<FilterProps>("All");
  const dragItem = useRef<string | undefined>();
  const dragOverItem = useRef<string | undefined>();

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const filteredList =
    filter == "Completed"
      ? todos.filter((elem) => elem.completed == true)
      : filter == "Active"
        ? todos.filter((elem) => elem.completed == false)
        : todos;

  function removeTodo(id: number): void {
    setTodos((prev) => prev.filter((_, index) => id != index));
  }
  function changeComplete(id: number): void {
    setTodos((prev) => {
      const newTodo = [...prev];
      newTodo[id] = {
        description: newTodo[id].description,
        completed: !newTodo[id].completed,
      };
      return newTodo;
    });
  }

  function dragStart(e: React.DragEvent<HTMLLIElement>): void {
    dragItem.current = (e.target as HTMLLIElement).id;
  }

  function dragEnter(e: React.DragEvent<HTMLLIElement>): void {
    dragOverItem.current = e.currentTarget.id;
  }

  function dropItem(): void {
    if (dragItem.current === undefined || dragOverItem.current === undefined) {
      return;
    }
    const dragIndex = parseInt(dragItem.current);
    const dropIndex = parseInt(dragOverItem.current);

    if (isNaN(dragIndex) || isNaN(dropIndex)) {
      return; // Handle invalid indices
    }

    if (isNaN(dragIndex) || isNaN(dropIndex)) {
      return; // Handle invalid indices
    }

    const newTodos = [...todos];
    const draggedItem = newTodos[dragIndex];
    newTodos.splice(dragIndex, 1);
    newTodos.splice(dropIndex, 0, draggedItem);
    setTodos(newTodos);
    dragItem.current = undefined;
    dragOverItem.current = undefined;
  }

  function clearCompletedTodos(): void {
    setTodos((prev) => prev.filter((elem) => elem.completed == false));
  }

  return (
    <>
      <main
        className={`relative bg-BackgroundApp h-screen text-TextParagraph text-base flex flex-col items-center pt-32`}
        data-theme={theme}
      >
        <header
          className={`absolute top-0 left-0 z-0 w-full flex flex-row items-start justify-between p-8 bg-center bg-no-repeat bg-cover h-1/4 ${theme == "light" ? "bg-[url('src/assets/images/bg-mobile-light.jpg')] md:bg-[url('src/assets/images/bg-desktop-light.jpg')]" : "bg-[url('src/assets/images/bg-mobile-dark.jpg')] md:bg-[url('src/assets/images/bg-desktop-dark.jpg')]"} `}
        >
          <h1 className="text-white uppercase font-bold tracking-[8px] text-3xl">
            todo
          </h1>
          <Button
            className="p-1"
            onPress={() => setTheme(theme == "light" ? "dark" : "light")}
          >
            {theme == "light" ? <IconMoon></IconMoon> : <IconSun></IconSun>}
          </Button>
        </header>
        <section className="z-10 flex flex-col gap-4 w-10/12 md:max-w-[700px]">
          <CustomForm setTodos={setTodos}></CustomForm>
          <ul className="flex flex-col rounded-lg overflow-hidden divide-y-[1px] divide-Border shadow-lg">
            {filteredList.map((elem, index) => (
              <Todo
                key={index}
                index={index}
                removeTodo={removeTodo}
                changeComplete={changeComplete}
                todo={elem}
                dragStart={dragStart}
                dragEnter={dragEnter}
                dropItem={dropItem}
              ></Todo>
            ))}
            <li className="md:hidden flex flex-row items-center justify-between p-4 text-TextButton bg-BackgroundTodo">
              <span>{todos.length} items left</span>
              <Button
                className="hover:text-TextParagraph focus-visible:text-TextParagraph"
                onPress={() => clearCompletedTodos()}
              >
                Clear Completed
              </Button>
            </li>
            <li className="hidden md:flex md:flex-row md:justify-between md:items-center md:bg-BackgroundTodo md:p-4">
              <span>{todos.length} items left</span>

              <div className="flex flex-row items-center justify-center gap-4 text-TextButton font-bold">
                <Button
                  className={`${filter == "All" ? "text-Primary" : "hover:text-TextParagraph focus-visible:text-TextParagraph"}`}
                  onPress={() => setFilter("All")}
                >
                  All
                </Button>
                <Button
                  className={`${filter == "Active" ? "text-Primary" : "hover:text-TextParagraph focus-visible:text-TextParagraph"}`}
                  onPress={() => setFilter("Active")}
                >
                  Active
                </Button>

                <Button
                  className={`${filter == "Completed" ? "text-Primary" : "hover:text-TextParagraph focus-visible:text-TextParagraph"}`}
                  onPress={() => setFilter("Completed")}
                >
                  Completed
                </Button>
              </div>
              <Button
                className="hover:text-TextParagraph focus-visible:text-TextParagraph"
                onPress={() => clearCompletedTodos()}
              >
                Clear Completed
              </Button>
            </li>
          </ul>
          <div className="md:hidden flex flex-col gap-4 bg-BackgroundTodo rounded-xl md:divide-y-[1px] md:divide-Border shadow-lg">
            <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:p-4 md:text-TextButton">
              <span>{todos.length} items left</span>
              <Button
                className="hover:text-TextParagraph focus-visible:text-TextParagraph"
                onPress={() => clearCompletedTodos()}
              >
                Clear Completed
              </Button>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 p-4 text-TextButton font-bold">
              <Button
                className={`${filter == "All" ? "text-Primary" : "hover:text-TextParagraph focus-visible:text-TextParagraph"}`}
                onPress={() => setFilter("All")}
              >
                All
              </Button>
              <Button
                className={`${filter == "Active" ? "text-Primary" : "hover:text-TextParagraph focus-visible:text-TextParagraph"}`}
                onPress={() => setFilter("Active")}
              >
                Active
              </Button>

              <Button
                className={`${filter == "Completed" ? "text-Primary" : "hover:text-TextParagraph focus-visible:text-TextParagraph"}`}
                onPress={() => setFilter("Completed")}
              >
                Completed
              </Button>
            </div>
          </div>
        </section>

        <span className="text-TextButton pt-8">
          Drag and Drop to reorder list
        </span>
      </main>
    </>
  );
}

export default App;
