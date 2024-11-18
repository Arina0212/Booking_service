import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../const';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { fetchEventData } from '../store/api-actions';
import { getEvent, getLoadingEvent } from '../store/events-process/selectors';
import Loading from '../components/Loading';
import CopyButtonWithFeedback from '../components/CopyTextButton';
import { phoneFormater } from '../services/utils/PhoneFormater';

export default function EventPage() {
    const dispatch = useAppDispatch();
    const urlParams = useParams();

    useEffect(() => {
        dispatch(fetchEventData({ id: Number(urlParams.id) }));
    }, [dispatch, urlParams.id]);

    const event = useAppSelector(getEvent);
    const isLoading = useAppSelector(getLoadingEvent);

    return (
        <>
            {!isLoading ? (
                <>
                    <Header />
                    <main className="event">
                        <section className="event__card">
                            <div className="event__card-pic">
                                <img src="/svg/event/defaultBanner.svg" alt="event" />
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

                            <h1 className="event__card-title">{event?.name}</h1>

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
                                <img src="/svg/defaultUser1.svg" alt="host" />
                            </div>

                            <span className="event__host-subhead">Компания:</span>
                            <p className="event__host-text">ООО “ЕРАЛАШОВСКИЕ”</p>

                            <span className="event__host-subhead">ФИО:</span>
                            <p className="event__host-text">Сергеев Сергей Савельевич</p>

                            <span className="event__host-subhead">Контакты:</span>
                            <div className="event__host-contact">
                                <img src="/svg/event/whatsappIcon.svg" alt="whatsapp" />
                                <CopyButtonWithFeedback textToCopy={phoneFormater('+79022721339')} />
                            </div>
                            <div className="event__host-contact">
                                <img src="/svg/event/vkIcon.svg" alt="vk" />
                                <CopyButtonWithFeedback textToCopy="@ruslikut" />
                            </div>
                            <div className="event__host-contact">
                                <img src="/svg/event/tgIcon.svg" alt="tg" />
                                <CopyButtonWithFeedback textToCopy="@matelr" />
                            </div>
                            <div className="event__host-contact">
                                <img src="/svg/event/mailIcon.svg" alt="mail" />
                                <CopyButtonWithFeedback textToCopy="utenkov2003@mail.ru" />
                            </div>
                        </section>
                    </main>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
