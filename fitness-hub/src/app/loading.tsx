const Loading = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#292e36] border-t-[#ccff00]" />

        <p className="mt-4 text-xs font-bold text-[#8d95a3]">
          Loading workouts…
        </p>
      </div>
    </div>
  );
};

export default Loading;