import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-black text-[#ccff00]">404</p>

        <h1 className="mt-4 text-2xl font-black uppercase">
          Workout Not Found
        </h1>

        <p className="mt-2 text-sm text-[#7f8794]">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black text-black"
        >
          Back to workouts
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
