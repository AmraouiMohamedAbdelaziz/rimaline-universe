import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const parent = await prisma.parent.findUnique({ where: { email } });
    if (!parent) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, parent.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const res = NextResponse.json(
      { id: parent.id, email: parent.email, fullName: parent.fullName },
      { status: 200 }
    );

    // ⚠️ MVP: cookie très simple avec l'id parent
    res.cookies.set("parentId", parent.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // secure: true en prod
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
