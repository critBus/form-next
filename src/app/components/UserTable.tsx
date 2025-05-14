import React from "react";

export type User = { id: number; name: string; email: string };

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
};

export default function UserTable({ users, onEdit, onDelete, onView }: Props) {
  return (
    <table className="min-w-full border mt-4">
      <thead>
        <tr className="">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="p-2 border">{user.id}</td>
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border space-x-2">
              <button className="text-blue-600" onClick={() => onView(user)}>
                Ver
              </button>
              <button className="text-yellow-600" onClick={() => onEdit(user)}>
                Editar
              </button>
              <button className="text-red-600" onClick={() => onDelete(user)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
