"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import styles from "./CustomCalendar.module.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = Array.from({ length: (new Date().getFullYear()) - 1901 + 1 }, (_, i) => 1901 + i);

const CustomCalendar = ({ 
  initialStartDate = null, 
  initialEndDate = null, 
  onSelect = () => {},
  onClose = () => {}
}) => {
  const [leftViewDate, setLeftViewDate] = useState(() => {
    if (initialStartDate) return initialStartDate;
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 1, 1);
  });
  const [rightViewDate, setRightViewDate] = useState(() => {
    if (initialEndDate) return initialEndDate;
    if (initialStartDate) return new Date(initialStartDate.getFullYear(), initialStartDate.getMonth() + 1, 1);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [hoverDate, setHoverDate] = useState(null);
  const [openYearSelector, setOpenYearSelector] = useState(null); // {index: 0 or 1}
  const [openMonthSelector, setOpenMonthSelector] = useState(null); // {index: 0 or 1}
  const yearSelectorRef = useRef(null);
  const monthSelectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearSelectorRef.current && !yearSelectorRef.current.contains(event.target)) {
        setOpenYearSelector(null);
      }
      if (monthSelectorRef.current && !monthSelectorRef.current.contains(event.target)) {
        setOpenMonthSelector(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    setLeftViewDate(new Date(leftViewDate.getFullYear(), leftViewDate.getMonth() - 1, 1));
    setRightViewDate(new Date(rightViewDate.getFullYear(), rightViewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setLeftViewDate(new Date(leftViewDate.getFullYear(), leftViewDate.getMonth() + 1, 1));
    setRightViewDate(new Date(rightViewDate.getFullYear(), rightViewDate.getMonth() + 1, 1));
  };

  const handleYearChange = (index, year) => {
    if (index === 0) {
      setLeftViewDate(new Date(year, leftViewDate.getMonth(), 1));
    } else {
      setRightViewDate(new Date(year, rightViewDate.getMonth(), 1));
    }
  };

  const handleMonthChange = (index, month) => {
    if (index === 0) {
      setLeftViewDate(new Date(leftViewDate.getFullYear(), month, 1));
    } else {
      setRightViewDate(new Date(rightViewDate.getFullYear(), month, 1));
    }
  };

  const onDateClick = (date) => {
    let newStart = startDate;
    let newEnd = endDate;

    if (!startDate || (startDate && endDate)) {
      newStart = date;
      newEnd = null;
    } else if (startDate && !endDate) {
      if (date < startDate) {
        newEnd = startDate;
        newStart = date;
      } else {
        newEnd = date;
      }
    }
    
    setStartDate(newStart);
    setEndDate(newEnd);
    onSelect(newStart, newEnd);
  };

  const isSelected = (date) => {
    return (startDate && date.toDateString() === startDate.toDateString()) || 
           (endDate && date.toDateString() === endDate.toDateString());
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) {
      if (startDate && hoverDate && !endDate) {
        const start = startDate < hoverDate ? startDate : hoverDate;
        const end = startDate < hoverDate ? hoverDate : startDate;
        return date > start && date < end;
      }
      return false;
    }
    return date > startDate && date < endDate;
  };

  const renderMonth = (year, month, index) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Padding from prev month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevPadding = Array.from({ length: firstDayOfMonth }, (_, i) => {
      const day = prevMonthLastDay - firstDayOfMonth + i + 1;
      return { day, current: false, isPrev: true, date: new Date(year, month - 1, day) };
    });

    // Days in current month
    const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return { day, current: true, date: new Date(year, month, day) };
    });

    // Padding from next month
    const totalSlots = (firstDayOfMonth + daysInMonth) > 35 ? 42 : 35; // 5 rows if possible, else 6
    const nextPaddingCount = totalSlots - prevPadding.length - currentDays.length;
    const nextPadding = Array.from({ length: nextPaddingCount }, (_, i) => {
      const day = i + 1;
      return { day, current: false, isNext: true, date: new Date(year, month + 1, day) };
    });

    const allDays = [...prevPadding, ...currentDays, ...nextPadding];

    return (
      <div className={styles.monthWrapper}>
        <div className={styles.monthHeader}>
          <div className={styles.selectorGroup} ref={openMonthSelector?.index === index ? monthSelectorRef : null}>
            <div 
              className={styles.selectorLabel}
              onClick={() => setOpenMonthSelector(openMonthSelector?.index === index ? null : { index })}
            >
              {MONTHS[month]}
              <ChevronDown className={styles.chevronDown} />
            </div>
            
            {openMonthSelector?.index === index && (
              <div className={`${styles.dropdown} ${styles.monthDropdown}`}>
                {MONTHS.map((m, i) => (
                  <div 
                    key={m}
                    className={`${styles.dropdownItem} ${i === month ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      handleMonthChange(index, i);
                      setOpenMonthSelector(null);
                    }}
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.selectorGroup} ref={openYearSelector?.index === index ? yearSelectorRef : null}>
            <div 
              className={styles.selectorLabel}
              onClick={() => setOpenYearSelector(openYearSelector?.index === index ? null : { index })}
            >
              {year}
              <ChevronDown className={styles.chevronDown} />
            </div>
            
            {openYearSelector?.index === index && (
              <div className={`${styles.dropdown} ${styles.yearDropdown}`}>
                {YEARS.map((y) => (
                  <div 
                    key={y}
                    className={`${styles.dropdownItem} ${y === year ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      handleYearChange(index, y);
                      setOpenYearSelector(null);
                    }}
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
            const isPadding = !item.current;
            const shouldHide = (index === 0 && isPadding) || (index === 1 && item.isPrev);
            const isFuture = item.date > new Date();
            const shouldDisable = shouldHide || isFuture;

            const selected = !shouldDisable && isSelected(item.date);
            const inRange = !shouldDisable && isInRange(item.date);
            const isStart = !shouldDisable && startDate && item.date.toDateString() === startDate.toDateString();
            const isEnd = !shouldDisable && endDate && item.date.toDateString() === endDate.toDateString();
            
            return (
              <div 
                key={idx}
                className={`${styles.dayCell} ${!shouldDisable ? styles.dayCellClickable : styles.dayCellDisabled}`}
                onClick={() => !shouldDisable && onDateClick(item.date)}
                onMouseEnter={() => !shouldDisable && setHoverDate(item.date)}
                onMouseLeave={() => setHoverDate(null)}
              >
                {/* Range background */}
                {inRange && (
                  <div className={styles.rangeBg} />
                )}
                {isStart && endDate && (
                  <div className={`${styles.rangeBg} ${styles.rangeStartBg}`} />
                )}
                {isEnd && (
                  <div className={`${styles.rangeBg} ${styles.rangeEndBg}`} />
                )}

                <span 
                   className={`
                     ${styles.dayInner}
                     ${item.current ? styles.dayCurrent : styles.dayNotCurrent}
                     ${!selected && item.current ? styles.dayHover : ''}
                     ${selected ? styles.daySelected : ''}
                     ${isFuture && !shouldHide ? styles.futureDay : ''}
                   `}
                >
                  {!shouldDisable ? item.day : (shouldHide ? "" : item.day)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button 
          onClick={handlePrevMonth}
          className={styles.navButton}
        >
          <ChevronLeft className={styles.navIcon} />
        </button>
        <button 
          onClick={handleNextMonth}
          className={styles.navButton}
        >
          <ChevronRight className={styles.navIcon} />
        </button>
      </div>

      <div className={styles.monthsContainer}>
        {renderMonth(leftViewDate.getFullYear(), leftViewDate.getMonth(), 0)}
        {renderMonth(rightViewDate.getFullYear(), rightViewDate.getMonth(), 1)}
      </div>
    </div>
  );
};

export default CustomCalendar;
