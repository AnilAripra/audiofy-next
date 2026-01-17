"use client";

import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import {
  format,
  startOfMonth,
  endOfMonth,
  subDays,
  addMonths,
  startOfDay,
  startOfYear,
  endOfYear,
} from "date-fns";
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type Props = {
  value: Range[];
  onChange: (r: Range[]) => void;
  defaultRange: Range;
};

export default function DateRangePicker({ value, onChange, defaultRange }: Props) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const currentRange = value[0];
  const isPreset = (s: Date, e: Date) =>
    format(currentRange.startDate, "yyyy-MM-dd") === format(s, "yyyy-MM-dd") &&
    format(currentRange.endDate, "yyyy-MM-dd") === format(e, "yyyy-MM-dd");

  const todayDate = startOfDay(new Date());
  const yesterdayDate = subDays(todayDate, 1);
  const last7Start = subDays(todayDate, 6);
  const thisMonthStart = startOfMonth(todayDate);
  const thisMonthEnd = endOfMonth(todayDate);
  const nextMonthStart = startOfMonth(addMonths(todayDate, 1));
  const nextMonthEnd = endOfMonth(addMonths(todayDate, 1));
  const thisYearStart = startOfDay(startOfYear(todayDate));
  const thisYearEnd = endOfYear(todayDate);

  const btnClass = (active: boolean) =>
    `${
      active
        ? "text-sm px-3 py-2 rounded-md bg-gradient-to-r from-orange-500 to-pink-500 text-white"
        : "text-sm text-gray-400 bg-white/5 px-3 py-2 rounded-md hover:bg-white/10"
    }`;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (open && pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-md transition-colors"
      >
        {format(value[0].startDate, "dd/MM/yyyy")} - {format(value[0].endDate, "dd/MM/yyyy")}
      </button>

      {open && (
        <div
          ref={pickerRef}
          className="absolute left-0 mt-2 z-50 p-3 rounded-lg shadow-lg border flex theme-panel"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex flex-col mr-4 space-y-2">
            <button
              onClick={() => {
                onChange([{ startDate: todayDate, endDate: todayDate, key: "selection" }]);
                setOpen(false);
              }}
              className={btnClass(isPreset(todayDate, todayDate))}
            >
              Today
            </button>

            <button
              onClick={() => {
                onChange([{ startDate: yesterdayDate, endDate: yesterdayDate, key: "selection" }]);
                setOpen(false);
              }}
              className={btnClass(isPreset(yesterdayDate, yesterdayDate))}
            >
              Yesterday
            </button>

            <button
              onClick={() => {
                onChange([{ startDate: last7Start, endDate: todayDate, key: "selection" }]);
                setOpen(false);
              }}
              className={btnClass(isPreset(last7Start, todayDate))}
            >
              Last 7 Days
            </button>

            <button
              onClick={() => {
                onChange([{ startDate: thisMonthStart, endDate: thisMonthEnd, key: "selection" }]);
                setOpen(false);
              }}
              className={btnClass(isPreset(thisMonthStart, thisMonthEnd))}
            >
              This Month
            </button>

            <button
              onClick={() => {
                onChange([{ startDate: nextMonthStart, endDate: nextMonthEnd, key: "selection" }]);
                setOpen(false);
              }}
              className={btnClass(isPreset(nextMonthStart, nextMonthEnd))}
            >
              Next Month
            </button>

            <button
              onClick={() => {
                onChange([{ startDate: thisYearStart, endDate: thisYearEnd, key: "selection" }]);
                setOpen(false);
              }}
              className={btnClass(isPreset(thisYearStart, thisYearEnd))}
            >
              This Year
            </button>

            <button
              onClick={() => {
                onChange([defaultRange]);
                setOpen(false);
              }}
              className={btnClass(isPreset(defaultRange.startDate, defaultRange.endDate))}
            >
              Reset
            </button>
          </div>

          <DateRange
            ranges={value}
            onChange={(item: any) => onChange([item.selection])}
            months={2}
            direction="horizontal"
            rangeColors={["#fb923c"]}
          />
        </div>
      )}

      <style jsx global>{`
        /* Base wrapper using theme variables */
        .rdrCalendarWrapper {
          background: var(--panel-bg) !important;
          color: var(--foreground) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 30px rgba(2,6,23,0.15) !important;
          border: 1px solid var(--border) !important;
        }

        /* Month block */
        .rdrMonth { background: transparent !important; }
        .rdrMonthName, .rdrMonthAndYearPickers, .rdrWeekDays { color: var(--muted) !important; }
        .rdrWeekDays th { color: rgba(0,0,0,0.35) !important; }

        /* Day numbers */
        .rdrDayNumber span { color: var(--foreground) !important; }
        .rdrDayPassive .rdrDayNumber span { color: rgba(0,0,0,0.35) !important; }

        /* Today */
        .rdrDayToday .rdrDayNumber span {
          border: 1px solid var(--border) !important;
        }

        /* Selected / in-range uses nav gradient variables */
        .rdrDayInRange .rdrDayNumber span,
        .rdrDaySelected .rdrDayNumber span {
          color: var(--nav-active-text) !important;
        }
        .rdrDayInRange { background: linear-gradient(90deg,var(--nav-active-from),var(--nav-active-to)) !important; }
        .rdrDaySelected { background: linear-gradient(90deg,var(--nav-active-from),var(--nav-active-to)) !important; box-shadow: none !important; }

        /* Input boxes at top */
        .rdrDateDisplayWrapper, .rdrDateDisplayItem {
          background: var(--input-bg) !important;
          border: 1px solid var(--border) !important;
          color: var(--foreground) !important;
        }
        .rdrDateDisplayItem input {
          color: var(--foreground) !important;
        }

        /* Prev/next buttons */
        .rdrNextPrevButton { background: rgba(0,0,0,0.03) !important; color: var(--muted) !important; }

        /* Small helpers */
        .rdrSelectionPreview .rdrDay { opacity: 0.9 !important; }

        /* Responsive fix to match our picker container padding */
        .rdrMonths { gap: 18px !important; }

        /* Light-specific tweaks */
        html[data-theme="light"] .rdrWeekDays th { color: rgba(11,18,32,0.45) !important; }
        html[data-theme="light"] .rdrDayPassive .rdrDayNumber span { color: rgba(11,18,32,0.35) !important; }
        html[data-theme="light"] .rdrNextPrevButton { background: rgba(11,18,32,0.03) !important; }
      `}</style>
    </div>
  );
}
