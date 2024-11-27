import Header from '../components/Header';
import EventsBlock from '../components/EventsBlock';
import Dropdown from '../components/DropDown';
import * as React from 'react';
import { useEffect } from 'react';
import MyDateRangePicker from '../components/DataRangePicker/DataRangePicker';
import { parseDate } from '@internationalized/date';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
    fetchAllEventsData,
    fetchCitiesData,
    fetchMyEventsData,
    fetchOtherEventsData,
    fetchParticipateEventsData,
} from '../store/api-actions';
import {
    getAllEvents,
    getCities,
    getLoadingAllEvents,
    getLoadingMyEvents,
    getLoadingOtherEvents,
    getLoadingParticipateEvents,
    getMyEvents,
    getOtherEvents,
    getParticipateEvents,
} from '../store/events-process/selectors';
import { AppRoute, AuthorizationStatus, FORMATS } from '../const';
import { getAuthorizationStatus, getLoadingProfile, getProfile } from '../store/user-process/selectors';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { Cities, TransformedCities } from '../types/EventData';

export default function MainPage() {
    const auth = useAppSelector(getAuthorizationStatus);
    let [value, setValue] = React.useState({
        start: parseDate(new Date().toISOString().split('T')[0]),
        end: parseDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCitiesData());
        {
            auth !== AuthorizationStatus.Auth && dispatch(fetchAllEventsData());
        }

        {
            auth === AuthorizationStatus.Auth && dispatch(fetchMyEventsData());
            dispatch(fetchParticipateEventsData());
            dispatch(fetchOtherEventsData());
        }
    }, [auth, dispatch]);
    const profileData = useAppSelector(getProfile);
    const events = useAppSelector(getAllEvents);
    const myEvents = useAppSelector(getMyEvents);
    const participateEvents = useAppSelector(getParticipateEvents);
    const otherEvents = useAppSelector(getOtherEvents);
    const isLoading = useAppSelector(getLoadingAllEvents);
    const isMyLoading = useAppSelector(getLoadingMyEvents);
    const isParticipateLoading = useAppSelector(getLoadingParticipateEvents);
    const isOtherLoading = useAppSelector(getLoadingOtherEvents);
    const isProfileLoading = useAppSelector(getLoadingProfile);
    const originCities = useAppSelector(getCities);

    function transformCities(cities: Cities | undefined): TransformedCities {
        const transformed: TransformedCities = { cities: [] };
        transformed.cities.push({ labelValue: 'все' });
        cities?.cities.forEach((city) => {
            transformed.cities.push({ labelValue: city });
        });

        return transformed;
    }

    const transformedCities = transformCities(originCities);

    return (
        <>
            {!isProfileLoading || auth !== AuthorizationStatus.Auth ? (
                <>
                    <Header />
                    <div className="main">
                        {auth === AuthorizationStatus.Auth &&
                            !profileData?.first_name &&
                            !profileData?.last_name &&
                            !profileData?.patronymic &&
                            !profileData?.city && (
                                <div className="main_create-profile-button">
                                    <p>Необходимо заполнить профиль</p>
                                    <Link className="profile__save-btn btn_black" to={AppRoute.Lk}>
                                        Заполнить профиль
                                    </Link>
                                </div>
                            )}
                        <section className="main__filters">
                            <div className="main__filters-input input_white">
                                <input className="input_white-field" type="text" placeholder="Поиск" />
                                <div className="input_white-search">
                                    <img src="/svg/searchIcon.svg" alt="search" draggable="false" />
                                </div>
                            </div>
                            <MyDateRangePicker value={value} onChange={setValue} />
                            <Dropdown placeHolder="Город:" type="arrow-down" options={transformedCities.cities} />
                            <Dropdown placeHolder="Формат:" type="arrow-down" options={FORMATS} />
                        </section>

                        <>
                            {auth !== AuthorizationStatus.Auth ? (
                                <EventsBlock isLoading={isLoading} title={'Все мероприятия'} events={events} />
                            ) : (
                                <>
                                    <EventsBlock isLoading={isMyLoading} title={'Мои мероприятия'} events={myEvents} />

                                    <EventsBlock
                                        isLoading={isParticipateLoading}
                                        title={'Мероприятия с моим участием'}
                                        events={participateEvents}
                                    />

                                    <EventsBlock isLoading={isOtherLoading} title={'Другие открытые мероприятия'} events={otherEvents} />
                                </>
                            )}
                        </>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
