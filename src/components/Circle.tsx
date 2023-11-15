import { IconCheck } from "./Icons";

type CircleProps = {
  completed: boolean;
};

const circle: React.FunctionComponent<CircleProps> = ({ completed }) => {
  return (
    <>
      {completed ? (
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-2 to-primary-3 flex flex-row items-center justify-center">
          <IconCheck></IconCheck>
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full border-solid border-light-3 border"></div>
      )}
    </>
  );
};

export default circle;
