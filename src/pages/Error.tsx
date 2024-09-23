
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex flex-col bg-slate-950 h-screen">
      <div className="flex flex-col">
        <div 
          className="relative w-auto h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url(/space.webp)' }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div> 

          <div className="relative z-10 text-center p-5">
            <h1 className="text-5xl font-bold text-white mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-white mb-4">Oops! It looks like the page you're looking for doesn't exist.</p>
            <Link to="/">
              <button className="mt-4 text-white bg-transparent border border-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
