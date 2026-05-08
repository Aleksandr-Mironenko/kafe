import { NextRequest, NextResponse } from "next/server"
import { searchDishes } from "@/services/dishService"

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query") || ""

    if (!query.trim()) {
      return NextResponse.json([])
    }

    const dishes = await searchDishes(query)

    return NextResponse.json(dishes)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Search error",
      },
      {
        status: 500,
      }
    )
  }
}