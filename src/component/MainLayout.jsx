import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}