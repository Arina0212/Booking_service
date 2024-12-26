import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import { cancelEvent } from '../../store/api-actions';
import Spinner from '../Spinner';

type CancelEventProps = {
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
};
export default function CancelEvent({ isOpen, onClose, isLoading }: CancelEventProps) {
    const dispatch = useAppDispatch();
    const urlParams = useParams();
    if (!isOpen) return null;
    const handleCancelEvent = async (event: React.FormEvent) => {
        event.preventDefault();
        if (urlParams.id) {
            await dispatch(
                cancelEvent({
                    id: Number(urlParams.id),
                }),
            );
            onClose();
        }
    };
    return (
        <dialog className="dialog dialog_end" open>
            <form method="dialog" className="dialog__content" onSubmit={handleCancelEvent}>
                <button className="dialog__content-close" formNoValidate onClick={onClose}>
                    <img src="/svg/closeCross.svg" alt="закрыть" />
                </button>

                <h2 className="dialog__content-title dialog__content-title_red dialog__content-title_no-margin">Завершение мероприятия</h2>

                <button formMethod="dialog" type="submit" className="dialog__content-btn btn_black">
                    {isLoading ? <Spinner /> : 'Подтвердить'}
                </button>
            </form>
        </dialog>
    );
}
