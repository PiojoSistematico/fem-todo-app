import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Circle from "./Circle";

const FormSchema = z.object({
  text: z
    .string()
    .min(3, { message: "Todos should have at least 3 characters" }),
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
    formState: { errors, isSubmitting },
  } = useForm<TypeSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: TypeSchema) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    /*     if (type == "reply") {
      const newParent: Comment = [...comments].filter(
        (elem) => elem.id == parent,
      )[0];
      newParent.replies.push(newid); */

    /*       setComments([
        ...comments.filter((elem) => elem.id != parent),
        {
          id: newid,
          content: data.text,
          createdAt: "1 min ago",
          score: 1,
          user: currentUser,
          replies: [],
          original: original,
        },
        newParent,
      ]);

      setIsReplyOpen(false);
    } else {
      setComments([
        ...comments,
        {
          id: newid,
          content: data.text,
          createdAt: "1 min ago",
          score: 1,
          user: currentUser,
          replies: [],
          original: original,
        },
      ]);
    } */
    reset();
  }

  /* function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    )?.value;

    if (description) {
      setTodos((prev) => [...prev, { description, completed: false }]);

      form.reset();
    }
  } */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="flex flex-col gap-4 rounded-md bg-neutral-5 p-4"
    >
      <Circle completed={false}></Circle>

      <input
        {...register("text")}
        placeholder="Create a new todo..."
        type="text"
        className="w-full"
      ></input>
      {errors.text && (
        <p className="p-1 text-sm text-red-500">{errors.text.message}</p>
      )}
    </form>
  );
};

export default CustomForm;
