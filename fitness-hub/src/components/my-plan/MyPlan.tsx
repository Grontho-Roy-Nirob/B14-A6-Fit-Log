"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useFitLog } from "@/context/FitLogContext";
import PlanWorkoutCard from "./PlanWorkoutCard";
import SortDropdown from "./SortDropdown";

type SortType = "duration" | "calories" | "rating";
type TabType = "plan" | "saved";

const MyPlan = () => {
  const { plan, saved } = useFitLog();

  const [activeTab, setActiveTab] = useState<TabType>("plan");
  const [sortBy, setSortBy] = useState<SortType>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    const list = [...currentList];

    if (sortBy === "duration") {
      list.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      list.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    }

    if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [currentList, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-14">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-black uppercase md:text-4xl">MY PLAN</h1>

        <p className="mt-2 text-sm text-[#7f8794]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-7 grid grid-cols-1 overflow-hidden rounded-xl border border-[#272c35] bg-[#15181e] sm:grid-cols-3">
        <Metric label="Exercises" value={plan.length} accent />

        <Metric label="Minutes" value={totalMinutes} />

        <Metric label="Calories" value={totalCalories} />
      </div>

      {/* Tabs + Sort */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit rounded-lg border border-[#272c35] bg-[#15181e] p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-5 py-2 text-xs ${
              activeTab === "plan"
                ? "bg-[#252a32] text-white"
                : "text-[#737b89]"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-5 py-2 text-xs ${
              activeTab === "saved"
                ? "bg-[#252a32] text-white"
                : "text-[#737b89]"
            }`}
          >
            Saved
          </button>
        </div>

        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {/* Workout List */}
      <div className="mt-5 space-y-3">
        {sortedList.length > 0 ? (
          sortedList.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              type={activeTab}
            />
          ))
        ) : (
          <EmptyState tab={activeTab} />
        )}
      </div>
    </div>
  );
};

const Metric = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) => {
  return (
    <div className="border-b border-[#272c35] p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-[10px] text-[#7f8794]">{label}</p>

      <p
        className={`mt-1 text-3xl font-black ${
          accent ? "text-[#ccff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const EmptyState = ({ tab }: { tab: TabType }) => {
  return (
    <div className="flex min-h-[245px] flex-col items-center justify-center rounded-xl border border-dashed border-[#2c323b] text-center">
      <h2 className="text-lg font-black uppercase">NOTHING HERE YET</h2>

      <p className="mt-2 text-xs text-[#7f8794]">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save a workout from the library to find it here."}
      </p>

      <Link
        href="/"
        className="mt-5 rounded-full bg-[#ccff00] px-6 py-2.5 text-xs font-black text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
};

export default MyPlan;
