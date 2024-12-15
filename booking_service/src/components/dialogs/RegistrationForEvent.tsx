import * as React from 'react';
import { useState } from 'react';
import { EventTimeSlots, RegisterForEventOutput } from '../../types/EventData';
import { humanizeDate, TimeComponent } from '../../services/utils/dataFormater';
import DropdownRegister from '../RegistDropDown';
import { useAppDispatch } from '../../hooks';
import { registerForEvent } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

interface RegistrationForEventProps {
    isOpen: boolean;
    onClose: () => void;
    timeSlotsDescriptions?: [
        {
            id: number;
            start_date: string;
            end_date: string;
            start_time: string;
            end_time: string;
            seats_number: number | null;
            bookings_count: number;
        },
    ];
    isLoading?: boolean;
    message?: RegisterForEventOutput;
}

export default function RegistrationForEvent({ isOpen, onClose, timeSlotsDescriptions, message, isLoading }: RegistrationForEventProps) {
    const dispatch = useAppDispatch();
    const urlParams = useParams();
    const [selectedSlot, setSelectedSlot] = useState<number>();
    if (!isOpen) return null;

    const createLabelValue = ({ start_date, start_time, end_date, end_time }: EventTimeSlots) => {
        return `${humanizeDate(start_date)} ${TimeComponent(start_time)} - ${humanizeDate(end_date)} ${TimeComponent(end_time)}`;
    };

    const Slots = timeSlotsDescriptions?.map((slot) => ({
        labelValue: createLabelValue(slot),
        id: slot.id,
    }));
    const handleRegist = (value: number) => {
        setSelectedSlot(value);
    };
    const handleRegister = async () => {
        if (urlParams.id && selectedSlot) {
            const data = await dispatch(
                registerForEvent({
                    event_id: Number(urlParams.id),
                    custom_fields: null,
                    event_date_time_id: selectedSlot,
                }),
            );
            console.log('Registration:', data);
            if (data.type === 'patient/registerForEventData/fulfilled') {
                toast.success('Успешная запись на мероприятие');
            } else {
                toast.error('Что-то пошло не так попробуйте позже');
                toast.warn('Возможно закончились места на выбранный слот или вы записывались ранее');
            }
        }
    };

    return (
        <dialog className="dialog dialog_request" open>
            <form method="dialog" className="dialog__content" onSubmit={handleRegister}>
                <button className="dialog__content-close" formNoValidate onClick={onClose}>
                    <img src="/svg/closeCross.svg" alt="закрыть" />
                </button>

                <h2 className="dialog__content-title">Подача заявки</h2>

                <div className="dialog__content-gap dialog__content-gap_30">
                    <div className="dialog__content-dropdown dropdown">
                        {Slots && (
                            <DropdownRegister
                                placeHolder="Выберите дату и время"
                                type="arrow-down"
                                options={Slots}
                                onChange={(value) => {
                                    handleRegist(value);
                                }}
                            />
                        )}
                    </div>
                    {/*<div className="dialog__content-input input_white">
                        <input className="input_white-field input_white-field_pass" type="text" placeholder="Название доп поля" />
                    </div>*/}
                </div>
                <button type="submit" className="dialog__content-btn btn_black">
                    Записаться
                </button>
            </form>
        </dialog>
    );
}
