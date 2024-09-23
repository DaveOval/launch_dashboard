import { Loader } from "../components";
import { useFetch } from "../hooks";

interface Launch {
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
  crew: string[];
  flight_number: number;
  cores: {
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
  }[];
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      launch: string | null;
    };
    webcast: string;
    wikipedia: string | null;
    youtube_id: string | null;
  };
}

export const NextLaunch = () => {
  const { data, loading, error } = useFetch<Launch>(`https://api.spacexdata.com/v4/launches/next`);

  if (loading) {
    return <Loader />
  }
  if (error) return <p className="text-center text-red-600">Error loading data</p>;

  return (
    <div className="p-6  min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Launch: {data.name}</h1>
          <img
            src={data.links.patch.large}
            alt={`${data.name} patch`}
            className="w-32 h-32 rounded-lg shadow-md"
          />
        </div>

        {/* Grid Layout for Launch Details and Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Details */}
          <div className="space-y-4">
            <p><strong>Flight Number:</strong> {data.flight_number}</p>
            <p><strong>Date (UTC):</strong> {new Date(data.date_utc).toLocaleString()}</p>
            <p><strong>Results:</strong> {data.success ? <span className="text-green-600">Success</span> : <span className="text-red-600">Failed</span>}</p>
            <p><strong>Rocket ID:</strong> {data.rocket}</p>

            {/* Crew Members */}
            {data.crew.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Crew Members</h2>
                <ul className="list-disc list-inside">
                  {data.crew.map((member) => (
                    <li key={member}>Crew ID: {member}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Info */}
            {data.cores.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Core Details</h2>
                {data.cores.map((core, index) => (
                  <div key={index} className="border-t pt-2 mt-2">
                    <p><strong>Flight:</strong> {core.flight}</p>
                    <p><strong>Gridfins:</strong> {core.gridfins ? "Yes" : "No"}</p>
                    <p><strong>Legs:</strong> {core.legs ? "Yes" : "No"}</p>
                    <p><strong>Reused:</strong> {core.reused ? "Yes" : "No"}</p>
                    <p><strong>Landing Success:</strong> {core.landing_success ? "Yes" : "No"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - YouTube Video */}
          <div className="flex justify-center">
            <iframe 
              width="560" 
              height="315" 
              src={`https://www.youtube.com/embed/${data.links.youtube_id}`}
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen></iframe>
          </div>
        </div>

        {/* Links Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Additional Links</h2>
          {data.links.reddit.launch && (
            <p className="mb-2">
              <strong>Reddit Discussion: </strong>
              <a
                href={data.links.reddit.launch}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-400 transition-colors"
              >
                Reddit Launch Discussion
              </a>
            </p>
          )}
          <p className="mb-2">
            <strong>Wikipedia: </strong>
            <a
              href={`${data.links.wikipedia}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-400 transition-colors"
            >
              Learn More on Wikipedia
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
