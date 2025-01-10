import React from 'react';
import { Member } from '../types/EventData';
import { phoneFormater } from '../services/utils/PhoneFormater';

type slots = {
    labelValue: string;
    id: number;
};
type TestProps = {
    members: Member[];
    slot?: slots[];
    selectedSlot?: number;
};

export function ExportToPDF({ members, slot, selectedSlot }: TestProps) {
    const printContent = () => {
        window.print();
    };

    return (
        <div>
            <img className="display_none_print" onClick={printContent} src="/svg/pdf.svg" alt="pdf" />

            <table className="display_none graphs__analysis-table">
                {slot?.map((time) => <>{time.id === selectedSlot && <caption>{time.labelValue}</caption>}</>)}
                <tbody>
                    <tr className="header_table">
                        <th>ФИО</th>
                        <th>Почта</th>
                        <th>Whatsapp</th>
                        <th>VK</th>
                        <th>Telegram</th>
                        <th>Номер телефона</th>
                        {members[0].custom_fields.map((custom) => (
                            <th>{custom.field_title}</th>
                        ))}
                    </tr>
                    {members.map((member) => (
                        <tr>
                            <td>{`${member.last_name} ${member.first_name} ${member.patronymic}`}</td>
                            <td>{member.email}</td>
                            <td>{member.whatsapp === '' || !member.whatsapp ? '-' : phoneFormater(member.whatsapp)}</td>
                            <td>{member.vk === '' || !member.vk ? '-' : member.vk}</td>
                            <td>{member.telegram === '' || !member.telegram ? '-' : member.telegram}</td>
                            <td>{member.phone_number === '' || !member.phone_number ? '-' : phoneFormater(member.phone_number)}</td>
                            {member.custom_fields.map((custom) => (
                                <td>{custom.field_value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
