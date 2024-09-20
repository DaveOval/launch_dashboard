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
    }, 2000); // Simulando una carga
  }, []);

  return (
    <div className="flex">
      <SideNav />
      {isLoading ? (
        <Preload />
      ) : (
        <div className="flex-1 bg-gray-100 p-10">
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
  );
}

export default App;
