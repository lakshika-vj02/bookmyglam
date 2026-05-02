import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}