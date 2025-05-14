import { User } from "./UserTable";

type Props = {
  user: User;
  onClose: () => void;
};

export default function UserView({ user, onClose }: Props) {
  return (
    <div className=" p-4 rounded shadow max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Detalle de Usuario</h2>
      <div>
        <b>ID:</b> {user.id}
      </div>
      <div>
        <b>Nombre:</b> {user.name}
      </div>
      <div>
        <b>Email:</b> {user.email}
      </div>
      <button className="mt-4 bg-blue-600 px-4 py-2 rounded" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
}
