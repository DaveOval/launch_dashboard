// LaunchCard.tsx
import React from 'react';

interface LaunchCardProps {
  launch: any; // Define el tipo según la estructura de tus datos
}

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{launch.name}</h2>
        <p className="text-gray-700 text-base">
          Date: {new Date(launch.date_utc).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-base">
          {launch.details || 'No details available.'}
        </p>
      </div>
    </div>
  );
};
