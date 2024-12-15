import { Link, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { fetchEventData } from '../store/api-actions';
import { getEvent, getLoadingEvent, getLoadingRegisterForEvent, getRegisterForEventMessedge } from '../store/events-process/selectors';
import Loading from '../components/Loading';
import CopyButtonWithFeedback from '../components/CopyTextButton';
import { phoneFormater } from '../services/utils/PhoneFormater';
import { formatDate, TimeComponent } from '../services/utils/dataFormater';
import { getAuthorizationStatus, getProfile } from '../store/user-process/selectors';
import RegistrationForEvent from '../components/dialogs/RegistrationForEvent';

export default function EventPage() {
    const dispatch = useAppDispatch();
    const urlParams = useParams();
    const auth = useAppSelector(getAuthorizationStatus);

    useEffect(() => {
        dispatch(fetchEventData({ id: Number(urlParams.id) }));
    }, [dispatch, urlParams.id]);

    const event = useAppSelector(getEvent);
    const isLoading = useAppSelector(getLoadingEvent);
    const me = useAppSelector(getProfile);
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
                timeSlotsDescriptions={event?.time_slots_descriptions}
            />
            {!isLoading ? (
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
                                        Создать копию
                                    </Link>
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
                                        {event?.visit_cost === 0 ? 'Бесплатно' : `${event?.visit_cost} ₽`},{' '}
                                        <span>{event?.status === 'open' ? 'открытый доступ' : 'закрытый доступ'}</span>
                                    </p>
                                </div>
                            </div>
                            {auth === AuthorizationStatus.Auth ? (
                                <>
                                    {me?.email !== event?.creator.contacts.email ? (
                                        <button onClick={openDialog} className="event__card-btn btn_black">
                                            Подать заявку
                                        </button>
                                    ) : (
                                        <Link to={AppRoute.Invite} className="event__card-btn btn_black">
                                            Пригласить людей
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <p className="event__text_desc">Что-бы зарегистрироваться на мероприятие необходимо войти в аккаунт</p>
                            )}
                        </section>

                        <section className="event__desc">
                            <h2 className="event__desc-head">Описание</h2>

                            <p className="event__desc-text">{event?.description}</p>

                            <a href="path_to_file" download="proposed_file_name" className="event__desc-download">
                                <div className="event__desc-download-pic">
                                    <img src="/svg/event/docIcon.svg" alt="doc" />
                                </div>

                                <p>Программа мероприятия</p>

                                <span>megatz.docs</span>

                                <span>3.2 Мб</span>
                            </a>
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
