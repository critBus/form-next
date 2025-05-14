import { NextRequest, NextResponse } from "next/server";

let users: any[] = [
  { id: 1, name: "Juan", email: "juan@mail.com" },
  { id: 2, name: "Ana", email: "ana@mail.com" },
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = users.find((u) => u.id === Number(id));
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idx = users.findIndex((u) => u.id === Number(id));
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const data = await req.json();
  users[idx] = { ...users[idx], ...data };
  return NextResponse.json(users[idx]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idx = users.findIndex((u) => u.id === Number(id));
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  users.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
