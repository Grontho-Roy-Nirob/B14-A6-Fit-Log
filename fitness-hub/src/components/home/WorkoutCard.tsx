import Image from "next/image";
import Link from "next/link";

import { IWorkout } from "@/types/workout.type";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-lg border border-[#252a32] bg-[#15181e] transition duration-300 hover:-translate-y-1 hover:border-[#3b424e]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#1a1e25]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[9px] font-black uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-sm font-black uppercase">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-[11px] text-[#777f8d]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-3 border-t border-[#252a32] pt-3 text-[10px] text-[#858d9b]">
          <span>◷ {workout.duration} min</span>

          <span>♨ {workout.caloriesBurned} kcal</span>

          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;