import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/queryprovider";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travelist",
  description: "A key to a better travel",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader
          showSpinner={false}
          initialPosition={0.3}
          speed={1000}
          height={4}
          color="#fece3f"
        />
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer
              autoClose={3000}
              position="bottom-center"
              hideProgressBar
              theme=""
              bodyClassName="dark:text-white text-black "
              toastClassName="dark:text-white text-black border-b-[6px] border-black dark:border-gray-300 dark:bg-black bg-gray-300 dark:bg-neutral-900"
            />
            <Navbar />
            <div className="bg-gray-50 dark:bg-black min-h-[95dvh] h-full relative">
              {modal}
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
