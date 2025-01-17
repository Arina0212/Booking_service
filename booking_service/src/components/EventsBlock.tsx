import React, { useState } from 'react';
import { EventsShortData } from '../types/EventData';
import EventCard from './EventCard';
import Loading from './Loading';

interface EventsBlockProps {
    title: string;
    events?: EventsShortData;
    isLoading?: boolean | undefined;
    vCount: number;
}

export default function EventsBlock({ title, events = [], isLoading, vCount }: EventsBlockProps) {
    const [visibleCount, setVisibleCount] = useState(vCount);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + vCount);
    };
    return (
        <section className="main__events">
            <h3 className="main__events-head">{title}</h3>
            {!isLoading ? (
                <>
                    {events.length !== 0 ? (
                        <div className="main__events-content">
                            {events.slice(0, visibleCount).map((event) => (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    start_date={event.start_date}
                                    end_date={event.end_date}
                                    city={event.city}
                                    visit_cost={event.visit_cost}
                                    format={event.format}
                                    photo_url={event.photo_url}
                                    start_time={event.start_time}
                                    end_time={event.end_time}
                                    state={event.state}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="main_no_events">
                            <p>Нет мероприятий в данном разделе</p>
                        </div>
                    )}
                    {events.length > visibleCount && (
                        <button onClick={handleShowMore} className="show-more-button">
                            Показать еще ({events.length - visibleCount})
                        </button>
                    )}
                </>
            ) : (
                <>{title.includes('Все') ? <Loading /> : <span className="loader"></span>}</>
            )}
        </section>
    );
}
