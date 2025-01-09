import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { sendOnEmails } from '../store/api-actions';

type Email = { email: string };

export type InviteByEmails = {
    event_id?: number;
    users_emails?: Email[];
    previousUrl: string;
};

function InviteComponent({ previousUrl }: InviteByEmails) {
    const [emails, setEmails] = useState<Email[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddEmail = () => {
        if (inputValue) {
            setEmails([...emails, { email: inputValue }]);
            setInputValue('');
        }
    };

    const handleDeleteEmail = (index: number) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };

    const extractLastDigits = (url: string): number | null => {
        // Используем регулярное выражение для извлечения цифр
        const match = url.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : null; // Преобразуем в число
    };

    const eventId = extractLastDigits(previousUrl);
    const dispatch = useAppDispatch();
    const handleSendInvitations = () => {
        console.log('Отправка приглашений на:', emails);
        dispatch(sendOnEmails({ event_id: Number(eventId), users_emails: emails }));
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
