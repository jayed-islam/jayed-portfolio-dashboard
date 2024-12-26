import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import MuiThemeProvider from "@/theme/MuiThemeProvider";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import LocalizationProvider from "@/theme/localization-provider";
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bekreta",
  icons: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansBengali.className} antialiased`}>
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <LocalizationProvider>
              <ReduxProvider>
                <Toaster />
                {children}
              </ReduxProvider>
            </LocalizationProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
