import React, { useState } from 'react';
import './DateRangePicker.css';
import { getAltDate, humanizeDate } from '../../services/utils/dataFormater';
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

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const [selectedRange, setSelectedRange] = useState<DateRange>(initialRange);

    const handleDateClick = (date: Date) => {
        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            const newRange = { start: date, end: null };
            console.log('Начало', getAltDate(newRange.start));
            setSelectedRange(newRange);

            onDateChange(newRange);
        } else {
            const newRange = { start: selectedRange.start, end: date };
            console.log('Конец', getAltDate(newRange.end));
            setSelectedRange(newRange);
            onDateChange(newRange);
        }
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return humanizeDate(date);
    };

    return (
        <div className="date-range-picker">
            <input
                type="text"
                className="input_white"
                value={
                    selectedRange.start === null
                        ? 'Выберите диапазон дат-'
                        : `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`
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
                    <div key={index} className="day-of-week">
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
                    className="day"
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
            console.log('Переход на предыдущий месяц:', newDate); // Добавлено для проверки
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            console.log('Переход на следующий месяц:', newDate); // Добавлено для проверки
            return newDate;
        });
    };
    const startDate = humanizeDate(currentDate).split('.');
    const startMonth = Number(startDate[1]) - 1;
    console.log(startMonth);
    return (
        <div className="calendar">
            <div className="header-calendar">
                <h2>
                    {MONTH[startMonth]} {currentDate.getFullYear()}
                </h2>

                <button onClick={handlePrevMonth}>Назад</button>
                <button onClick={handleNextMonth}>Вперед</button>
            </div>
            {renderDaysOfWeek()}
            <div className="calendar-grid">{renderDays()}</div>
        </div>
    );
};

export default DateRangePicker;
