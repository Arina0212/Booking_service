import { Link, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import React, { useEffect, useState } from 'react';
import { fetchEventData, getInfoRegisterForEvent } from '../store/api-actions';
import {
    getEvent,
    getInfoForRegister,
    getLoadingEvent,
    getLoadingInfoForRegister,
    getLoadingRegisterForEvent,
    getRegisterForEventMessedge,
} from '../store/events-process/selectors';
import Loading from '../components/Loading';
import CopyButtonWithFeedback from '../components/CopyTextButton';
import { phoneFormater } from '../services/utils/PhoneFormater';
import { formatDate, TimeComponent } from '../services/utils/dataFormater';
import { getAuthorizationStatus, getProfile } from '../store/user-process/selectors';
import RegistrationForEvent from '../components/dialogs/RegistrationForEvent';
import FileInfo from '../components/FileInfo';
import EventOnlineInvite from '../components/OnlineLinkPostForm';

export default function EventPage() {
    const dispatch = useAppDispatch();
    const urlParams = useParams();
    const auth = useAppSelector(getAuthorizationStatus);

    useEffect(() => {
        dispatch(fetchEventData({ id: Number(urlParams.id) }));
        dispatch(getInfoRegisterForEvent({ id: Number(urlParams.id) }));
    }, [dispatch, urlParams.id]);

    const event = useAppSelector(getEvent);
    const isLoading = useAppSelector(getLoadingEvent);
    const me = useAppSelector(getProfile);
    const isLoadingInfoForRegister = useAppSelector(getLoadingInfoForRegister);
    const infoForRegister = useAppSelector(getInfoForRegister);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isLoadingRegister = useAppSelector(getLoadingRegisterForEvent);
    const getMessage = useAppSelector(getRegisterForEventMessedge);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    return (
        <>
            <RegistrationForEvent
                isOpen={isDialogOpen}
                onClose={closeDialog}
                isLoading={isLoadingRegister}
                message={getMessage}
                customFields={infoForRegister?.custom_fields}
                timeSlotsDescriptions={event?.time_slots_descriptions}
            />
            {!isLoading || (auth === AuthorizationStatus.Auth && !isLoadingInfoForRegister) ? (
                <>
                    <Header />
                    <main className="event">
                        <section className="event__card">
                            <div className="event__card-pic">
                                <img src={`${event?.photo_url ? event?.photo_url : '/svg/event/defaultBanner.svg'}`} alt="event" />
                            </div>

                            <div className="event__card-tags">
                                <div className="event__card-tags-tag">{event?.format}</div>
                                {event?.state === 'Завершено' && (
                                    <div className="event__card-tags-tag event__card-tags-tag_closed">{event?.state}</div>
                                )}
                                {event?.state === 'Идёт' && (
                                    <div className="event__card-tags-tag  event__card-tags-tag_goes">{event?.state}</div>
                                )}
                            </div>
                            {me?.email === event?.creator.contacts.email && (
                                <div className="event__card-links">
                                    <Link to={AppRoute.Main} className="event__card-links-link">
                                        Редактировать
                                    </Link>
                                </div>
                            )}

                            <h1 className="event__card-title">{event?.name}</h1>

                            <div className="event__card-info">
                                <div className="event__card-info-item">
                                    <div className="event__card-info-item-pic">
                                        <img src="/svg/event/geoIcon.svg" alt="place" />
                                    </div>

                                    <p className="event__card-info-item-text event__card-info-item-text_prpl">
                                        {event?.city !== '' ? `${event?.city}, ${event?.address}` : 'Онлайн'}
                                    </p>
                                </div>
                                {event?.time_slots_descriptions.map((timeSlot, index) => (
                                    <div className="event__card-info-item" key={index}>
                                        <div className="event__card-info-item-pic">
                                            <img src="/svg/event/clockIcon.svg" alt="time" />
                                        </div>

                                        <p className="event__card-info-item-text">{`${formatDate(timeSlot.start_date)} ${TimeComponent(timeSlot.start_time)} - ${formatDate(timeSlot.end_date)} ${TimeComponent(timeSlot.end_time)}`}</p>

                                        <div className="event__card-info-item-ppl">
                                            <img src="/svg/event/pplIcon.svg" alt="ppl" />
                                        </div>

                                        <Link to={''} className="event__card-info-item-amount">
                                            {timeSlot.bookings_count}
                                            {timeSlot.seats_number !== null && timeSlot.seats_number !== 0
                                                ? ` / ${timeSlot.seats_number}`
                                                : ''}
                                        </Link>
                                    </div>
                                ))}

                                <div className="event__card-info-item">
                                    <div className="event__card-info-item-pic">
                                        <img src="/svg/event/saleIcon.svg" alt="price" />
                                    </div>

                                    <p className="event__card-info-item-text">
                                        {event?.visit_cost === 0 ? 'Бесплатно' : `${event?.visit_cost} ₽`}
                                        <span>{event?.status === 'open' ? '' : ', закрытый доступ'}</span>
                                    </p>
                                </div>
                            </div>
                            {event?.state !== 'Завершено' && (
                                <>
                                    {auth === AuthorizationStatus.Auth ? (
                                        <>
                                            {me?.email !== event?.creator.contacts.email ? (
                                                <button onClick={openDialog} className="event__card-btn btn_black">
                                                    Подать заявку
                                                </button>
                                            ) : (
                                                <Link
                                                    to={
                                                        {
                                                            pathname: AppRoute.Invite,
                                                            state: { from: window.location.href },
                                                            hash: window.location.href,
                                                        } as { pathname: string; state: { from: string }; hash: string }
                                                    }
                                                    className="event__card-btn btn_black"
                                                >
                                                    Пригласить людей
                                                </Link>
                                            )}
                                        </>
                                    ) : (
                                        <p className="event__text_desc">
                                            Что-бы зарегистрироваться на мероприятие необходимо войти в аккаунт
                                        </p>
                                    )}
                                </>
                            )}
                        </section>

                        <section className="event__desc">
                            {event && event?.state !== 'Завершено' && event.city === '' && (
                                <>
                                    {me?.email === event?.creator.contacts.email ? (
                                        <>
                                            <EventOnlineInvite event_id={event.id} />
                                        </>
                                    ) : (
                                        <>
                                            {event?.online_link && (
                                                <div className="event__desc-invite">
                                                    <div className="event__desc-invite-input input_white">
                                                        <input
                                                            className="input_white-field"
                                                            value={event?.online_link}
                                                            type="text"
                                                            placeholder="Скопировать"
                                                            readOnly
                                                        />
                                                    </div>
                                                    <Link to={event?.online_link} className="event__desc-invite-btn btn_black">
                                                        Перейти
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                            <h2 className="event__desc-head">Описание</h2>

                            <p className="event__desc-text">{event?.description}</p>
                            {event?.schedule_url && <FileInfo fileUrl={event.schedule_url} />}
                        </section>

                        <section className="event__host">
                            <h2 className="event__host-head">Организатор</h2>

                            <div className="event__host-pic">
                                <img src={`${event?.creator.photo_url ? event?.creator.photo_url : '/svg/defaultUser1.svg'}`} alt="host" />
                            </div>
                            {event?.creator.company !== '' && (
                                <>
                                    <span className="event__host-subhead">Компания:</span>
                                    <p className="event__host-text">{event?.creator.company}</p>
                                </>
                            )}

                            <span className="event__host-subhead">ФИО:</span>
                            <p className="event__host-text">{`${event?.creator.last_name} ${event?.creator.first_name} ${event?.creator.patronymic}`}</p>

                            <span className="event__host-subhead">Контакты:</span>
                            {!!event?.creator.contacts.phone_number && (
                                <div className="event__host-contact">
                                    <img src="/svg/event/whatsappIcon.svg" alt="phone" />
                                    <CopyButtonWithFeedback textToCopy={phoneFormater(event?.creator.contacts.phone_number)} />
                                </div>
                            )}
                            {!!event?.creator.contacts.whatsapp &&
                                event?.creator.contacts.phone_number !== event?.creator.contacts.whatsapp && (
                                    <div className="event__host-contact">
                                        <img src="/svg/event/whatsappIcon.svg" alt="whatsapp" />
                                        <CopyButtonWithFeedback textToCopy={phoneFormater(event?.creator.contacts.whatsapp)} />
                                    </div>
                                )}
                            {!!event?.creator.contacts.vk && (
                                <div className="event__host-contact">
                                    <img src="/svg/event/vkIcon.svg" alt="vk" />
                                    <CopyButtonWithFeedback textToCopy={event?.creator.contacts.vk} />
                                </div>
                            )}
                            {!!event?.creator.contacts.telegram && (
                                <div className="event__host-contact">
                                    <img src="/svg/event/tgIcon.svg" alt="tg" />
                                    <CopyButtonWithFeedback textToCopy={event?.creator.contacts.telegram} />
                                </div>
                            )}
                            {!!event?.creator.contacts.email && (
                                <div className="event__host-contact">
                                    <img src="/svg/event/mailIcon.svg" alt="mail" />
                                    <CopyButtonWithFeedback textToCopy={event?.creator.contacts.email} />
                                </div>
                            )}
                        </section>
                    </main>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
