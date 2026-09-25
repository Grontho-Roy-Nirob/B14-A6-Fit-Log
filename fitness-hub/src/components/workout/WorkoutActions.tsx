"use client";

import { IWorkout } from "@/types/workout.type";
import { useFitLog } from "@/context/FitLogContext";

const WorkoutActions = ({ workout }: { workout: IWorkout }) => {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan}
        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {alreadyInPlan
          ? "Already in today's plan"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() => saveWorkout(workout)}
        disabled={alreadySaved}
        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#3a404a] px-5 py-3 text-xs font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-40"
      >
      {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;