import { Link } from 'react-router-dom';
import { humanizeDate, TimeComponent } from '../services/utils/dataFormater';
import { AppRoute, MONTH } from '../const';

type EventCardProps = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    city: string;
    visit_cost: number;
    format: string;
    photo_url: string;
    start_time: string;
    end_time: string;
    state: string;
};

export default function EventCard({
    id,
    name,
    start_date,
    end_date,
    city,
    visit_cost,
    format,
    photo_url,
    start_time,
    end_time,
    state,
}: EventCardProps) {
    const startDate = humanizeDate(start_date).split('.');
    const startMonth = Number(startDate[1]) - 1;
    const endtDate = humanizeDate(end_date).split('.');
    const endMonth = Number(endtDate[1]) - 1;

    return (
        <>
            {start_date && end_date && (
                <div className={`main__events-content-slide ${state === 'Завершено' ? 'event_closed' : ''}`}>
                    <Link to={`${AppRoute.Events}/${id}`} className="main__events-content-slide-pic" draggable="false">
                        <img src={`${photo_url ? photo_url : '/svg/event/defaultBanner.svg'}`} alt="event" />
                        <p>{format}</p>
                    </Link>
                    <div className="event__card_main-tags">
                        {state === 'Завершено' && <div className="event__card-tags-tag event__card_main-tags-tag_closed">{state}</div>}
                        {state === 'Идёт' && <div className="event__card-tags-tag  event__card_main-tags-tag_goes">{state}</div>}
                    </div>
                    <Link to={`${AppRoute.Events}/${id}`} className="main__events-content-slide-head">
                        {name}
                    </Link>
                    <div className="main__events-content-slide-dates">
                        <div className="main__events-content-slide-dates-date">
                            <span>Начало</span>
                            <h4>{startDate[0]}</h4>
                            <p>{MONTH[startMonth]}</p>
                            <p>{TimeComponent(start_time)}</p>
                        </div>
                        <div className="main__events-content-slide-dates-date">
                            <span>Конец</span>
                            <h4>{endtDate[0]}</h4>
                            <p>{MONTH[endMonth]}</p>
                            <p>{TimeComponent(end_time)}</p>
                        </div>
                    </div>
                    <div className="main__events-content-slide-info">
                        {city === '' ? <p>Онлайн</p> : <p>{city}</p>}
                        {visit_cost === 0 && <span className="main__events-content-slide-info-price_free">Бесплатно</span>}
                        {visit_cost > 0 && <span className="main__events-content-slide-info-price">{visit_cost}₽</span>}
                    </div>
                </div>
            )}
        </>
    );
}
