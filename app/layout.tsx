"use client";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import { ThemeProvider } from "@/components/theme-provider";
import RecoidContextProvider from "./recoilContextProvider";
import Head from "next/head";
import CommonLayout from "@/components/v2/Layout";
import { SnackbarProvider } from "notistack";

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
      <Head>
        <ColorSchemeScript />
        <title>Bookstore Home</title>
        <meta name='description' content='Bookstore Home Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider>
          <RecoidContextProvider>
            <MantineProvider>
              <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                {children}
              </SnackbarProvider>
            </MantineProvider>
          </RecoidContextProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
