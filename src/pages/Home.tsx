import { Link } from "react-router-dom"
import { LaunchsBanner } from "../components"
import { banner_info } from "../data/banner_info"

export const Home = () => {
  return (
    <div className="flex flex-col bg-slate-950">
      <div className="flex flex-col">
        <div 
          className="relative w-auto h-[700px] flex items-center justify-center bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url(/space.webp)' }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div> 

          <div className="relative z-10 text-center p-5">
            <h1 className="text-5xl font-bold text-white mb-4">SpaceX Dashboard</h1>
            <Link to="/launches">
            <button className="mt-4 text-white bg-transparent border border-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">
                See launches
              </button>
            </Link>
          </div>
        </div>

        {
          banner_info.map( ( banner , index ) => {
            return (
              <LaunchsBanner 
                title={banner.title}
                img={banner.img}
                description={banner.description}
                link={banner.link}
                reverse={index % 2 === 1}
                alt={banner.altText}
                key={index}
              />
            )
          })
        }

      </div>

    </div>
  )
}
