import { MemberInfo, MembersInfo } from '../../types/EventData';
import { humanizeDate, TimeComponent } from '../../services/utils/dataFormater';
import * as React from 'react';
import { useState } from 'react';
import DropdownRegister from '../RegistDropDown';
import { phoneFormater } from '../../services/utils/PhoneFormater';
import CopyButtonWithFeedback from '../CopyTextButton';
import { ExoprtToExel } from '../ExportToExel';
import { ExportToPDF } from '../ExportToPDF';

type ListOfParticipantsProps = {
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
    listOfMembers?: MembersInfo;
    selectSlot?: number | null;
};
const margin = {
    marginTop: '1.0526315789vw',
};

export default function ListOfParticipants({ isOpen, onClose, listOfMembers }: ListOfParticipantsProps) {
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    if (!isOpen) return null;
    const createLabelValue = ({ start_date, start_time, end_date, end_time }: MemberInfo) => {
        return `${humanizeDate(start_date)} ${TimeComponent(start_time)} - ${humanizeDate(end_date)} ${TimeComponent(end_time)}`;
    };

    const Slots = listOfMembers?.map((slot) => ({
        labelValue: createLabelValue(slot),
        id: slot.id,
    }));

    const handleClose = () => {
        setSelectedSlot(null);
        onClose();
    };

    return (
        <dialog className="dialog dialog_members " open>
            <form method="dialog" className="dialog__content">
                <button className="dialog__content-close display_none_print" onClick={handleClose} formNoValidate>
                    <img src="/svg/closeCross.svg" alt="закрыть" />
                </button>

                <h2 className="dialog__content-title display_none_print">Список участников</h2>

                <div className="dialog__content-dropdown dropdown display_none_print">
                    {Slots && (
                        <DropdownRegister
                            placeHolder="Выберите дату и время"
                            type="arrow-down"
                            options={Slots}
                            onChange={(value) => {
                                setSelectedSlot(value);
                            }}
                        />
                    )}
                </div>
                {listOfMembers?.map((list: MemberInfo) => (
                    <>
                        {list.id === selectedSlot && (
                            <>
                                <div className="dialog__content-members">
                                    <p className="display_none_print">
                                        Участники {list.bookings_count}
                                        {list.seats_number !== null && list.seats_number !== 0 ? ` / ${list.seats_number}` : ''}:
                                    </p>
                                    {list.bookings_count !== 0 && (
                                        <>
                                            <div>
                                                <ExportToPDF members={list.members} slot={Slots} selectedSlot={selectedSlot} />
                                            </div>
                                            <div className="display_none_print">
                                                <ExoprtToExel members={list.members} slot={Slots} selectedSlot={selectedSlot} />
                                            </div>
                                        </>
                                    )}
                                </div>
                                {list.bookings_count !== 0 ? (
                                    <>
                                        {list.members.map((member) => (
                                            <div className="dialog__content-member display_none_print">
                                                <div className="dialog__content-member-pic">
                                                    <img
                                                        src={`${member?.photo ? member.photo : '/svg/defaultUser2.svg'}`}
                                                        alt="defaultAvatar"
                                                    />
                                                </div>
                                                <p>{`${member.last_name} ${member.first_name} ${member.patronymic}`}</p>

                                                <div className="dialog__content-member-links">
                                                    {!!member.whatsapp && (
                                                        <CopyButtonWithFeedback
                                                            textToCopy={phoneFormater(member.whatsapp)}
                                                            isIcon
                                                            iconName="whatsappIcon"
                                                        />
                                                    )}
                                                    {!!member.vk && (
                                                        <CopyButtonWithFeedback textToCopy={member.vk} isIcon iconName="vkIcon" />
                                                    )}
                                                    {!!member.telegram && (
                                                        <CopyButtonWithFeedback textToCopy={member.telegram} isIcon iconName="tgIcon" />
                                                    )}
                                                    {!!member.email && (
                                                        <CopyButtonWithFeedback textToCopy={member.email} isIcon iconName="mailIcon" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p style={margin}>Пока никто не зарегистрировался на этот временной слот</p>
                                )}
                            </>
                        )}
                    </>
                ))}
            </form>
        </dialog>
    );
}
