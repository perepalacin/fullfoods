import MaxWidthWrapper from "@/components/BackgroundAndMargins/MaxWidthWrapper";
import NavBar from "@/components/navigation/NavBar";
import Sidebar from "@/components/navigation/Sidebar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col w-full bg-background min-h-screen max-h-full">
      <NavBar />
        <div className="flex flex-row h-full w-full">
            {/* TODO: Decide what to do with this. */}
            {/* <Sidebar /> */}
            <MaxWidthWrapper>
              {children}
              <Toaster />
            </MaxWidthWrapper>
          </div>
        </div>
  );
}
