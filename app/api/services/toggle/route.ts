// import { NextRequest, NextResponse } from 'next/server'
// import { toggleService } from '@/services/servicesServise'

// export async function PATCH(req: NextRequest) {
//   try {
//     const { id, is_available } = await req.json()

//     if (!id) {
//       return NextResponse.json({ error: 'Servce ID required' }, { status: 400 })
//     }

//     const data = await toggleService(id, is_available)

//     return NextResponse.json({ service: data }, { status: 200 })
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : 'Unknown error'
//     return NextResponse.json({ error: message }, { status: 500 })
//   }
// }