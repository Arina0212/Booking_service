import Header from '../components/Header';
import SignOutButton from '../components/SignOutButton';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getLoadingProfile, getProfile } from '../store/user-process/selectors';
import { ChangeEvent, FormEvent, useState } from 'react';
import { phoneFormater } from '../services/utils/PhoneFormater';
import { dataFormater, getAltDate, humanizeDate } from '../services/utils/dataFormater';
import { postProfileDataAction } from '../store/api-actions';
import Loading from '../components/Loading';

export default function ProfilePage() {
    const profileData = useAppSelector(getProfile);
    const [isEditing, setIsEditing] = useState(false);
    const isProfileLoading = useAppSelector(getLoadingProfile);
    let FIO: string = '';
    if (profileData) {
        if (profileData?.last_name || profileData.first_name || profileData.patronymic) {
            FIO = [profileData?.last_name, profileData?.first_name, profileData?.patronymic].join(' ');
        }
    }
    const [me, setMe] = useState({
        fio: FIO,
        email: profileData?.email,
        birth_date: humanizeDate(profileData?.birth_date),
        city: profileData?.city,
        phone_number: phoneFormater(profileData?.phone_number),
        company_name: profileData?.company_name,
        vk: profileData?.vk,
        telegram: profileData?.telegram,
        whatsapp: phoneFormater(profileData?.whatsapp),
    });

    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMe((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setIsEditing(true);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const FIO_sep = me.fio.split(' ', 3);
        let first_name: string = FIO_sep[1];
        let last_name: string = FIO_sep[0];
        let patronymic: string = FIO_sep[2];
        dispatch(
            postProfileDataAction({
                first_name: first_name,
                last_name: last_name,
                patronymic: patronymic,
                email: me.email,
                birth_date: getAltDate(me.birth_date),
                city: me.city,
                phone_number: me.phone_number.replace(/[^\d]/g, ''),
                company_name: me.company_name,
                vk: me.vk,
                telegram: me.telegram,
                whatsapp: me.whatsapp.replace(/[^\d]/g, ''),
            }),
        );
        setIsEditing(false);
    };
    return (
        <>
            {!isProfileLoading ? (
                <>
                    <Header />
                    <main className="profile">
                        <div className="profile__head">
                            <h1>Личная информация</h1>
                            <SignOutButton />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="profile__info">
                                <div className="profile__info-pic">
                                    <img src="/img/testHost.png" width={'25.1578947368vw'} height={'25.1578947368vw'} alt="avatar" />
                                </div>

                                <div className="profile__info-block profile__info-block_span3">
                                    <p className="profile__info-block-text">ФИО</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            name="fio"
                                            type="text"
                                            value={me?.fio}
                                            onChange={handleChange}
                                            placeholder="Фамилия Имя Отчество"
                                        />
                                    </div>
                                </div>

                                <div className="profile__info-block profile__info-block_span2">
                                    <p className="profile__info-block-text">Город проживания</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="text"
                                            name="city"
                                            value={me?.city}
                                            onChange={handleChange}
                                            placeholder={'Город'}
                                        />
                                    </div>
                                </div>
                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">Дата рождения</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field input_white-field_date"
                                            type="text"
                                            name="birth_date"
                                            value={dataFormater(me.birth_date)}
                                            onChange={handleChange}
                                            placeholder="дд.мм.гггг"
                                        />
                                        <img src="/svg/calendar.svg" alt="" className="input_white-calendar" />
                                    </div>
                                </div>

                                <div className="profile__info-block profile__info-block_span3">
                                    <p className="profile__info-block-text">Компания</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="text"
                                            name="company_name"
                                            value={me?.company_name}
                                            onChange={handleChange}
                                            placeholder="Название компании"
                                        />
                                    </div>
                                </div>

                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">Пароль</p>
                                    <button className="btn_black" type="button">
                                        Изменить пароль учётной записи
                                    </button>
                                </div>
                            </div>

                            <div className="profile__head profile__info_contact_head">
                                <h1>Контакты</h1>
                            </div>

                            <div className="profile__info profile__info_contact">
                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">Телефон</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="tel"
                                            name="phone_number"
                                            maxLength={18}
                                            value={phoneFormater(me?.phone_number)}
                                            onChange={handleChange}
                                            placeholder="+7 (999) 999 99-99"
                                        />
                                    </div>
                                </div>

                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">Почта</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="email"
                                            name="email"
                                            value={me?.email}
                                            onChange={handleChange}
                                            placeholder="email@mail.ru"
                                        />
                                    </div>
                                </div>
                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">Telegram</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="text"
                                            name="telegram"
                                            value={me?.telegram}
                                            onChange={handleChange}
                                            placeholder="@username"
                                        />
                                    </div>
                                </div>

                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">What’s App</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="tel"
                                            name="whatsapp"
                                            maxLength={18}
                                            value={phoneFormater(me?.whatsapp)}
                                            onChange={handleChange}
                                            placeholder="+7 (999) 999 99-99"
                                        />
                                    </div>
                                </div>

                                <div className="profile__info-block">
                                    <p className="profile__info-block-text">VK</p>
                                    <div className="profile__info-block-input input_white">
                                        <input
                                            className="input_white-field"
                                            type="text"
                                            name="vk"
                                            value={me?.vk}
                                            onChange={handleChange}
                                            placeholder="@username"
                                        />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="profile__save">
                                    <p>Введёные Вами данные могут быть потеряны, пожалуйста, выполните сохранение</p>
                                    <button className="profile__save-btn btn_black" type="submit">
                                        Сохранить изменения
                                    </button>
                                </div>
                            )}
                        </form>
                    </main>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
