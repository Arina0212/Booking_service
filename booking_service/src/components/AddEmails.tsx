import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { sendOnEmails } from '../store/api-actions';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

type Email = { email: string };

export type InviteByEmails = {
    event_id?: number;
    users_emails?: Email[];
    previousUrl?: string;
};

function InviteComponent({ event_id }: InviteByEmails) {
    const [emails, setEmails] = useState<Email[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const isValidEmail = (email: string) => /^[\w-\\.]+@+[\w-]+\.[a-z]{2,4}$/i.test(email);
    const handleAddEmail = () => {
        if (inputValue && isValidEmail(inputValue)) {
            setEmails([...emails, { email: inputValue }]);
            setInputValue('');
        } else {
            toast.error('Введите корректный адрес электронной почты');
        }
    };

    const handleDeleteEmail = (index: number) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };

    const dispatch = useAppDispatch();
    const handleSendInvitations = () => {
        if (event_id) {
            dispatch(sendOnEmails({ event_id: event_id, users_emails: emails }));
        }
    };

    return (
        <>
            <div className="invite__item-input input_white">
                <input
                    className="input_white-field"
                    type="email"
                    placeholder="Почта"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <button className="invite__item-add" onClick={handleAddEmail}>
                Добавить
            </button>

            {emails.map((email, index) => (
                <>
                    <p className="invite__item-mail" key={index}>
                        {email.email}
                    </p>
                    <button className="invite__item-delete" onClick={() => handleDeleteEmail(index)}>
                        Удалить
                    </button>
                </>
            ))}

            <button className="invite__item-send btn_black" onClick={handleSendInvitations}>
                Отправить приглашение
            </button>
        </>
    );
}

export default InviteComponent;
