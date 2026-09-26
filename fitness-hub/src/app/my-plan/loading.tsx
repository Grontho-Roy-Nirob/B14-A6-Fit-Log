const MyPlanLoading = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#292e36] border-t-[#ccff00]" />

        <p className="mt-4 text-xs text-[#8d95a3]">
          Loading Myplan…
        </p>
      </div>
    </div>
  );
};

export default MyPlanLoading;