"use client";
import { useEffect, useState } from "react";
import UserTable, { User } from "./UserTable";
import UserForm from "./UserForm";
import UserView from "./UserView";

type Mode = "list" | "add" | "edit" | "view";

export default function UserCrud() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [mode, setMode] = useState<Mode>("list");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (data: Omit<User, "id">) => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setMode("list");
    fetchUsers();
  };

  const handleEdit = async (data: Omit<User, "id">) => {
    if (!selected) return;
    await fetch(`/api/users/${selected.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setMode("list");
    setSelected(null);
    fetchUsers();
  };

  const handleDelete = async (user: User) => {
    await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl mb-4">CRUD de Usuarios</h1>
      {mode === "list" && (
        <>
          <button
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setMode("add")}
          >
            Agregar Usuario
          </button>
          <UserTable
            users={users}
            onEdit={(user) => {
              setSelected(user);
              setMode("edit");
            }}
            onDelete={handleDelete}
            onView={(user) => {
              setSelected(user);
              setMode("view");
            }}
          />
        </>
      )}
      {mode === "add" && (
        <UserForm onSubmit={handleAdd} onCancel={() => setMode("list")} />
      )}
      {mode === "edit" && selected && (
        <UserForm
          initial={selected}
          onSubmit={handleEdit}
          onCancel={() => {
            setMode("list");
            setSelected(null);
          }}
        />
      )}
      {mode === "view" && selected && (
        <UserView
          user={selected}
          onClose={() => {
            setMode("list");
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
