import Header from '../components/Header';
import EventsBlock from '../components/EventsBlock';
import Dropdown from '../components/DropDown';
import * as React from 'react';
import { useEffect } from 'react';
import MyDateRangePicker from '../components/DataRangePicker/DataRangePicker';
import { parseDate } from '@internationalized/date';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAllEventsData } from '../store/api-actions';
import { getAllEvents, getLoadingAllEvents } from '../store/events-process/selectors';
import Loading from '../components/Loading';

export default function MainPage() {
    let [value, setValue] = React.useState({
        start: parseDate(new Date().toISOString().split('T')[0]),
        end: parseDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllEventsData());
    }, [dispatch]);

    const events = useAppSelector(getAllEvents);
    const isLoading = useAppSelector(getLoadingAllEvents);
    return (
        <>
            <Header />
            <div className="main">
                <section className="main__filters">
                    <div className="main__filters-input input_white">
                        <input className="input_white-field" type="text" placeholder="Поиск" />
                        <div className="input_white-search">
                            <img src="/svg/searchIcon.svg" alt="search" draggable="false" />
                        </div>
                    </div>
                    <MyDateRangePicker value={value} onChange={setValue} />

                    <Dropdown
                        placeHolder="Место:"
                        type="arrow-down"
                        options={[{ labelValue: 'все' }, { labelValue: 1 }, { labelValue: 2 }, { labelValue: 3 }, { labelValue: 4 }]}
                    />
                    <Dropdown
                        placeHolder="Формат:"
                        type="arrow-down"
                        options={[{ labelValue: 'все' }, { labelValue: 1 }, { labelValue: 2 }, { labelValue: 3 }, { labelValue: 4 }]}
                    />
                </section>
                {!isLoading ? (
                    <>
                        <EventsBlock title={'Мои мероприятия'} events={events} />
                        {/* <EventsBlock title={'Мероприятия с моим участием'} events={events} />
                        <EventsBlock title={'Другие открытые мероприятия'} events={events} />*/}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
}
