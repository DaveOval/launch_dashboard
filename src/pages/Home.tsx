import { LaunchsBanner } from "../components"
import { banner_info } from "../data/banner_info"

export const Home = () => {
  return (
    <div className="flex flex-col">
      
      <img className="w-full h-auto max-h-[200px] object-cover" src="/space.jpg" alt="image description" />

      <div className="flex flex-col">

        <h1 className="text-4xl font-thin text-gray-900 dark:text-black p-5" >SpaceX Dashboard </h1>

        {
          banner_info.map( banner => {
            return (
              <LaunchsBanner 
                title={banner.title}
                img={banner.img}
                description={banner.description}
                link={banner.link}
                key={1}
              />
            )
          })
        }

        

      </div>


    </div>
  )
}
