import { Fira_Code, Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({
  variable: "--font-admin-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-admin-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${firaSans.variable} ${firaCode.variable} admin-app`}>
      {children}
    </div>
  );
}
