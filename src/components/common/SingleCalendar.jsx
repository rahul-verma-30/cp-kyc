"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import styles from "./SingleCalendar.module.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = Array.from({ length: (new Date().getFullYear()) - 1901 + 1 }, (_, i) => 1901 + i);

const SingleCalendar = ({ 
  selectedDate = null, 
  onSelect = () => {},
  onClose = () => {}
}) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const [openYearSelector, setOpenYearSelector] = useState(false);
  const [openMonthSelector, setOpenMonthSelector] = useState(false);
  const calendarRef = useRef(null);
  const yearSelectorRef = useRef(null);
  const monthSelectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleYearChange = (year) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setOpenYearSelector(false);
  };

  const handleMonthChange = (month) => {
    setViewDate(new Date(viewDate.getFullYear(), month, 1));
    setOpenMonthSelector(false);
  };

  const onDateClick = (date) => {
    onSelect(date);
    onClose();
  };

  const renderMonth = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Padding from prev month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevPadding = Array.from({ length: firstDayOfMonth }, (_, i) => {
      const day = prevMonthLastDay - firstDayOfMonth + i + 1;
      return { day, current: false, date: new Date(year, month - 1, day) };
    });

    // Days in current month
    const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return { day, current: true, date: new Date(year, month, day) };
    });

    // Padding from next month
    const totalSlots = (firstDayOfMonth + daysInMonth) > 35 ? 42 : 35;
    const nextPaddingCount = totalSlots - prevPadding.length - currentDays.length;
    const nextPadding = Array.from({ length: nextPaddingCount }, (_, i) => {
      const day = i + 1;
      return { day, current: false, date: new Date(year, month + 1, day) };
    });

    const allDays = [...prevPadding, ...currentDays, ...nextPadding];

    return (
      <div className={styles.monthWrapper}>
        <div className={styles.monthHeader}>
          <div className={styles.selectorGroup} ref={monthSelectorRef}>
            <div 
              className={styles.selectorLabel}
              onClick={() => setOpenMonthSelector(!openMonthSelector)}
            >
              {MONTHS[month]}
              <ChevronDown className={styles.chevronDown} />
            </div>
            {openMonthSelector && (
              <div className={`${styles.dropdown} ${styles.monthDropdown}`}>
                {MONTHS.map((m, i) => (
                  <div 
                    key={m}
                    className={`${styles.dropdownItem} ${i === month ? styles.dropdownItemActive : ''}`}
                    onClick={() => handleMonthChange(i)}
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.selectorGroup} ref={yearSelectorRef}>
            <div 
              className={styles.selectorLabel}
              onClick={() => setOpenYearSelector(!openYearSelector)}
            >
              {year}
              <ChevronDown className={styles.chevronDown} />
            </div>
            {openYearSelector && (
              <div className={`${styles.dropdown} ${styles.yearDropdown}`}>
                {YEARS.map((y) => (
                  <div 
                    key={y}
                    className={`${styles.dropdownItem} ${y === year ? styles.dropdownItemActive : ''}`}
                    onClick={() => handleYearChange(y)}
                  >
                    {y}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.daysGrid}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
            <div key={d} className={styles.dayOfWeek}>{d}</div>
          ))}
          {allDays.map((item, idx) => {
            const isSelected = selectedDate && item.date.toDateString() === selectedDate.toDateString();
            const isToday = item.date.toDateString() === new Date().toDateString();
            const isFuture = item.date > new Date();

            return (
              <div 
                key={idx}
                className={`${styles.dayCell} ${item.current ? styles.dayCellCurrent : styles.dayCellNotCurrent} ${isSelected ? styles.daySelected : ''} ${isFuture ? styles.dayDisabled : ''}`}
                onClick={() => !isFuture && onDateClick(item.date)}
              >
                <span className={styles.dayInner}>
                  {item.day}
                  {isToday && !isSelected && <div className={styles.todayDot} />}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendarPopout} ref={calendarRef}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth} className={styles.navButton}>
          <ChevronLeft className={styles.navIcon} />
        </button>
        <button onClick={handleNextMonth} className={styles.navButton}>
          <ChevronRight className={styles.navIcon} />
        </button>
      </div>
      {renderMonth()}
    </div>
  );
};

export default SingleCalendar;
