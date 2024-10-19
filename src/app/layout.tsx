import type { Metadata } from "next";
import localFont from "next/font/local";
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";


export const metadata: Metadata = {
  title: "Insta Mart",
  description: "E-commerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={""}
      >
        {children}
      </body>
    </html>
  );
}
