import { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Home, Error, LaunchDetails, LaunchList, Favorites, Map, LatestLaunch, NextLaunch } from './pages';
import { SideNav } from './components/SideNav';
import { Preload } from './components/Preload'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);

  /* Simulated loader for the initial load */
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
            <Route path="/upcomming_launches" element={<NextLaunch />} />
            <Route path="/latest_launch" element={<LatestLaunch />} />
            <Route path="/launch/:id" element={<LaunchDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/map" element={<Map />} />
            {/* Error Page */}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      )}
      {/* Component for rendering notifications */}
      <Toaster expand={false} position="bottom-center" richColors />
    </div>
  );
}

export default App;
