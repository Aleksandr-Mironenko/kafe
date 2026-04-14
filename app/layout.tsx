import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bor-food.ru"),

  title: {
    default: "Bor Food — кафе и кейтеринг в г. Бор",
    template: "%s | Bor Food",
  },

  description:
    "Bor Food — кафе и кейтеринг в Бору. Банкеты, поминки, корпоративы, выездное обслуживание и корпоративное питание в городе Бор",

  alternates: {
    canonical: "https://bor-food.ru",
  },

  robots: {
    index: false,//true
    follow: false,//true
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://bor-food.ru",
    siteName: "Bor Food",
    title: "Bor Food — кафе и кейтеринг в Бору",
    description:
      "Кафе Bor Food: банкеты, корпоративы, поминки, корпоративное питание и кейтеринг в г. Бор.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bor Food",
    description:
      "Кафе и кейтеринг в г. Бор. Банкеты, корпоративы, поминки, корпоративное питание.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>

        {/* Cafe Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "Bor Food",
              description:
                "Кафе Bor Food в Бору: банкеты, поминки, корпоративы, кейтеринг и корпоративное питание.",
              url: "https://bor-food.ru",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Неклюдово, 1",
                addressLocality: "Бор",
                addressRegion: "Нижегородская область",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 56.404115,
                longitude: 44.006722,
              },
              category: "Restaurant",
              servesCuisine: "Русская кухня",
              openingHours: [
                "Mo-Su 09:00-20:00"
              ],
              priceRange: "₽₽",
              telephone: "+7-961-638-50-60",
              email: "n.tranceva@mail.ru",
              // sameAs: [
              //   "https://t.me/ТВОЙ_ТГ",
              //   "https://vk.com/ТВОЙ_ВК",
              //   "https://max.ru/ТВОЙ_MAX"
              // ],
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bor Food",
              url: "https://bor-food.ru",
              logo: "https://bor-food.ru/logo.png",
              telephone: "+7-961-638-50-60",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-961-638-50-60",
                contactType: "customer service"
              },
              // sameAs: [
              //   "https://t.me/ТВОЙ_ТГ",
              //   "https://vk.com/ТВОЙ_ВК",
              //   "https://max.ru/ТВОЙ_MAX"
              // ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}