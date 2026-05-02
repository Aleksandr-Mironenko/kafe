import { NextResponse } from "next/server";
import { updatePublicImage, updatePublicField } from "@/services/publicInfoServise";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // --- 1. Если пришёл файл (FormData) ---
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      const field = formData.get("field") as string;

      if (!file || !field) {
        return NextResponse.json(
          { error: "file и field обязательны" },
          { status: 400 }
        );
      }

      const data = await updatePublicImage(file);
      return NextResponse.json({ success: true, data });
    }

    // --- 2. Если пришёл JSON (обычное поле) ---
    const { field, value } = await req.json();

    if (!field || value === undefined) {
      return NextResponse.json(
        { error: "field и value обязательны" },
        { status: 400 }
      );
    }

    const data = await updatePublicField(field, value);
    return NextResponse.json({ success: true, data });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
