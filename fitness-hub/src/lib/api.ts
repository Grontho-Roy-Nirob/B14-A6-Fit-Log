import { IWorkout } from "@/types/workout.type";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const getWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const response = await fetch(`${BASE_URL}/fitlog`);

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const data = await response.json();
    return data;

  } catch(error) {
      console.error("Error fetching workouts:", error);
      return[];
  }
};


export const getWorkout = async (
  id: string,
): Promise<IWorkout | null> => {
  try {
    const response = await fetch(`${BASE_URL}/fitlog/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching workout:", error);

    return null;
  }
};

