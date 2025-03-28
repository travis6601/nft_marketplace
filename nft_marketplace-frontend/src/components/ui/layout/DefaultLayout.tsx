"use client";

import Header from "~/components/ui/layout/Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default DefaultLayout;
