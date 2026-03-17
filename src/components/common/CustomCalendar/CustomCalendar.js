"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "./CustomCalendar.module.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Generate years from 1950 to 2050
const yearsList = [];
for (let i = 1950; i <= 2050; i++) {
  yearsList.push(i);
}

export default function CustomCalendar({ selectedDate, onSelect, onClose }) {
  const [currentDate, setCurrentDate] = useState(() => {
    return selectedDate ? new Date(selectedDate) : new Date();
  });
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  
  const calendarRef = useRef(null);
  const yearListRef = useRef(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const days = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const calendarDays = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        month: currentMonth - 1,
        year: currentYear,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, i).toDateString();
      calendarDays.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        isToday,
        isSelected: selectedDate ? new Date(selectedDate).toDateString() === new Date(currentYear, currentMonth, i).toDateString() : false
      });
    }

    // Next month days
    const totalDays = 42;
    const nextDays = totalDays - calendarDays.length;
    for (let i = 1; i <= nextDays; i++) {
      calendarDays.push({
        day: i,
        month: currentMonth + 1,
        year: currentYear,
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  }, [currentYear, currentMonth, selectedDate]);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentYear, currentMonth + offset, 1));
  };

  const handleDateClick = (date) => {
    const newDate = new Date(date.year, date.month, date.day);
    const dateString = newDate.toISOString().split("T")[0];
    onSelect(dateString);
    onClose();
  };

  const selectMonth = (idx) => {
    setCurrentDate(new Date(currentYear, idx, 1));
    setShowMonthDropdown(false);
  };

  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentMonth, 1));
    setShowYearDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Scroll to current year when dropdown opens
  useEffect(() => {
    if (showYearDropdown && yearListRef.current) {
        const activeItem = yearListRef.current.querySelector(`.${styles.activeYear}`);
        if (activeItem) {
            yearListRef.current.scrollTop = activeItem.offsetTop - 100;
        }
    }
  }, [showYearDropdown]);

  return (
    <div className={styles.calendarPopup} ref={calendarRef}>
      <div className={styles.header}>
        <button className={styles.navBtn} onClick={() => changeMonth(-1)}>
            <img src="/icons/chevron-left.svg" alt="prev" />
        </button>
        
        <div className={styles.selectors}>
            <div className={styles.selectorWrapper}>
                <span className={styles.selectorLabel} onClick={() => {
                    setShowMonthDropdown(!showMonthDropdown);
                    setShowYearDropdown(false);
                }}>
                    {months[currentMonth]}
                    <img src="/icons/chevron-down.svg" alt="" className={`${styles.chevron} ${showMonthDropdown ? styles.rotated : ""}`} />
                </span>
                {showMonthDropdown && (
                    <div className={styles.dropdown}>
                        {months.map((m, i) => (
                            <div key={m} className={`${styles.dropdownItem} ${i === currentMonth ? styles.activeItem : ""}`} onClick={() => selectMonth(i)}>
                                {m}
                            </div>
                        ))}
                    </div>
                ) }
            </div>

            <div className={styles.selectorWrapper}>
                <span className={styles.selectorLabel} onClick={() => {
                    setShowYearDropdown(!showYearDropdown);
                    setShowMonthDropdown(false);
                }}>
                    {currentYear}
                    <img src="/icons/chevron-down.svg" alt="" className={`${styles.chevron} ${showYearDropdown ? styles.rotated : ""}`} />
                </span>
                {showYearDropdown && (
                    <div className={`${styles.dropdown} ${styles.yearDropdown}`} ref={yearListRef}>
                        {yearsList.map((y) => (
                            <div key={y} className={`${styles.dropdownItem} ${y === currentYear ? styles.activeYear : ""}`} onClick={() => selectYear(y)}>
                                {y}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <button className={styles.navBtn} onClick={() => changeMonth(1)}>
            <img src="/icons/chevron-right.svg" alt="next" />
        </button>
      </div>

      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      
      <div className={styles.daysGrid}>
        {days.map((d, i) => (
          <div
            key={i}
            className={`${styles.day} ${!d.isCurrentMonth ? styles.otherMonth : ""} ${d.isToday ? styles.today : ""} ${d.isSelected ? styles.selected : ""}`}
            onClick={() => handleDateClick(d)}
          >
            {d.day}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.clearBtn} onClick={() => { onSelect(""); onClose(); }}>Clear</button>
        <button className={styles.todayBtn} onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            onSelect(today);
            onClose();
        }}>Today</button>
      </div>
    </div>
  );
}
