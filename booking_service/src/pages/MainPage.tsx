import Header from '../components/Header';
import EventsBlock from '../components/EventsBlock';
import Dropdown from '../components/DropDown';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
    fetchAllEventsData,
    fetchCitiesData,
    fetchMyEventsData,
    fetchOtherEventsData,
    fetchParticipateEventsData,
    postFiltersAction,
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
import DateRangePicker from '../components/DataRangePicker/DataRangePicker';
import { getAltDate } from '../services/utils/dataFormater';

interface DateRange {
    start: Date | null;
    end: Date | null;
}

export default function MainPage() {
    const auth = useAppSelector(getAuthorizationStatus);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });

    const handleDateChange = (range: DateRange) => {
        setDateRange(range);
    };
    useEffect(() => {
        if (dateRange.end !== null) {
            sendFilters(city, format);
        }
    }, [dateRange.end]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCitiesData());
        if (auth === AuthorizationStatus.Auth) {
            dispatch(fetchMyEventsData());
            dispatch(fetchParticipateEventsData());
            dispatch(fetchOtherEventsData());
        } else {
            dispatch(fetchAllEventsData());
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
    const [search, setSearchTerm] = useState<string | null>(null);
    const [city, setSelectedCity] = useState<string | null>(null);
    const [format, setSelectedFormat] = useState<string | null>(null);
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target?.value;
        setSearchTerm(val);
        sendFilters(city, format);
    };

    const sendFilters = (selectedCity: string | null, selectedFormat: string | null) => {
        const cityToSend = selectedCity === 'все' ? null : selectedCity;
        const formatToSend = selectedFormat === 'все' ? null : selectedFormat;

        const filters = {
            city: cityToSend,
            search,
            date_start: dateRange.start ? getAltDate(dateRange.start) : null,
            date_end: dateRange.end ? getAltDate(dateRange.end) : null,
            format: formatToSend,
        };

        dispatch(postFiltersAction(filters));
    };

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
                                <input
                                    className="input_white-field"
                                    type="text"
                                    placeholder="Поиск"
                                    value={search ? search : ''}
                                    onChange={handleSearchChange}
                                />
                                <div className="input_white-search">
                                    <img src="/svg/searchIcon.svg" alt="search" draggable="false" />
                                </div>
                            </div>

                            <DateRangePicker initialRange={dateRange} onDateChange={handleDateChange} />
                            <Dropdown
                                placeHolder="Город:"
                                type="arrow-down"
                                options={transformedCities.cities}
                                onChange={(value) => {
                                    setSelectedCity(value);
                                    sendFilters(value, format);
                                }}
                            />
                            <Dropdown
                                placeHolder="Формат:"
                                type="arrow-down"
                                options={FORMATS}
                                onChange={(value) => {
                                    setSelectedFormat(value);
                                    sendFilters(city, value);
                                }}
                            />
                        </section>

                        <>
                            {auth !== AuthorizationStatus.Auth ? (
                                <EventsBlock isLoading={isLoading} title={'Все мероприятия'} events={events} />
                            ) : (
                                <>
                                    {myEvents && myEvents?.length > 0 && (
                                        <EventsBlock isLoading={isMyLoading} title={'Мои мероприятия'} events={myEvents} />
                                    )}
                                    {participateEvents && participateEvents.length > 0 && (
                                        <EventsBlock
                                            isLoading={isParticipateLoading}
                                            title={'Мероприятия с моим участием'}
                                            events={participateEvents}
                                        />
                                    )}
                                    {otherEvents && otherEvents.length > 0 && (
                                        <EventsBlock
                                            isLoading={isOtherLoading}
                                            title={'Другие открытые мероприятия'}
                                            events={otherEvents}
                                        />
                                    )}
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
