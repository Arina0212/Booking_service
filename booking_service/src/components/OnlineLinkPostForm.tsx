import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { postOnlineLink } from '../store/api-actions';
import { useAppDispatch } from '../hooks';

interface EventOnlineInviteProps {
    event_id: number;
    onlineLink?: string;
}

export default function EventOnlineInvite({ event_id, onlineLink }: EventOnlineInviteProps) {
    const [link, setLink] = useState<string | undefined>(onlineLink);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLink(event.target.value);
    };
    const dispatch = useAppDispatch();
    const handleSave = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        if (!!link) {
            dispatch(postOnlineLink({ online_link: link, event_id: event_id }));
        }
    };

    return (
        <div className="event__desc-invite">
            <div className="event__desc-invite-input input_white">
                <input className="input_white-field" type="text" placeholder="Вставьте ссылку" value={link} onChange={handleInputChange} />
            </div>
            <button className="event__desc-invite-btn btn_black" onClick={handleSave}>
                Сохранить
            </button>
        </div>
    );
}
