import { Link } from "react-router-dom"

interface LaunchBannerProps  {
    title: string,
    description: string,
    img: string,
    link: string,
    reverse: boolean,
    alt: string
}

export const LaunchsBanner = ({title, description, img, link, reverse, alt } : LaunchBannerProps) => {
  return (
    <div className={`flex flex-col w-full justify-around content-center bg-black mt-4 mb-4 p-7 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className="content-center">
        <p className="text-5xl text-white ">{title}</p>
        <p className="text-xl text-white ">{ description }</p>
        <Link to={`/${link}`}>
            <button type="button" className="mt-4 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
           See more
            </button>
        </Link>
        </div>
        <div>
        <figure className="max-w-lg">
        <img className="h-auto max-w-full rounded-lg" src={img} alt={alt} />
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{alt}</figcaption>
        </figure>
        </div>
    </div>
  )
}
