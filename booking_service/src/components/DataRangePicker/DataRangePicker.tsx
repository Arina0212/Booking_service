import React, { useEffect, useRef, useState } from 'react';
import './DateRangePicker.css';
import { humanizeDate } from '../../services/utils/dataFormater';
import { MONTH } from '../../const';

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface DateRangePickerProps {
    onDateChange: (range: DateRange) => void;
    initialRange: DateRange;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange, initialRange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const wrapperRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
                setIsCalendarOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const [selectedRange, setSelectedRange] = useState<DateRange>(initialRange);

    const handleDateClick = (date: Date) => {
        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            const newRange = { start: date, end: null };
            setSelectedRange(newRange);
            onDateChange(newRange);
        } else {
            const newRange = { start: selectedRange.start, end: date };
            setSelectedRange(newRange);
            onDateChange(newRange);
        }
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return humanizeDate(date);
    };

    return (
        <div className="date-range-picker" ref={wrapperRef} onClick={() => setIsFocused(!isFocused)}>
            <input
                type="text"
                className="input_white dropdown-selected_dates"
                value={
                    selectedRange.start === null ? 'Дата: от - до' : `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`
                }
                readOnly
                onClick={toggleCalendar}
                placeholder="Выберите диапазон дат"
            />

            {isCalendarOpen && <Calendar onDateClick={handleDateClick} closeCalendar={() => setIsCalendarOpen(false)} />}
        </div>
    );
};

interface CalendarProps {
    onDateClick: (date: Date) => void;
    closeCalendar: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateClick, closeCalendar }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const daysInMonth = (month: number, year: number): number => new Date(year, month + 1, 0).getDate();

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        return (
            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="dropdown-menu-day">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderDays = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const days = daysInMonth(month, year);
        const firstDay = new Date(year, month, 1).getDay();

        const daysArray: JSX.Element[] = [];
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < adjustedFirstDay; i++) {
            daysArray.push(<div className="empty-day" key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= days; i++) {
            const date = new Date(year, month, i);
            daysArray.push(
                <div
                    key={`${year}-${month}-${i}`}
                    className="dropdown-menu-day"
                    onClick={() => {
                        onDateClick(date);
                        closeCalendar();
                    }}
                >
                    {i}
                </div>,
            );
        }

        return daysArray;
    };

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };
    const startDate = humanizeDate(currentDate).split('.');
    const startMonth = Number(startDate[1]) - 1;
    return (
        <div className="calendar">
            <div className="header-calendar">
                <h2 className="dropdown-menu-month">
                    {MONTH[startMonth]} {currentDate.getFullYear()}
                </h2>
                <button className="dropdown-menu-arrow dropdown-menu-arrow_left" onClick={handlePrevMonth}>
                    <img src="/svg/arrow.svg" alt="back" />
                </button>
                <button className="dropdown-menu-arrow" onClick={handleNextMonth}>
                    <img src="/svg/arrow.svg" alt="next" />
                </button>
            </div>
            {renderDaysOfWeek()}
            <div className="calendar-grid">{renderDays()}</div>
        </div>
    );
};

export default DateRangePicker;
