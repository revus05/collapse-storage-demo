import { Geist_Mono, Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "@/components/cosmic-background";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { getSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { ReduxProvider } from "@/store/provider";

const notoSansHeading = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Read session server-side and pass to Redux as preloaded state
  const user = await getSession();

  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        notoSansHeading.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <ReduxProvider user={user}>
            {user && <Header />}
            {children}
            <CosmicBackground />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
