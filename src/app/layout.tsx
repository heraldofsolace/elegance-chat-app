import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className}bg-cover bg-center`}>{children}</body>
    </html>
  );
}
