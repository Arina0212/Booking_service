import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import Spinner from '../Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProfile } from '../../store/user-process/selectors';
import { phoneFormater } from '../../services/utils/PhoneFormater';
import { postProfileDataAction } from '../../store/api-actions';
import { getAltDate } from '../../services/utils/dataFormater';

type ListOfParticipantsProps = {
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean | undefined;
    setIsDialogOpen: (value: boolean) => void;
};

export default function LateRegistration({ isOpen, onClose, isLoading = false, setIsDialogOpen }: ListOfParticipantsProps) {
    let FIO: string = '';
    const profileData = useAppSelector(getProfile);

    if (profileData) {
        if (profileData?.last_name || profileData.first_name || profileData.patronymic) {
            FIO = [profileData?.last_name, profileData?.first_name, profileData?.patronymic].join(' ');
        }
    }
    const [me, setMe] = useState({
        fio: FIO,
        email: profileData?.email,
        birth_date: profileData?.birth_date,
        city: profileData?.city,
        phone_number: phoneFormater(profileData?.phone_number),
        company_name: profileData?.company_name,
        vk: profileData?.vk,
        telegram: profileData?.telegram,
        whatsapp: phoneFormater(profileData?.whatsapp),
    });
    const dispatch = useAppDispatch();
    if (!isOpen) return null;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMe((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const FIO_sep = me.fio.split(' ', 3);
        let first_name: string = FIO_sep[1];
        let last_name: string = FIO_sep[0];
        let patronymic: string = FIO_sep[2];

        try {
            await dispatch(
                postProfileDataAction({
                    first_name: first_name,
                    last_name: last_name,
                    patronymic: patronymic,
                    email: me.email,
                    birth_date: !!me.birth_date ? getAltDate(me.birth_date) : me.birth_date,
                    city: me.city,
                    phone_number: me.phone_number.replace(/[^\d]/g, ''),
                    company_name: me.company_name,
                    vk: me.vk,
                    telegram: me.telegram,
                    whatsapp: me.whatsapp.replace(/[^\d]/g, ''),
                }),
            );

            setIsDialogOpen(true);
            onClose();
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <dialog className="dialog dialog_members" open>
                <form method="dialog" className="dialog__content" onSubmit={handleSubmit}>
                    <button className="dialog__content-close display_none_print" onClick={handleClose} formNoValidate>
                        <img src="/svg/closeCross.svg" alt="закрыть" />
                    </button>

                    <h2 className="dialog__content-title-late display_none_print">Давайте знакомиться</h2>

                    <div className="display_none_print">
                        {!profileData?.first_name && !profileData?.last_name && !profileData?.patronymic && (
                            <>
                                <p className="dialog__content-sub_title">ФИО</p>
                                <div className="dialog__content-input input_white">
                                    <input
                                        className="input_white-field input_white-field_pass"
                                        type="text"
                                        placeholder="Например, Гром Пётр Петрович"
                                        required
                                        value={me?.fio}
                                        name="fio"
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                        {!me?.telegram && (
                            <>
                                <p className="dialog__content-sub_title">Telegram</p>
                                <div className="dialog__content-input input_white">
                                    <input
                                        className="input_white-field input_white-field_pass"
                                        type="text"
                                        placeholder="Например, @test"
                                        required
                                        name="telegram"
                                        value={me.telegram}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <button type="submit" className="dialog__content-btn btn_black">
                        {isLoading ? <Spinner /> : 'Подтвердить'}
                    </button>
                </form>
            </dialog>
        </>
    );
}
