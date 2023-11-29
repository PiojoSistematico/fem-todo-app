import { Button } from "react-aria-components";
import { IconCheck, IconCross } from "./Icons";

type TodoProps = {
  todo: { description: string; completed: boolean };
  index: number;
  removeTodo: (id: number) => void;
  changeComplete: (id: number) => void;
};

const Todo: React.FunctionComponent<TodoProps> = ({
  todo,
  index,
  removeTodo,
  changeComplete,
}) => {
  return (
    <>
      <li className="flex flex-row items-center justify-between bg-white p-4">
        <div className="flex flex-row items-center gap-2">
          <Button
            onPress={() => changeComplete(index)}
            className={`w-6 h-6 flex flex-row items-center justify-center rounded-full ${
              todo.completed
                ? `bg-gradient-to-r from-primary-2 to-primary-3`
                : `border-solid border-light-3 border`
            } `}
          >
            {todo.completed ? <IconCheck></IconCheck> : null}
          </Button>

          <p className={todo.completed ? "line-through" : null}>
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
