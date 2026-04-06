"use client";

import { Section } from "@/lib/types";
import { motion } from "framer-motion";

interface VenueMapProps {
  sections: Section[];
  selectedSectionId: string | null;
  onSelectSection: (section: Section) => void;
}

export default function VenueMap({
  sections,
  selectedSectionId,
  onSelectSection,
}: VenueMapProps) {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 800 680"
        className="w-full h-auto"
        style={{ maxHeight: "520px" }}
      >
        <defs>
          <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stage glow */}
        <ellipse cx="400" cy="120" rx="250" ry="80" fill="url(#stageGlow)" />

        {/* Stage */}
        <path
          d="M 220 100 Q 400 60 580 100 L 560 160 Q 400 130 240 160 Z"
          fill="#1e1e2e"
          stroke="#6366f1"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        <text
          x="400"
          y="128"
          textAnchor="middle"
          fill="#818cf8"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="4"
        >
          STAGE
        </text>

        {/* Sections */}
        {sections.map((section) => {
          const isSelected = selectedSectionId === section.id;
          const availableCount = section.rows.reduce(
            (sum, row) =>
              sum + row.seats.filter((s) => s.status === "available").length,
            0
          );
          const totalCount = section.rows.reduce(
            (sum, row) => sum + row.seats.length,
            0
          );
          const availPct = availableCount / totalCount;

          return (
            <g
              key={section.id}
              onClick={() => onSelectSection(section)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <motion.path
                d={section.path}
                fill={isSelected ? section.color : section.color + "33"}
                stroke={isSelected ? "#ffffff" : section.color}
                strokeWidth={isSelected ? 2.5 : 1.5}
                whileHover={{
                  fill: section.color + "88",
                  strokeWidth: 2.5,
                  transition: { duration: 0.2 },
                }}
                initial={false}
                animate={{
                  fill: isSelected ? section.color + "aa" : section.color + "33",
                  stroke: isSelected ? "#ffffff" : section.color,
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Section label */}
              <text
                x={section.labelX}
                y={section.labelY - 10}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="bold"
                pointerEvents="none"
              >
                {section.name}
              </text>
              <text
                x={section.labelX}
                y={section.labelY + 6}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                opacity="0.7"
                pointerEvents="none"
              >
                ${section.price}
              </text>
              <text
                x={section.labelX}
                y={section.labelY + 20}
                textAnchor="middle"
                fill={availPct > 0.5 ? "#10b981" : availPct > 0.2 ? "#f59e0b" : "#ef4444"}
                fontSize="9"
                pointerEvents="none"
              >
                {availableCount} seats left
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
