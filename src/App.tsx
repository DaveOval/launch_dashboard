import { Routes, Route } from 'react-router-dom';
import { Home, Error, LaunchDetails, LaunchList, Favorites } from './pages';
import { SideNav } from './components/SideNav'; // Asegúrate de que la ruta sea correcta
import { useEffect, useState } from 'react';
import { Preload } from './components/Preload'; // Asegúrate de que la ruta sea correcta

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <div className="flex h-screen">
      <SideNav />
      {isLoading ? (
        <Preload />
      ) : (
        <div className="flex-1 bg-gray-200 overflow-y-scroll">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<LaunchList />} />
            <Route path="/launches/:id" element={<LaunchList />} />
            <Route path="/launch/:id" element={<LaunchDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
