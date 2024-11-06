import { EVENTS } from '../types/moks';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

interface EventsBlockProps {
    title: string;
    events: typeof EVENTS;
}

export default function EventsBlock({ title, events }: EventsBlockProps) {
    return (
        <section className="main__events">
            <h3 className="main__events-head">{title}</h3>
            <div className="main__events-content">
                {events.map((event) => (
                    <div className="main__events-content-slide">
                        <Link to={AppRoute.Event} className="main__events-content-slide-pic" draggable="false">
                            <img src="/img/testEvent.png" alt="event" />
                            <p>{event.type}</p>
                        </Link>
                        <Link to={AppRoute.Event} className="main__events-content-slide-head">
                            {event.name}
                        </Link>
                        <div className="main__events-content-slide-dates">
                            <div className="main__events-content-slide-dates-date">
                                <span>Начало</span>
                                <h4>12</h4>
                                <p>марта</p>
                                <p>{event.timeStart}</p>
                            </div>
                            <div className="main__events-content-slide-dates-date">
                                <span>Конец</span>
                                <h4>14</h4>
                                <p>марта</p>
                                <p>{event.timeEnd}</p>
                            </div>
                        </div>
                        <div className="main__events-content-slide-info">
                            <p>{event.place}</p>
                            <span className="main__events-content-slide-info-price">{event.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
