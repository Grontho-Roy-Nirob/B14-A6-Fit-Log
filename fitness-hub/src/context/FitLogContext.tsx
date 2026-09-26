"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout.type";

interface IFitLogContext {
  plan: IWorkout[];
  saved: IWorkout[];
  doneIds: number[];

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const FitLogContext = createContext<IFitLogContext | undefined>(undefined);

export const FitLogProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedDone = localStorage.getItem("fitlog-done");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedDone) {
      setDoneIds(JSON.parse(storedDone));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds, isLoaded]);

  const addToPlan = (workout: IWorkout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.info("Workout is already in today's plan");
      return;
    }

    if (plan.length>= 5) {
      toast.error("Today's plan can contain maximum 5 workouts");
      return;
    }

    setPlan((previous) => [...previous, workout]);

    toast.success("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    setPlan((previous) => previous.filter((workout) => workout.id !== id));

    setDoneIds((previous) => previous.filter((doneId) => doneId !== id));

    toast.info("Workout removed from today's plan");
  };

  const saveWorkout = (workout: IWorkout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.info("Workout is already saved");
      return;
    }

    setSaved((previous) => [...previous, workout]);

    toast.success("Workout saved for later");
  };

  const removeFromSaved = (id: number) => {
    setSaved((previous) => previous.filter((workout) => workout.id !== id));

    toast.info("Workout removed from saved");
  };

  const markAsDone = (id: number) => {
    if (doneIds.includes(id)) {
      toast.info("Workout is already marked as done");
      return;
    }

    setDoneIds((previous) => [...previous, id]);

    toast.success("Workout marked as done");
  };

  const isInPlan = (id: number) => {
    return plan.some((workout) => workout.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((workout) => workout.id === id);
  };

  const isDone = (id: number) => {
    return doneIds.includes(id);
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};
