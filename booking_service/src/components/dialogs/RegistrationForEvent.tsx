import * as React from 'react';
import { useEffect, useState } from 'react';
import { EventTimeSlots, RegisterForEventOutput } from '../../types/EventData';
import { humanizeDate, TimeComponent } from '../../services/utils/dataFormater';
import DropdownRegister from '../RegistDropDown';
import { useAppDispatch } from '../../hooks';
import { registerForEvent } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';

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
    customFields?: [
        {
            field_id: number;
            title: string;
        },
    ];
}

interface CustomFieldValue {
    title: string;
    value: string;
}

interface CustomField {
    title: string;
}

export default function RegistrationForEvent({
    isOpen,
    onClose,
    timeSlotsDescriptions,
    message,
    isLoading,
    customFields,
}: RegistrationForEventProps) {
    const dispatch = useAppDispatch();
    const urlParams = useParams();
    const [selectedSlot, setSelectedSlot] = useState<number>();
    const [customFieldValues, setCustomFieldValues] = useState<CustomFieldValue[]>([]);

    useEffect(() => {
        if (customFields) {
            const initialValues = customFields.map((field) => ({
                title: field.title,
                value: '',
            }));
            setCustomFieldValues(initialValues);
        } else {
            setCustomFieldValues([]);
        }
    }, [customFields]);

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

    const handleCustomFieldChange = (title: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomFieldValues((prevValues) =>
            prevValues.map((field) => (field.title === title ? { ...field, value: event.target.value } : field)),
        );
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        if (urlParams.id && selectedSlot) {
            await dispatch(
                registerForEvent({
                    event_id: Number(urlParams.id),
                    custom_fields: customFieldValues,
                    event_date_time_id: selectedSlot,
                }),
            );
            onClose();
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

                    {customFieldValues.map((field) => (
                        <div className="dialog__content-input input_white" key={field.title}>
                            <input
                                className="input_white-field input_white-field_pass"
                                type="text"
                                placeholder={field.title}
                                value={field.value}
                                onChange={handleCustomFieldChange(field.title)}
                                required
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="dialog__content-btn btn_black">
                    {isLoading ? <Spinner /> : 'Записаться'}
                </button>
            </form>
        </dialog>
    );
}
