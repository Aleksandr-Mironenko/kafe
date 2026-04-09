
// import { createClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";
// import { createServerClient } from "@supabase/ssr";

// export const supabaseServerSecret = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );



// export function supabaseServerPublic() {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: async () => (await cookies()).getAll(),
//         setAll: () => { }
//       }
//     }
//   );
// }


import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
