import Image, { StaticImageData } from "next/image";
import React from "react";

interface SectionHeaderProps {
  logo?: string | StaticImageData;
  title: string;
  subtitles?: string[];
  gap?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  logo,
  title,
  subtitles = [],
  gap = "mt-8",
  className = "mb-16",
}) => {
  return (
    <div className={`text-center ${className}`}>
      {logo && (
        <Image
          src={logo}
          alt="Section Logo"
          className="mx-auto mb-5 object-contain"
        />
      )}
      <h1 className="text-[1.5rem] md:text-[2.5rem] text-black font-elias font-[500]">
        {title}
      </h1>
      {subtitles.length > 0 && (
        <div className={`flex flex-col items-center gap-6 ${gap}`}>
          {subtitles.map((subtitle, index) => (
            <h2
              key={index}
              className="text-[#525458] text-lg leading-[2.125rem]"
            >
              {subtitle}
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
