import { Button } from "react-aria-components";
import { IconCross } from "./Icons";
import Circle from "./circle";

type TodoProps = {
  description: string;
  completed: boolean;
};

const Todo: React.FunctionComponent<TodoProps> = ({
  description,
  completed,
}) => {
  return (
    <>
      <li className="flex flex-row items-center justify-between bg-white p-4">
        <div className="flex flex-row items-center gap-2">
          <Circle completed={completed}></Circle>
          <p>{description}</p>
        </div>
        <Button>
          <IconCross></IconCross>
        </Button>
      </li>
    </>
  );
};

export default Todo;
