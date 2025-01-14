import Header from '../components/Header';
import { useAppSelector } from '../hooks';
import { geOutputMessage, getEvent } from '../store/events-process/selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import 'react-toastify/ReactToastify.min.css';
import InviteComponent from '../components/AddEmails';
import CopyButtonWithFeedback from '../components/CopyTextButton';
import React from 'react';

export default function InvitePage() {
    const message = useAppSelector(geOutputMessage);
    const event = useAppSelector(getEvent);
    return (
        <>
            <Header />
            <section className="invite">
                <h1 className="invite__head">Хотите пригласить людей на мероприятие?</h1>

                <div className="invite__item">
                    <h2 className="invite__item-head">Ссылка на мероприятие</h2>
                    <p className="invite__item-text">
                        Пришлите им ссылку, чтобы они смогли присоединиться к мероприятию и узнать все подробности о нём
                    </p>
                    {message ? (
                        <>
                            <p className="invite__item-link">{message?.event_link}</p>
                            <CopyButtonWithFeedback textToCopy={message?.event_link} isIcon={true} />
                        </>
                    ) : (
                        <>
                            {/*<p className="invite__item-link">{previousUrl.replace(/^#/, '')}</p>
                            <CopyButtonWithFeedback textToCopy={previousUrl.replace(/^#/, '')} isIcon={true} />*/}
                        </>
                    )}
                </div>

                <div className="invite__item">
                    <h2 className="invite__item-head">Отправить приглашение на почту</h2>
                    <p className="invite__item-text">
                        Отправьте приглашение на почту участникам - они получат письмо с информацией о мероприятии и ссылкой для подключения
                    </p>
                    <InviteComponent event_id={event?.id} />
                </div>

                <div className="save save_hide">
                    <p>Если не хотите приглашать людей, просто нажмите "К мероприятию"</p>
                    {event?.status === 'close' ? (
                        <>
                            <Link to={`${AppRoute.Events}/${event.unique_key}`} className="save__btn btn_black">
                                К мероприятию
                            </Link>
                        </>
                    ) : (
                        <>
                            {message ? (
                                <Link to={`${AppRoute.Events}/${message?.event_id}`} className="save__btn btn_black">
                                    К мероприятию
                                </Link>
                            ) : (
                                <Link to={`${AppRoute.Events}/${event?.id}`} className="save__btn btn_black">
                                    К мероприятию
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
