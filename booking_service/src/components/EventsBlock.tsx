import { EventsShortData } from '../types/EventData';
import EventCard from './EventCard';
import Loading from './Loading';

interface EventsBlockProps {
    title: string;
    events?: EventsShortData;
    isLoading: boolean | undefined;
}

export default function EventsBlock({ title, events, isLoading }: EventsBlockProps) {
    return (
        <section className="main__events">
            <h3 className="main__events-head">{title}</h3>
            {!isLoading ? (
                <>
                    {events?.length !== 0 ? (
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
                                    photo_url={event.photo_url}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="main_no_events">
                            <p>Нет мероприятий в данном разделе</p>
                        </div>
                    )}
                </>
            ) : (
                <>{title.includes('Все') ? <Loading /> : <span className="loader"></span>}</>
            )}
        </section>
    );
}
