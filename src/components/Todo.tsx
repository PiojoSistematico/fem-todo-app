import { Button } from "react-aria-components";
import { IconCheck, IconCross } from "./Icons";

type TodoProps = {
  todo: { description: string; completed: boolean };
  index: number;
  removeTodo: (id: number) => void;
  changeComplete: (id: number) => void;
  dragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  dragEnter: (e: React.DragEvent<HTMLLIElement>) => void;
  dropItem: () => void;
};

const Todo: React.FunctionComponent<TodoProps> = ({
  todo,
  index,
  removeTodo,
  changeComplete,
  dragStart,
  dragEnter,
  dropItem,
}) => {
  return (
    <>
      <li
        className="flex flex-row items-center justify-between bg-BackgroundTodo p-4 text-TextParagraph cursor-grab"
        onDragStart={(e) => dragStart(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragEnd={() => dropItem()}
        draggable
        id={`${index}`}
      >
        <div className="flex flex-row items-center gap-2">
          <Button
            onPress={() => changeComplete(index)}
            className={`w-6 h-6 flex flex-row items-center justify-center rounded-full ${
              todo.completed
                ? `bg-gradient-to-r from-Gradient1 to-Gradient2`
                : `border-solid border-Border border`
            } `}
          >
            {todo.completed ? <IconCheck></IconCheck> : null}
          </Button>

          <p
            className={todo.completed ? "line-through text-TextButton" : "null"}
          >
            {todo.description}
          </p>
        </div>
        <Button onPress={() => removeTodo(index)}>
          <IconCross></IconCross>
        </Button>
      </li>
    </>
  );
};

export default Todo;
