import Header from '../components/Header';
import { EVENTS } from '../types/moks';
import EventsBlock from '../components/EventsBlock';
import Dropdown from '../components/DropDown';
import * as React from 'react';
import MyDateRangePicker from '../components/DataRangePicker/DataRangePicker';
import { parseDate } from '@internationalized/date';

export default function MainPage() {
    let [value, setValue] = React.useState({
        start: parseDate('2024-10-23'),
        end: parseDate('2024-10-25'),
    });
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

                <EventsBlock title={'Мои мероприятия'} events={EVENTS} />
                <EventsBlock title={'Мероприятия с моим участием'} events={EVENTS} />
                <EventsBlock title={'Другие открытые мероприятия'} events={EVENTS} />
            </div>
        </>
    );
}
