import Header from '../components/Header';
import { useAppSelector } from '../hooks';
import { geOutputMessage } from '../store/events-process/selectors';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import 'react-toastify/ReactToastify.min.css';
import InviteComponent from '../components/AddEmails';
import CopyButtonWithFeedback from '../components/CopyTextButton';
import React from 'react';

export default function InvitePage() {
    const message = useAppSelector(geOutputMessage);
    const location = useLocation();
    console.log(location); // Посмотрите, что выводится в консоль
    const previousUrl = location.hash;
    const match = previousUrl.match(/(\d+)$/);

    const lastNumber = match ? match[0] : null;
    console.log('previousUrl', location, previousUrl);
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
                            <p className="invite__item-link">{previousUrl.replace(/^#/, '')}</p>
                            <CopyButtonWithFeedback textToCopy={previousUrl.replace(/^#/, '')} isIcon={true} />
                        </>
                    )}
                </div>

                <div className="invite__item">
                    <h2 className="invite__item-head">Отправить приглашение на почту</h2>
                    <p className="invite__item-text">
                        Отправьте приглашение на почту участникам - они получат письмо с информацией о мероприятии и ссылкой для подключения
                    </p>
                    <InviteComponent />
                </div>

                <div className="invite__item">
                    <h2 className="invite__item-head">Пригласить людей из команд</h2>
                    <p className="invite__item-text">Выберите участников из ваших команд, кому отправить приглашение на мероприятие</p>

                    <Link to="" className="invite__item-create">
                        Создать команду
                    </Link>

                    <form className="invite__item-invites">
                        <div className="invite__item-team">
                            <div className="invite__item-team-head invite__item-team-head_active">
                                <input id="inviteCheckbox1" type="checkbox" className="visually-hidden" />
                                <label htmlFor="inviteCheckbox1" className="invite__item-team-head-checkbox">
                                    <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                </label>
                                <h1>Команда 1</h1>
                                <div className="invite__item-team-head-pic">
                                    <img src="/svg/caret.svg" alt="caret" />
                                </div>
                            </div>
                            <div className="invite__item-team-content invite__item-team-content_active">
                                <div className="invite__item-team-content-wrap">
                                    <div className="invite__item-team-content-member">
                                        <input id="inviteCheckbox1_1" type="checkbox" className="visually-hidden" />
                                        <label htmlFor="inviteCheckbox1_1" className="invite__item-team-content-member-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                        </label>
                                        <p className="invite__item-team-content-member-text">utenkov2003@mailr.u</p>
                                    </div>
                                    <div className="invite__item-team-content-member">
                                        <input id="inviteCheckbox1_2" type="checkbox" className="visually-hidden" />
                                        <label htmlFor="inviteCheckbox1_2" className="invite__item-team-content-member-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                        </label>
                                        <p className="invite__item-team-content-member-text">Богданов Богдан Богданович</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invite__item-team">
                            <div className="invite__item-team-head">
                                <input id="inviteCheckbox2" type="checkbox" className="visually-hidden" />
                                <label htmlFor="inviteCheckbox2" className="invite__item-team-head-checkbox">
                                    <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                </label>
                                <h1>Команда 1</h1>
                                <div className="invite__item-team-head-pic">
                                    <img src="/svg/caret.svg" alt="caret" />
                                </div>
                            </div>
                            <div className="invite__item-team-content">
                                <div className="invite__item-team-content-wrap">
                                    <div className="invite__item-team-content-member">
                                        <input id="inviteCheckbox2_1" type="checkbox" className="visually-hidden" />
                                        <label htmlFor="inviteCheckbox2_1" className="invite__item-team-content-member-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                        </label>
                                        <p className="invite__item-team-content-member-text">utenkov2003@mailr.u</p>
                                    </div>
                                    <div className="invite__item-team-content-member">
                                        <input id="inviteCheckbox2_2" type="checkbox" className="visually-hidden" />
                                        <label htmlFor="inviteCheckbox2_2" className="invite__item-team-content-member-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                        </label>
                                        <p className="invite__item-team-content-member-text">Богданов Богдан Богданович</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invite__item-team">
                            <div className="invite__item-team-head">
                                <input id="inviteCheckbox3" type="checkbox" className="visually-hidden" />
                                <label htmlFor="inviteCheckbox3" className="invite__item-team-head-checkbox">
                                    <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                </label>
                                <h1>Команда 1</h1>
                                <div className="invite__item-team-head-pic">
                                    <img src="/svg/caret.svg" alt="caret" />
                                </div>
                            </div>
                            <div className="invite__item-team-content">
                                <div className="invite__item-team-content-wrap">
                                    <div className="invite__item-team-content-member">
                                        <input id="inviteCheckbox3_1" type="checkbox" className="visually-hidden" />
                                        <label htmlFor="inviteCheckbox3_1" className="invite__item-team-content-member-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                        </label>
                                        <p className="invite__item-team-content-member-text">utenkov2003@mailr.u</p>
                                    </div>
                                    <div className="invite__item-team-content-member">
                                        <input id="inviteCheckbox3_2" type="checkbox" className="visually-hidden" />
                                        <label htmlFor="inviteCheckbox3_2" className="invite__item-team-content-member-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="&#x2705;" />
                                        </label>
                                        <p className="invite__item-team-content-member-text">Богданов Богдан Богданович</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="invite__item-invites-btn btn_black">
                            Отправить приглашение
                        </button>
                    </form>
                </div>

                <div className="save save_hide">
                    <p>Если не хотите приглашать людей, просто нажмите "К мероприятию"</p>
                    {message ? (
                        <Link to={`${AppRoute.Events}/${message?.event_id}`} className="save__btn btn_black">
                            К мероприятию
                        </Link>
                    ) : (
                        <Link to={`${AppRoute.Events}/${lastNumber}`} className="save__btn btn_black">
                            К мероприятию
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
}
