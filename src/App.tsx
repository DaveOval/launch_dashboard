import { Routes, Route } from 'react-router-dom';
import { Home, Error, LaunchDetails, LaunchList, Favorites } from "./pages";
import { SideNav, Preload } from './components';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <div className="flex h-screen">
      {/* SideNav */}
      <SideNav />

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        {isLoading ? (
          <Preload />  // Mostramos el preloader si la app está cargando
        ) : (
          <div className="p-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/launchs" element={<LaunchList />} />
              <Route path="/launch/:id" element={<LaunchDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
