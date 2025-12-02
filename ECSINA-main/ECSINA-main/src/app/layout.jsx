import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      {children}
    </html>
  );
}
