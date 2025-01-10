import React from 'react';
import * as XLSX from 'xlsx';
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

export function ExoprtToExel({ members, slot, selectedSlot }: TestProps) {
    const exportToXLSX = () => {
        // Определение заголовка и данных для экспорта
        const headerLabel = slot?.find((time) => time.id === selectedSlot)?.labelValue || 'Список участников';
        const data = members.map((member) => ({
            ФИО: `${member.last_name} ${member.first_name} ${member.patronymic}`,
            Почта: member.email,
            Whatsapp: phoneFormater(member.whatsapp),
            VK: member.vk,
            Telegram: member.telegram,
            Номер_телефона: phoneFormater(member.phone_number),
            ...member.custom_fields.reduce(
                (acc, custom) => {
                    acc[custom.field_title] = custom.field_value;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        }));

        // Создание рабочей книги и листа
        const ws = XLSX.utils.json_to_sheet(data);

        // Добавление заголовка в первую строку
        XLSX.utils.sheet_add_aoa(ws, [[headerLabel]], { origin: 'A1' });
        const headers = [['', '', '', '', '', ...members[0].custom_fields.map((custom) => '')]];

        XLSX.utils.sheet_add_aoa(ws, headers, { origin: 'B1' });

        // Добавление данных начиная с третьей строки
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A2' });

        // Создание рабочей книги и добавление листа
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Участники');

        // Экспорт в файл
        XLSX.writeFile(wb, 'members_list.xlsx');
    };

    return (
        <div>
            <img src="/svg/exel.svg" alt="xls" onClick={exportToXLSX} style={{ cursor: 'pointer' }} />
        </div>
    );
}
