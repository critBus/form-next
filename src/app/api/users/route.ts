import { NextRequest, NextResponse } from "next/server";

let users: any[] = [
  { id: 1, name: "Juan", email: "juan@mail.com" },
  { id: 2, name: "Ana", email: "ana@mail.com" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user = { ...data, id };
  users.push(user);
  return NextResponse.json(user, { status: 201 });
}
