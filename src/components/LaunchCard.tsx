// LaunchCard.tsx
import { Link } from 'react-router-dom';
import { convertUTCDateToLocalDate } from '../utils/convertUTC';



export const LaunchCard = ({ launch } : any) => {


    const date = convertUTCDateToLocalDate(launch.date_local);
    const result = launch.success ? 'Success' : 'Failed';

  return (
    <>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 flex flex-row justify-between w-100">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Flight {launch.flight_number}</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300"> {date}</span>
            </div>
            <Link to={`/launch/${launch.id}`}>
                <img className="rounded-t-lg" src={launch.links.patch.small} alt={launch.name}  loading="lazy" />
            </Link>
            <div className="p-5">
                <Link to={`/launch/${launch.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{launch.name}</h5>
                </Link>
                <p className='mb-2 text-normal font-semibold text-gray-700 dark:text-gray-400'>Result: { result }</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{launch.details}</p>
                <Link to={`/launch/${launch.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    
    </>
  );
};
