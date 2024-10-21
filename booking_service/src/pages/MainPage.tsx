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
                                <span>Даты:</span>&nbsp;<p className="dropdown-select-selected-text">в любое время</p>
                            </div>
                            <div className="dropdown-select-caret">
                                <img src="/svg/caret.svg" alt="caret" />
                            </div>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-menu-wrapper">
                                <div className="dropdown-menu-item">
                                    <p className="dropdown-menu-item-text">Онлайн</p>
                                </div>
                                <div className="dropdown-menu-item">
                                    <p className="dropdown-menu-item-text">Екатеринбург</p>
                                </div>
                                <div className="dropdown-menu-item">
                                    <p className="dropdown-menu-item-text">Москва</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dropdown
                        placeHolder="Место:"
                        type="arrow-down"
                        options={[
                            { label: '0', labelValue: 0 },
                            { label: '1', labelValue: 1 },
                            {
                                label: '2',
                                labelValue: 2,
                            },
                            { label: '3', labelValue: 3 },
                            { label: '4', labelValue: 4 },
                        ]}
                    />
                    <Dropdown
                        placeHolder="Формат:"
                        type="arrow-down"
                        options={[
                            { label: '0', labelValue: 0 },
                            { label: '1', labelValue: 1 },
                            {
                                label: '2',
                                labelValue: 2,
                            },
                            { label: '3', labelValue: 3 },
                            { label: '4', labelValue: 4 },
                        ]}
                    />

                    {/*<DropDown
                        title={
                            <div className="dropdown-select">
                                <div className="dropdown-select-selected">
                                    <span>Место:</span>&nbsp;<p className="dropdown-select-selected-text">все</p>
                                </div>
                            </div>
                        }
                        content={
                            <div className="dropdown-menu">
                                <div className="dropdown-menu-wrapper">
                                    <div className="dropdown-menu-item">
                                        <p className="dropdown-menu-item-text">Онлайн</p>
                                    </div>
                                    <div className="dropdown-menu-item">
                                        <p className="dropdown-menu-item-text">Екатеринбург</p>
                                    </div>
                                    <div className="dropdown-menu-item">
                                        <p className="dropdown-menu-item-text">Москва</p>
                                    </div>
                                </div>
                            </div>
                        }
                    />*/}

                    {/*<div className="main__filters-dropdown dropdown">
                        <div className="dropdown-select">
                            <div className="dropdown-select-selected">
                                <span>Формат:</span>&nbsp;<p className="dropdown-select-selected-text">все</p>
                            </div>
                            <div className="dropdown-select-caret">
                                <img src="/svg/caret.svg" alt="caret" />
                            </div>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-menu-wrapper">
                                <div className="dropdown-menu-item">
                                    <p className="dropdown-menu-item-text">Онлайн</p>
                                </div>
                                <div className="dropdown-menu-item">
                                    <p className="dropdown-menu-item-text">Екатеринбург</p>
                                </div>
                                <div className="dropdown-menu-item">
                                    <p className="dropdown-menu-item-text">Москва</p>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </section>

                <EventsBlock title={'Мои мероприятия'} events={EVENTS} />
                <EventsBlock title={'Мероприятия с моим участием'} events={EVENTS} />
                <EventsBlock title={'Другие открытые мероприятия'} events={EVENTS} />
            </div>
        </>
    );
}
