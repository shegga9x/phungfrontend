"use client";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ThemeProvider } from "@/components/theme-provider";
import RecoidContextProvider from "./recoilContextProvider";
import { SnackbarProvider } from "notistack";
import { Helmet, HelmetProvider } from "react-helmet-async";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable)}>
        <ThemeProvider>
          <RecoidContextProvider>
            <MantineProvider>
              <HelmetProvider>
                <Helmet>
                  <title>BookStore</title>
                </Helmet>
                <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                  {children}
                </SnackbarProvider>
              </HelmetProvider>
            </MantineProvider>
          </RecoidContextProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
