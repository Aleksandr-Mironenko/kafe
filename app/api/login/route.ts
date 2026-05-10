// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import crypto from "crypto"

// function sign(value: string) {
//   return crypto
//     .createHmac("sha256", process.env.SESSION_SECRET!)
//     .update(value)
//     .digest("hex")
// }

// export async function POST(req: Request) {
//   const { login, password } = await req.json()

//   const validLogin = process.env.ADMIN_LOGIN
//   const validHash = process.env.ADMIN_PASSWORD_HASH

//   if (login !== validLogin) {
//     return NextResponse.json({ error: "Invalid" }, { status: 401 })
//   }

//   const isValid = await bcrypt.compare(password, validHash!)

//   if (!isValid) {
//     return NextResponse.json({ error: "Invalid" }, { status: 401 })
//   }

//   // ✅ подписанная cookie
//   const value = "admin"
//   const signature = sign(value)

//   const res = NextResponse.json({ ok: true })

//   res.cookies.set("auth", `${value}.${signature}`, {
//     httpOnly: true,
//     secure: true,
//     path: "/",
//     maxAge: 60 * 60 * 24
//   })

//   return res
// }

//-------------------------------------
// app/api/login/route.ts
// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import crypto from "crypto"

// export async function POST(req: Request) {
//   const { login, password } = await req.json()
//   console.log("INPUT:", login, password)
//   console.log("ENV:", process.env.ADMIN_LOGIN, process.env.ADMIN_PASSWORD_HASH)
//   if (login !== process.env.ADMIN_LOGIN) {
//     return NextResponse.json({ error: "no" }, { status: 401 })
//   }

//   const ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)

//   if (!ok) {
//     return NextResponse.json({ error: "no" }, { status: 401 })
//   }

//   // 🔐 создаём подпись (НО тут Node runtime — crypto можно)
//   const signature = crypto
//     .createHmac("sha256", process.env.SESSION_SECRET!)
//     .update("admin")
//     .digest("hex")

//   const token = `admin.${signature}`

//   const res = NextResponse.json({ ok: true })

//   res.cookies.set("auth", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24
//   })

//   return res
// }

//-------------------------------------------
// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"


// console.log(
//   bcrypt.hashSync("Ekaterina21Aleksandr27Koba25", 10)
// )
// export async function POST(req: Request) {
//   const { login, password } = await req.json()

//   const envLogin = process.env.ADMIN_LOGIN
//   const envHash = process.env.ADMIN_PASSWORD_HASH

//   const cleanLogin = login?.trim()
//   const cleanPassword = password?.trim()

//   console.log("INPUT:", cleanLogin, cleanPassword)
//   console.log("ENV:", envLogin)
//   console.log("envHash", envHash)
//   console.log("envHash", envHash?.length)

//   // 1. проверка логина
//   if (cleanLogin !== envLogin) {
//     return NextResponse.json({ error: "invalid login" }, { status: 401 })
//   }

//   // 2. проверка пароля через bcrypt
//   const isValid = await bcrypt.compare(cleanPassword, envHash!)

//   if (!isValid) {
//     return NextResponse.json({ error: "invalid password" }, { status: 401 })
//   }

//   // 3. создаём сессию (простая версия)
//   const res = NextResponse.json({ ok: true })

//   res.cookies.set("auth", "admin", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24
//   })

//   return res
// }

//-----------------------

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sign } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const login = body?.login?.trim()
    const password = body?.password?.trim()

    const envLogin = process.env.ADMIN_LOGIN
    const envHash = process.env.ADMIN_PASSWORD_HASH

    // проверка env
    if (!envLogin || !envHash) {
      return NextResponse.json(
        { error: "server config error" },
        { status: 500 }
      )
    }

    // проверка логина
    if (login !== envLogin) {
      return NextResponse.json(
        { error: "invalid login" },
        { status: 401 }
      )
    }

    // проверка пароля
    const isValid = await bcrypt.compare(
      password,
      envHash
    )

    if (!isValid) {
      return NextResponse.json(
        { error: "invalid password" },
        { status: 401 }
      )
    }

    // создаём signed token
    const token = await sign("admin")

    const res = NextResponse.json({
      ok: true,
    })

    // сохраняем cookie
    res.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return res
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}