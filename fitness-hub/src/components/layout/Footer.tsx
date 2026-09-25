import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-[#20242b] bg-[#0c0e12]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog Logo" width={32} height={32} />
          <span className="text-sm font-black tracking-wide">FITLOG</span>
        </div>

        <p className="text-xs text-[#737b89]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
