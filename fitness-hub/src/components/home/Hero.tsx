import Image from "next/image";
import Link from "next/link";

import bannerImage from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto grid max-w-7xl items-center overflow-hidden rounded-lg border border-[#242830] bg-[#15181e] md:grid-cols-2">
        {/* Content */}
        <div className="px-6 py-10 md:px-10 lg:px-12">
          <p className="mb-3 text-[10px] font-bold tracking-[0.18em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-1xl text-2xl font-black uppercase leading-[0.95] tracking-tight md:text-3xl lg:text-4xl">
            Train with intent. Log
            <br />
             every set.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-[#8d95a3]">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black text-black transition hover:bg-[#b8e600]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Image */}
        <div className="flex min-h-[280px] items-center justify-center px-5 pt-5 md:min-h-[350px] md:px-8">
          <Image
            src={bannerImage}
            alt="Workout illustration"
            priority
            className="h-auto max-h-[330px] w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;