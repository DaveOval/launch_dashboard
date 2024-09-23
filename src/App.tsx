import { Routes, Route } from 'react-router-dom';
import { Home, Error, LaunchDetails, LaunchList, Favorites, Map, LatestLaunch } from './pages';
import { SideNav } from './components/SideNav';
import { useEffect, useState } from 'react';
import { Preload } from './components/Preload'; 

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
            <Route path="/upcomming_launches" element={<LaunchList />} />
            <Route path="/latest_launch" element={<LatestLaunch />} />
            <Route path="/launch/:id" element={<LaunchDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/map" element={<Map />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
