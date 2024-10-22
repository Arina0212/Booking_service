import Header from '../components/Header';
import { EVENTS } from '../types/moks';
import EventsBlock from '../components/EventsBlock';
import Dropdown from '../components/DropDown';

export default function MainPage() {
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

                    <div className="main__filters-dropdown main__filters-dropdown_1 dropdown">
                        <div className="dropdown-select">
                            <div className="dropdown-select-selected">
                                {/* <span>Даты:</span>&nbsp;<p className="dropdown-select-selected-text">в любое время</p>*/}
                            </div>
                        </div>
                        {/*<div className="dropdown-menu">
                           
                        </div>*/}
                    </div>
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
