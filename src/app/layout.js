import { Inter } from "next/font/google";
import "./globals.css";
import ProviderRegistery from "@/theme/ProviderRegistery";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Souloquest",
  description:
    "Explore limitless possibilities with our comprehensive travel management platform. From seamless tour creation to efficient booking management and collaborative networking, elevate your travel agency's success with us.",
  keywords: [
    "best travel agency",
    "north india tours",
    "south india tours",
    "kashmir trips",
    "gulmarg trips",
    "sonmarg trips",
    "kedarnath trip",
    "meghalaya trip",
    "best b2b travel agent package",
  ],
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ProviderRegistery>{children}</ProviderRegistery>
        </body>
      </html>
    </SessionProvider>
  );
}
