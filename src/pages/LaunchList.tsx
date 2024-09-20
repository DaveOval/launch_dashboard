import { LaunchCard, Loader } from "../components";
import { useFetch } from "../hooks"


export const LaunchList = () => {

  const { data, loading, error } = useFetch("https://api.spacexdata.com/v4/launches", {});

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <div>Error</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Launches</h1>
      <div className="flex flex-wrap justify-center gap-3">
        {data.map((launch: any) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  )
}
