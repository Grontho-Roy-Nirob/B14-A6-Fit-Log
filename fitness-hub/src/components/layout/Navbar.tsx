"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workouts");
  const isPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-[#20242b] bg-[#0c0e12]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={32}
            height={32}
          />

          <span className="text-sm font-black tracking-wide">FITLOG</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-xs transition ${
              isWorkoutActive
                ? "bg-[#1b2600] text-[#ccff00]"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-xs transition ${
              isPlanActive
                ? "bg-[#1b2600] text-[#ccff00]"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#d1d5db]"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#d1d5db]"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a404a] px-1.5 text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-[#20242b] px-4 py-2 md:hidden">
        <div className="flex justify-center gap-2">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-xs ${
              isWorkoutActive ? "bg-[#1b2600] text-[#ccff00]" : "text-gray-400"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-xs ${
              isPlanActive ? "bg-[#1b2600] text-[#ccff00]" : "text-gray-400"
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
