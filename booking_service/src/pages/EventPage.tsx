import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import Header from '../components/Header';

export default function EventPage() {
    return (
        <>
            <Header />
            <main className="event">
                <section className="event__card">
                    <div className="event__card-pic">
                        <img src="/img/testEvent.png" alt="event" />
                    </div>

                    <div className="event__card-tags">
                        <div className="event__card-tags-tag">Питч</div>
                        <div className="event__card-tags-tag event__card-tags-tag_closed">Завершено</div>
                    </div>

                    <div className="event__card-links">
                        <Link to={AppRoute.Main} className="event__card-links-link">
                            Создать копию
                        </Link>
                        <Link to={AppRoute.Main} className="event__card-links-link">
                            Редактировать
                        </Link>
                    </div>

                    <h1 className="event__card-title">Предварительная защита проектов</h1>

                    <div className="event__card-info">
                        <div className="event__card-info-item">
                            <div className="event__card-info-item-pic">
                                <img src="/svg/event/geoIcon.svg" alt="place" />
                            </div>

                            <p className="event__card-info-item-text event__card-info-item-text_prpl">
                                Екатеринбург,Точка кипения УрФУ Екатеринбург
                            </p>
                        </div>
                        <div className="event__card-info-item">
                            <div className="event__card-info-item-pic">
                                <img src="/svg/event/clockIcon.svg" alt="time" />
                            </div>

                            <p className="event__card-info-item-text">19 октября 18:00 – 20 октября 18:00</p>

                            <div className="event__card-info-item-ppl">
                                <img src="/svg/event/pplIcon.svg" alt="ppl" />
                            </div>

                            <a href="" className="event__card-info-item-amount">
                                363
                            </a>
                        </div>
                        <div className="event__card-info-item">
                            <div className="event__card-info-item-pic">
                                <img src="/svg/event/clockIcon.svg" alt="time" />
                            </div>

                            <p className="event__card-info-item-text">19 октября 18:00 – 20 октября 18:00</p>

                            <div className="event__card-info-item-ppl">
                                <img src="/svg/event/pplIcon.svg" alt="ppl" />
                            </div>

                            <a href="" className="event__card-info-item-amount">
                                1234
                            </a>
                        </div>
                        <div className="event__card-info-item">
                            <div className="event__card-info-item-pic">
                                <img src="/svg/event/saleIcon.svg" alt="price" />
                            </div>

                            <p className="event__card-info-item-text">
                                Бесплатно, <span>закрытый доступ</span>
                            </p>
                        </div>
                    </div>

                    <a href="" className="event__card-btn btn_black">
                        Подать заявку
                    </a>
                </section>

                <section className="event__desc">
                    <h2 className="event__desc-head">Описание</h2>

                    <p className="event__desc-text">Какое-то описание</p>

                    <a href="path_to_file" download="proposed_file_name" className="event__desc-download">
                        <div className="event__desc-download-pic">
                            <img src="/svg/event/docIcon.svg" alt="doc" />
                        </div>

                        <p>Программа мероприятия</p>

                        <span>megatz.docs</span>

                        <span>3.2 Мб</span>
                    </a>

                    <h2 className="event__desc-head">Другие поля</h2>

                    <p className="event__desc-text">Здесь свой текст, который захочет создатель меро</p>
                </section>

                <section className="event__host">
                    <h2 className="event__host-head">Организатор</h2>

                    <div className="event__host-pic">
                        <img src="/img/testHost.png" alt="host" />
                    </div>

                    <span className="event__host-subhead">Компания:</span>
                    <p className="event__host-text">ООО “ЕРАЛАШОВСКИЕ”</p>

                    <span className="event__host-subhead">ФИО:</span>
                    <p className="event__host-text">Сергеев Сергей Савельевич</p>

                    <span className="event__host-subhead">Контакты:</span>
                    <div className="event__host-contact">
                        <img src="/svg/event/whatsappIcon.svg" alt="whatsapp" />
                        <p>+79022721339</p>
                    </div>
                    <div className="event__host-contact">
                        <img src="/svg/event/vkIcon.svg" alt="vk" />
                        <p>@ruslikut</p>
                    </div>
                    <a className="event__host-contact">
                        <img src="/svg/event/tgIcon.svg" alt="tg" />
                        <p>@matelr</p>
                    </a>
                    <a className="event__host-contact">
                        <img src="/svg/event/mailIcon.svg" alt="mail" />
                        <p>utenkov2003@mail.ru</p>
                    </a>
                </section>
            </main>
        </>
    );
}
