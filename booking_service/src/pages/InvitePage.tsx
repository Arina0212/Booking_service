import Header from '../components/Header';

export default function InvitePage() {
    return (
        <>
            <Header />
            <section className="invite">
                <h1 className="invite__head">Хотите пригласить людей на мероприятие?</h1>

                <div className="invite__item">
                    <h2 className="invite__item-head">Ссылка на подключение</h2>
                    <p className="invite__item-text">
                        Пришлите им ссылку, чтобы они смогли присоединиться к мероприятию и узнать все подробности о нём
                    </p>
                    <p className="invite__item-link">https://asda//asd;a.wrere;asdasdasdasdasdasdkafkslfdkasld</p>
                    <button className="invite__item-copy">
                        <img src="/svg/event/copy.svg" alt="copy" />
                    </button>
                </div>

                <div className="invite__item">
                    <h2 className="invite__item-head">Отправить приглашение на почту</h2>
                    <p className="invite__item-text">
                        Отправьте приглашение на почту участникам - они получат письмо с информацией о мероприятии и ссылкой для подключения
                    </p>
                    <div className="invite__item-input input_white">
                        <input className="input_white-field" type="email" placeholder="Почта" />
                    </div>
                    <button className="invite__item-add">Добавить</button>
                    <p className="invite__item-mail">utenkov2003@mail.ru</p>
                    <button className="invite__item-delete">Удалить</button>

                    <button className="invite__item-send btn_black">Отправить приглашение</button>
                </div>

                <div className="invite__item">
                    <h2 className="invite__item-head">Пригласить людей из команд</h2>
                    <p className="invite__item-text">Выберите участников из ваших команд, кому отправить приглашение на мероприятие</p>

                    <a href="" className="invite__item-create">
                        Создать команду
                    </a>

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
                    <p>Если не хотите приглашать людей, просто нажмите далее</p>
                    <button type="submit" className="save__btn btn_black">
                        Далее
                    </button>
                </div>
            </section>
        </>
    );
}
