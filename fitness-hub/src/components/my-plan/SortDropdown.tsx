"use client";

type SortType = "duration" | "calories" | "rating";

interface ISortDropdownProps {
  sortBy: SortType;
  setSortBy: (value: SortType) => void;
}

const SortDropdown = ({ sortBy, setSortBy }: ISortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#737b89]">Sort By</span>

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value as SortType)}
        className="rounded-md border border-[#303641] bg-[#15181e] px-4 py-2 text-xs text-white outline-none"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>

    </div>
  );
};

export default SortDropdown;
