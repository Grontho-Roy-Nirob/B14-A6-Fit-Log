import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

const WorkoutLibrary = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 md:px-6 md:py-10"
    >
      <div className="mb-6">
        <h2 className="text-xl font-black uppercase md:text-2xl">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-xs text-[#7f8794]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {workouts.length === 0 ? (
        <div className="rounded-lg border border-[#252a32] bg-[#15181e] py-16 text-center">
          <p className="text-sm font-bold">No workouts found.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;