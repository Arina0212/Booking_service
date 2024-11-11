import { EventsShortData } from '../types/EventData';
import EventCard from './EventCard';

interface EventsBlockProps {
    title: string;
    events?: EventsShortData;
}

export default function EventsBlock({ title, events }: EventsBlockProps) {
    return (
        <section className="main__events">
            <h3 className="main__events-head">{title}</h3>
            <div className="main__events-content">
                {events?.map((event) => (
                    <EventCard
                        id={event.id}
                        name={event.name}
                        start_date={event.start_date}
                        end_date={event.end_date}
                        city={event.city}
                        visit_cost={event.visit_cost}
                        format={event.format}
                    />
                ))}
            </div>
        </section>
    );
}
