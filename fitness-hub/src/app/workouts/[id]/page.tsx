import Image from "next/image";
import { notFound } from "next/navigation";

import { getWorkout } from "@/lib/api";
import WorkoutActions from "@/components/workout/WorkoutActions";

interface IWorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0f12]">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:py-9">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* IMAGE  */}
          <div className="relative h-[500px] translate-y-4 object-contain w-full overflow-hidden rounded-[10px] border border-[#252a32] bg-[#15181e] lg:h-[502px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="mt-3 text-[28px] font-black uppercase leading-[1.05] tracking-[-0.5px] text-white md:text-[30px]">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-2 max-w-xl text-[12px] leading-[1.55] text-[#858c98]">
              {workout.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-5">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#caff00] px-3 py-1 text-[9px] font-black uppercase leading-none text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* SPECS */}
            <div className="mt-5 overflow-hidden rounded-[11px] border border-[#272c35] bg-[#15181e]">
              <SpecRow label="EQUIPMENT" value={workout.equipment} />
              <SpecRow label="DIFFICULTY" value={workout.difficulty} />
              <SpecRow label="SETS" value={String(workout.sets)} />
              <SpecRow label="REPS" value={workout.reps} />
              <SpecRow label="DURATION" value={`${workout.duration} min`} />
              <SpecRow
                label="CALORIES"
                value={`${workout.caloriesBurned} kcal`}
              />
              <SpecRow label="RATING" value={String(workout.rating)} />
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-5">
              <h2 className="text-[11px] font-black uppercase tracking-[0.4px] text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-3 space-y-2.5">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-2.5 text-[10px] leading-[1.6] text-[#9299a5]"
                  >
                    <span className="shrink-0 text-[#a8b4c3]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* SPEC ROW */
const SpecRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex min-h-[39px] items-center justify-between border-b border-[#252a32] px-4 last:border-b-0">
      <span className="text-[8px] font-bold tracking-[0.4px] text-[#7d8592]">
        {label}
      </span>

      <span className="text-[10px] text-[#e3e5e8]">{value}</span>
    </div>
  );
};

export default WorkoutDetailsPage;
