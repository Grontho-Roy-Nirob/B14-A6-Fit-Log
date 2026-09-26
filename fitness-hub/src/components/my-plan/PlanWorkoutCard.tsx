"use client";

import Image from "next/image";
import Link from "next/link";

import { IWorkout } from "@/types/workout.type";
import { useFitLog } from "@/context/FitLogContext";

interface IPlanWorkoutCardProps {
  workout: IWorkout;
  type: "plan" | "saved";
}

const PlanWorkoutCard = ({ workout, type }: IPlanWorkoutCardProps) => {
  const { removeFromPlan, removeFromSaved, markAsDone, isDone } = useFitLog();

  const done = isDone(workout.id);

  const handleRemove = () => {
    if (type === "plan") {
      removeFromPlan(workout.id);
    } else {
      removeFromSaved(workout.id);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-[#272c35] bg-[#15181e] p-3 transition sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-32">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3
          className={`text-sm font-black uppercase ${
            done ? "line-through" : ""
          }`}
        >
          {workout.name}
        </h3>

        <p className="mt-1 text-[10px] text-[#7f8794]">{workout.equipment}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-[#89919e]">
          <span>◷ {workout.duration} min</span>
          <span>♨ {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#39404b] px-4 py-2 text-[10px] text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          View Details
        </Link>

        {type === "plan" && (
          <button
            onClick={() => markAsDone(workout.id)}
            disabled={done}
            className="rounded-full bg-[#ccff00] px-4 py-2 text-[10px] font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✓ {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={handleRemove}
          aria-label="Remove workout"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#39404b] text-[#9ca3af] transition hover:border-red-500 hover:text-red-400"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;
