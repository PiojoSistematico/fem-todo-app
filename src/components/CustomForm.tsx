import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  description: z
    .string()
    .min(5, { message: "Todos should have at least 5 characters" }),
});

type TypeSchema = z.infer<typeof FormSchema>;

type TodoProps = {
  description: string;
  completed: boolean;
};

type FormTypes = {
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
};

const CustomForm: React.FunctionComponent<FormTypes> = ({ setTodos }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: TypeSchema) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTodos((prev) => [
      ...prev,
      { description: data.description, completed: false },
    ]);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="relative bg-white rounded-md py-6 px-4 flex flex-row gap-2 items-center"
    >
      <div className="w-4 h-4 rounded-full border-solid border-light-3 border"></div>

      <input
        {...register("description")}
        placeholder="Create a new todo..."
        name="description"
        className=""
      ></input>
      {errors.description && (
        <p className="absolute left-4 -bottom-1 p-1 text-sm text-red-500">
          {errors.description.message}
        </p>
      )}
      <input type="submit" hidden></input>
    </form>
  );
};

export default CustomForm;
