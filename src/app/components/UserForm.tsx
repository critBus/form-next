import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "./UserTable";

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  initial?: Partial<User>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

export default function UserForm({ initial, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-4 rounded shadow max-w-sm mx-auto"
    >
      <div className="mb-4">
        <label className="block mb-1">Nombre</label>
        <input
          {...register("name")}
          className="w-full border p-2 rounded"
          disabled={isSubmitting}
        />
        {errors.name && (
          <div className="text-red-600 text-sm">{errors.name.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          {...register("email")}
          className="w-full border p-2 rounded"
          disabled={isSubmitting}
        />
        {errors.email && (
          <div className="text-red-600 text-sm">{errors.email.message}</div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={isSubmitting}
        >
          Guardar
        </button>
        <button
          type="button"
          className="bg-amber-400 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
