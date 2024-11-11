import { Link } from 'react-router-dom';
import { humanizeDate } from '../services/utils/dataFormater';
import { AppRoute } from '../const';

type EventCardProps = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    city: string;
    visit_cost: number;
    format: string;
};

export default function EventCard({ id, name, start_date, end_date, city, visit_cost, format }: EventCardProps) {
    return (
        <>
            <div className="main__events-content-slide">
                <Link to={`${AppRoute.Events}/${id}`} className="main__events-content-slide-pic" draggable="false">
                    <img src="/img/testEvent.png" alt="event" />
                    <p>{format}</p>
                </Link>
                <Link to={`${AppRoute.Events}/${id}`} className="main__events-content-slide-head">
                    {name}
                </Link>
                <div className="main__events-content-slide-dates">
                    <div className="main__events-content-slide-dates-date">
                        <span>Начало</span>
                        {/*<h4>12</h4>
                                <p>марта</p>*/}
                        <p>{humanizeDate(start_date)}</p>
                    </div>
                    <div className="main__events-content-slide-dates-date">
                        <span>Конец</span>
                        {/*<h4>14</h4>
                                <p>марта</p>*/}
                        <p>{humanizeDate(end_date)}</p>
                    </div>
                </div>
                <div className="main__events-content-slide-info">
                    <p>{city}</p>
                    <span className="main__events-content-slide-info-price">{visit_cost}</span>
                </div>
            </div>
        </>
    );
}
