import { Link, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import React, { useEffect, useState } from 'react';
import { deleteBooking, fetchEventData, fetchIsMember, fetchListMembers, getInfoRegisterForEvent } from '../store/api-actions';
import {
    getEvent,
    getInfoForRegister,
    getIsCancelBookingLoading,
    getIsCancelEventLoading,
    getIsListOfMembersLoading,
    getIsMember,
    getListOfMembers,
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
import Spinner from '../components/Spinner';
import CancelEvent from '../components/dialogs/CancelEvent';
import ListOfParticipants from '../components/dialogs/ListOfParticipants';

export default function EventPage() {
    const dispatch = useAppDispatch();
    const urlParams = useParams();
    const auth = useAppSelector(getAuthorizationStatus);
    useEffect(() => {
        dispatch(fetchEventData({ id: Number(urlParams.id) }));

        if (auth === AuthorizationStatus.Auth) {
            dispatch(fetchIsMember({ id: Number(urlParams.id) }));
            dispatch(getInfoRegisterForEvent({ id: Number(urlParams.id) }));
        }
    }, [auth, dispatch, urlParams.id]);
    const isMember = useAppSelector(getIsMember);
    const event = useAppSelector(getEvent);
    const isLoading = useAppSelector(getLoadingEvent);
    const me = useAppSelector(getProfile);
    useEffect(() => {
        if (auth === AuthorizationStatus.Auth && me?.email === event?.creator.contacts.email) {
            dispatch(fetchListMembers({ id: Number(urlParams.id) }));
        }
    }, [auth, dispatch, event?.creator.contacts.email, me?.email, urlParams.id]);
    const isLoadingInfoForRegister = useAppSelector(getLoadingInfoForRegister);
    const infoForRegister = useAppSelector(getInfoForRegister);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogCancelOpen, setIsDialogCancelOpen] = useState(false);
    const [isDialogListOpen, setIsDialogListOpen] = useState(false);
    const isLoadingRegister = useAppSelector(getLoadingRegisterForEvent);
    const getMessage = useAppSelector(getRegisterForEventMessedge);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const openCancelDialog = () => setIsDialogCancelOpen(true);
    const closeCancelDialog = () => setIsDialogCancelOpen(false);
    const [selectSlot, setSelectedSlot] = useState<number | null>(null);
    const closeListDialog = () => {
        setIsDialogListOpen(false);
        setSelectedSlot(null);
    };
    const isCancelBookingLoaging = useAppSelector(getIsCancelBookingLoading);
    const isCancelEventLoading = useAppSelector(getIsCancelEventLoading);

    const handleCancelBooking = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(deleteBooking({ id: Number(urlParams.id) }));
    };
    const handleListOfMembers = () => {
        if (auth === AuthorizationStatus.Auth && me?.email === event?.creator.contacts.email) {
            setIsDialogListOpen(true);
        }
    };
    const listOfMembers = useAppSelector(getListOfMembers);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isListOfMembersLoading = useAppSelector(getIsListOfMembersLoading);
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
            <CancelEvent isOpen={isDialogCancelOpen} onClose={closeCancelDialog} isLoading={isCancelEventLoading} />
            <ListOfParticipants isOpen={isDialogListOpen} onClose={closeListDialog} listOfMembers={listOfMembers} selectSlot={selectSlot} />

            {!isLoading || (auth === AuthorizationStatus.Auth && !isLoadingInfoForRegister) ? (
                <>
                    <Header />

                    <main className="event display_none_print">
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
                                    <Link to={`${AppRoute.Events}/${event?.id}/edit`} className="event__card-links-link">
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

                                        <button type="button" onClick={handleListOfMembers} className="event__card-info-item-amount">
                                            {timeSlot.bookings_count}
                                            {timeSlot.seats_number !== null && timeSlot.seats_number !== 0
                                                ? ` / ${timeSlot.seats_number}`
                                                : ''}
                                        </button>
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
                                                <>
                                                    {isMember ? (
                                                        <button onClick={handleCancelBooking} className="event__card-btn btn_black">
                                                            {isCancelBookingLoaging ? <Spinner /> : 'Отменить участие'}
                                                        </button>
                                                    ) : (
                                                        <button onClick={openDialog} className="event__card-btn btn_black">
                                                            Подать заявку
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={openCancelDialog} className="event__card_closed" type="button">
                                                        Завершить
                                                    </button>
                                                    <Link
                                                        to={
                                                            {
                                                                pathname: AppRoute.Invite,
                                                                state: { from: window.location.href },
                                                                hash: window.location.href,
                                                            } as {
                                                                pathname: string;
                                                                state: { from: string };
                                                                hash: string;
                                                            }
                                                        }
                                                        className="event__card-btn btn_black"
                                                    >
                                                        Пригласить людей
                                                    </Link>
                                                </>
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
                                            <h2 className="event__desc-head">Ссылка на подключение</h2>

                                            <p className="event__desc-text">Добавьте ссылку на подключение к вашему онлайн мероприятию</p>
                                            <EventOnlineInvite event_id={event.id} onlineLink={event.online_link} />
                                        </>
                                    ) : (
                                        <>
                                            {event?.online_link && isMember && (
                                                <>
                                                    <h2 className="event__desc-head">Ссылка на подключение</h2>

                                                    <p className="event__desc-text">
                                                        Перейдите по ссылке для подключения к онлайн мероприятию
                                                    </p>
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
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                            {event?.description !== '' && (
                                <>
                                    <h2 className="event__desc-head">Описание</h2>

                                    <p className="event__desc-text">{event?.description}</p>
                                    {event?.schedule_url && <FileInfo fileUrl={event.schedule_url} />}
                                </>
                            )}
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
