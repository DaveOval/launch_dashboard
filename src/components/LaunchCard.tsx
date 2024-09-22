import { Link } from 'react-router-dom';
import { convertUTCDateToLocalDate } from '../utils/convertUTC';

export const LaunchCard = ({ launch } : any) => {

    const date = convertUTCDateToLocalDate(launch.date_local);
    const result = launch.success ? 'Success' : 'Failed';

    return (
        <div className="max-w-[300px] min-w-[300px]  bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Flight {launch.flight_number} </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400"> {date} </span>
            </div>
            <Link to={`/launch/${launch.id}`}>
                <img 
                    className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-105" 
                    src={launch.links.patch.small} 
                    alt={launch.name}  
                    loading="lazy" 
                />
            </Link>
            <div className="p-6">
                <Link to={`/launch/${launch.id}`}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">{launch.name}</h5>
                </Link>
                <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-400'>Result: <span className={launch.success ? 'text-green-500' : 'text-red-500'}>{result}</span></p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-5">{launch.details || 'No additional details available.'}</p>
                <Link to={`/launch/${launch.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                    View more
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
};
