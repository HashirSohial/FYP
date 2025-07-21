import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { ManufacturerDashboard } from './components/ManufacturerDashboard';
import { VendorProductsPage } from './components/ConsumerPortal';
import { ProductHistory } from './components/ProductHistory';

export type CurrentPage = 'home' | 'manufacturer' | 'consumer' | 'admin' | 'fraud' | 'history';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [bytecodeFromUrl, setBytecodeFromUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bytecode = params.get('bytecode') as string;

    if (bytecode) {
      // alert(`Bytecode from URL: ${bytecode}`);
      setBytecodeFromUrl(bytecode);

      // Optional: redirect to some page based on bytecode
      setCurrentPage('history'); // or 'consumer', etc.
    }
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'manufacturer':
        return <ManufacturerDashboard />;
      case 'consumer':
        return <VendorProductsPage />;
      case 'history':
        return <ProductHistory bytecode={bytecodeFromUrl} />; // pass it as prop if needed
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="transition-all duration-500 ease-in-out">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
