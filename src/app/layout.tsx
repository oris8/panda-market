import type { Metadata } from "next";
import Header from "@/components/Layout/Header";
import Container from "@/components/Layout/Container";
import Footer from "@/components/Layout/Footer";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "판다마켓입니다",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <Header />
          <Container>{children}</Container>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
