import React, { useRef, useState } from 'react';
import useAutosizeTextArea from '../hooks/useAutoSize';
import { FORMATS } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postEventDataAction } from '../store/api-actions';
import { getLoadingOutputMessage } from '../store/events-process/selectors';
import Spinner from './Spinner';

interface Block {
    id: number;
    title: JSX.Element;
    content: JSX.Element;
}

interface DateTime {
    start: string;
    end: string;
}

const CreateEventForm: React.FC = () => {
    const [data, setData] = useState({
        name: '',
        description: '',
        eventLocation: '',
        city: '',
        address: '',
        paymentType: '',
        payCount: '',
    });
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, data.name);
    useAutosizeTextArea(textAreaRef.current, data.description);

    const handleChangeName = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;

        setData((prevState) => ({ ...prevState, name: val }));
    };
    const handleChangeDesc = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;

        setData((prevState) => ({ ...prevState, description: val }));
    };

    const [fileInfo, setFileInfo] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileSizeMB = file.size / (1024 * 1024);
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            // Проверка формата файла
            if (!['jpg', 'jpeg', 'png', 'bmp'].includes(fileExtension || '')) {
                setError('Недопустимый формат файла. Поддерживаемые форматы: .jpg, .png и .bmp.');
                setFileInfo(null);
                return;
            }

            // Проверка размера файла
            if (fileSizeMB > 2) {
                setError('Размер файла не должен превышать 2MB.');
                setFileInfo(null);
                return;
            }
            setError('');
            setFileInfo(file);
        }
    };
    const [fileInfoDesc, setFileInfoDesc] = useState<File | null>(null);

    const handleFileDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Получаем загруженный файл
        if (file) {
            setFileInfoDesc(file); // Сохраняем имя и размер файла
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({ ...prevState, eventLocation: event.target.value }));
    };
    const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target?.value;

        setData((prevState) => ({ ...prevState, city: val }));
    };
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target?.value;

        setData((prevState) => ({ ...prevState, address: val }));
    };

    const [dateTimes, setDateTimes] = useState<DateTime[]>([]);
    const [isLimitEnabled, setIsLimitEnabled] = useState<boolean[]>([]);
    const [participantCounts, setParticipantCounts] = useState<number[]>([]);

    const handleAddDateTime = () => {
        setDateTimes((prev) => [...prev, { start: '', end: '' }]); // Добавляем новый объект с пустыми датами
        setIsLimitEnabled((prev) => [...prev, false]); // По умолчанию ограничение выключено
    };

    const handleRemoveDateTime = (index: number) => {
        setDateTimes((prev) => prev.filter((_, i) => i !== index));
        setIsLimitEnabled((prev) => prev.filter((_, i) => i !== index));
        setParticipantCounts((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChangeDateTime = (index: number, key: 'start' | 'end', value: string) => {
        setDateTimes((prev) => {
            const newDateTimes = [...prev];
            newDateTimes[index][key] = value;
            return newDateTimes;
        });
    };

    const handleParticipantCountChange = (index: number, value: number) => {
        setParticipantCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = value;
            return newCounts;
        });
    };

    const handleLimitChange = (index: number, value: boolean) => {
        setIsLimitEnabled((prev) => {
            const newLimits = [...prev];
            newLimits[index] = value;
            return newLimits;
        });
    };
    const handleInputClick = (index: number) => {
        // Установка фокуса на input при клике на поле
        const input = document.getElementById(`dateTimeInput${index}`) as HTMLInputElement;
        if (input) {
            input.focus();
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

    const handleSelectFormat = (format: string) => {
        setSelectedFormat(format);
        setIsDropdownOpen(false);
    };

    const [accessLevel, setAccessLevel] = useState('');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccessLevel(event.target.value);
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({ ...prevState, paymentType: event.target.value }));
    };
    const handlePaymentCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({ ...prevState, payCount: event.target.value }));
    };

    const [customFields, setCustomFields] = useState<{ title: string }[]>([]); // Используем массив объектов
    console.log(customFields);
    const handleFieldChange = (index: number, value: string) => {
        const newFields = [...customFields];
        newFields[index] = { title: value }; // Заполняем поле в объекте
        setCustomFields(newFields);
    };

    const addField = () => {
        setCustomFields([...customFields, { title: '' }]); // Добавляем новый объект с пустым названием
    };

    const removeField = (index: number) => {
        const newFields = customFields.filter((_, i) => i !== index);
        setCustomFields(newFields); // Удаляем поле по индексу
    };

    // Состояние для управления открытыми блоками
    const [openBlockId, setOpenBlockId] = useState<number>(1);

    const dispatch = useAppDispatch();
    //const message = useAppSelector(geOutputMessage);
    const isLoadingMessage = useAppSelector(getLoadingOutputMessage);
    const handleNextBlock = () => {
        setOpenBlockId((prevId) => prevId + 1);
    };
    // Массив блоков с их содержимым
    const blocks: Block[] = [
        {
            id: 1,
            title: (
                <div className={`create__item-head ${openBlockId === 1 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Название мероприятия<span>*</span>
                    </h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 1 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">
                            Название мероприятия<span>*</span>
                        </h3>
                        <p className="create__item-content-text">
                            Назовите ваше событие ярко и кратко, чтобы заинтересовать пользователей
                            <br />
                            Максимум 120 символов
                        </p>
                        <textarea
                            className="create__item-content-input textarea input_white_gray"
                            placeholder="Введите название"
                            maxLength={120}
                            onChange={handleChangeName}
                            ref={textAreaRef}
                            rows={1}
                            value={data.name}
                            required
                        ></textarea>
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: (
                <div className={`create__item-head ${openBlockId === 2 ? 'create__item-head_active' : ''}`}>
                    <h1>Баннер</h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 2 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">Баннер</h3>
                        <p className="create__item-content-text">
                            Для привлечения внимания пользователей предлагаем загрузить баннер мероприятия
                            <br />
                            Формат: .jpg, .png и .bmp, размер от 400 пикселей в ширину и высоту, вес до 2 MB
                        </p>
                        <div className="create__item-content-file">
                            <input
                                type="file"
                                name="banner"
                                id="input__file-upload"
                                style={{
                                    display: 'none',
                                    opacity: 0,
                                    visibility: 'hidden',
                                }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="input__file-upload" className="create__item-content-file-upload">
                                Выбрать файл
                            </label>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {fileInfo && (
                                <>
                                    <p>
                                        {fileInfo.name} <span>{(fileInfo.size / 1024).toFixed(2)} Мб</span>
                                    </p>
                                    <button
                                        className="create__item-content-file-delete"
                                        onClick={() => {
                                            setFileInfo(null);
                                            setError(null);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </>
                            )}
                        </div>
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: (
                <div className={`create__item-head ${openBlockId === 3 ? 'create__item-head_active' : ''}`}>
                    <h1>Описание</h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 3 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">Описание</h3>
                        <p className="create__item-content-text">
                            Расскажите подробнее о мероприятии
                            <br />
                            Рекомендуем 3-4 предложения, чтобы познакомить пользователей с предстоящим событием
                        </p>
                        <textarea
                            className="create__item-content-input textarea input_white_gray"
                            value={data.description}
                            ref={textAreaRef}
                            onChange={handleChangeDesc}
                            placeholder="Введите описание"
                        ></textarea>
                        <p className="create__item-content-text">Загрузите программу мероприятия</p>
                        <div className="create__item-content-file">
                            <input
                                type="file"
                                name="descripion"
                                id="input__file-upload"
                                style={{ opacity: 0, visibility: 'hidden', display: 'none' }}
                                onChange={handleFileDescChange}
                            />
                            <label htmlFor="input__file-upload" className="create__item-content-file-upload">
                                Выбрать файл
                            </label>
                            {fileInfoDesc && (
                                <>
                                    <p>
                                        {fileInfoDesc.name} <span>{(fileInfoDesc.size / 1024).toFixed(2)} Мб</span>
                                    </p>
                                    <button
                                        className="create__item-content-file-delete"
                                        onClick={() => {
                                            setFileInfo(null);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </>
                            )}
                        </div>
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            title: (
                <div className={`create__item-head ${openBlockId === 4 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Адрес<span>*</span>
                    </h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 4 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">
                            Адрес<span>*</span>
                        </h3>
                        <p className="create__item-content-text">
                            Расскажите, где будет проходить ваше мероприятие
                            <br />
                            Рекомендуем указывать адрес подробно, чтобы участники смогли вас найти
                        </p>
                        <div className="create__item-content-radios">
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createAddressOnline"
                                name="createAddress"
                                value="online"
                                checked={data.eventLocation === 'online'} // Установка состояния для радиокнопки
                                onChange={handleLocationChange}
                                required
                            />

                            <label htmlFor="createAddressOnline" className="create__item-content-radios-btn">
                                <span></span>
                                Онлайн
                            </label>
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createAddressOffline"
                                name="createAddress"
                                value="offline"
                                checked={data.eventLocation === 'offline'} // Установка состояния для радиокнопки
                                onChange={handleLocationChange}
                                required
                            />
                            <label htmlFor="createAddressOffline" className="create__item-content-radios-btn">
                                <span></span>
                                Очно
                            </label>
                        </div>
                        {data.eventLocation === 'offline' && (
                            <div id="createAddressOfflineInfo" className="create__item-content-hidden_show">
                                <div className="create__item-content-wrap">
                                    <div className="create__item-content-inputs">
                                        <div className="input_white input_white_gray">
                                            <input
                                                className="input_white-field"
                                                name="city"
                                                type="text"
                                                placeholder="Введите город"
                                                value={data.city}
                                                onChange={handleChangeCity}
                                            />
                                        </div>
                                        <div className="input_white input_white_gray">
                                            <input
                                                className="input_white-field"
                                                name="address"
                                                type="text"
                                                placeholder="Введите улицу, дом"
                                                value={data.address}
                                                onChange={handleChangeAddress}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 5,
            title: (
                <div className={`create__item-head ${openBlockId === 5 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Формат<span>*</span>
                    </h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 5 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">
                            Формат<span>*</span>
                        </h3>
                        <p className="create__item-content-text">Укажите один из форматов вашего мероприятия</p>
                        <div className="create__item-content-dropdown dropdown dropdown_gray">
                            <div className="create__item-content-dropdown-select dropdown-select" onClick={toggleDropdown}>
                                <div className="dropdown-select-selected">
                                    <span style={{ color: selectedFormat ? 'black' : 'gray' }}>{selectedFormat || 'Выберите формат'}</span>
                                </div>
                                <div className="dropdown-select-caret">
                                    <img src="/svg/caret.svg" alt="caret" />
                                </div>
                            </div>

                            {isDropdownOpen && (
                                <div className="create__item-content-dropdown-menu dropdown-menu">
                                    <div className="dropdown-menu-wrapper">
                                        {FORMATS.map(({ labelValue }) => (
                                            <div
                                                key={labelValue}
                                                onClick={() => handleSelectFormat(labelValue)}
                                                className="dropdown-menu-item "
                                            >
                                                <p className="dropdown-menu-item-text">{labelValue}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                        Далее
                    </button>
                </div>
            ),
        },
        {
            id: 6,
            title: (
                <div className={`create__item-head ${openBlockId === 6 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Дата и время<span>*</span>
                    </h1>
                    {/* <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 6 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">
                            Дата и время<span>*</span>
                        </h3>
                        <p className="create__item-content-text">
                            Укажите даты и время начала и окончания вашего мероприятия
                            <br />
                            Если оно состоит из нескольких частей, то можно указать несколько временных отрезков
                        </p>

                        {dateTimes.map((dateTime, index) => (
                            <div key={index} id="createDates" className="create__item-content-dates">
                                <div className="create__item-content-dates_title">
                                    <p>{index + 1} часть мероприятия</p>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDateTime(index)}
                                        className={`create__item-content-dates-remove ${index === 0 ? 'visually-hidden' : ''}`}
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <p className="create__item-content-dates_text">Начало:</p>
                                <div
                                    className="create__item-content-dates-date input_white input_white_gray"
                                    onClick={() => handleInputClick(index)}
                                >
                                    <input
                                        id={`dateTimeInputStart${index}`}
                                        className="input_white-field input_white-field_date"
                                        type="datetime-local"
                                        value={dateTime.start}
                                        onChange={(e) => handleChangeDateTime(index, 'start', e.target.value)}
                                    />
                                </div>
                                <p className="create__item-content-dates_text">Конец:</p>
                                <div
                                    className="create__item-content-dates-date input_white input_white_gray"
                                    onClick={() => handleInputClick(index)}
                                >
                                    <input
                                        id={`dateTimeInputEnd${index}`}
                                        className="input_white-field input_white-field_date"
                                        type="datetime-local"
                                        value={dateTime.end}
                                        onChange={(e) => handleChangeDateTime(index, 'end', e.target.value)}
                                    />
                                </div>

                                <div className="create__item-content-restriction">
                                    <label className="create__item-content-restriction_check">
                                        <input
                                            id={`inviteCheckbox${index}`}
                                            type="checkbox"
                                            className="visually-hidden"
                                            checked={isLimitEnabled[index]}
                                            onChange={(e) => handleLimitChange(index, e.target.checked)}
                                        />
                                        <label htmlFor={`inviteCheckbox${index}`} className="invite__item-team-head-checkbox">
                                            <img src="/svg/event/checkbox.svg" alt="✓" />
                                        </label>
                                        Ограничить количество участников
                                    </label>

                                    {isLimitEnabled[index] && (
                                        <div className="create__item-content-participant-limit input_white input_white_gray">
                                            <input
                                                type="number"
                                                className="input_white-field"
                                                placeholder="Количество"
                                                value={participantCounts[index] || ''}
                                                onChange={(e) => handleParticipantCountChange(index, Number(e.target.value))}
                                                min="1"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button type="button" onClick={handleAddDateTime} className="create__item-content-add">
                            Добавить дату и время
                        </button>
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 7,
            title: (
                <div className={`create__item-head ${openBlockId === 7 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Стоимость входа<span>*</span>
                    </h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 7 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">
                            Стоимость входа<span>*</span>
                        </h3>
                        <p className="create__item-content-text">
                            Если у вас платное мероприятие, то укажите стоимость входа для посетителей
                        </p>
                        <div className="create__item-content-radios">
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createJoinFree"
                                name="createJoin"
                                value="free"
                                checked={data.paymentType === 'free'}
                                onChange={handlePaymentChange}
                                required
                            />
                            <label htmlFor="createJoinFree" className="create__item-content-radios-btn">
                                <span></span>
                                Бесплатно
                            </label>
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createJoinPay"
                                name="createJoin"
                                value="pay"
                                checked={data.paymentType === 'pay'}
                                onChange={handlePaymentChange}
                                required
                            />
                            <label htmlFor="createJoinPay" className="create__item-content-radios-btn">
                                <span></span>
                                Платно
                            </label>
                        </div>
                        {data.paymentType === 'pay' && (
                            <div id="createJoinPayInfo" className="create__item-content-hidden_show">
                                <div className="create__item-content-wrap">
                                    <div className="create__item-content-input_short input_white input_white_gray">
                                        <input
                                            className="input_white-field"
                                            name="visitCoast"
                                            type="text"
                                            placeholder="Введите стоимость"
                                            value={data.payCount}
                                            onChange={handlePaymentCountChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 8,
            title: (
                <div className={`create__item-head ${openBlockId === 8 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Доступ к мероприятию<span>*</span>
                    </h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 8 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <h3 className="create__item-content-head">
                            Доступ к мероприятию<span>*</span>
                        </h3>
                        <p className="create__item-content-text">
                            Выберите уровень доступа к мероприятию
                            <br />
                            Если вы хотите его организовать только для определённого круга лиц, то укажите “Закрытое мероприятие”.
                            <br />В ином случае - “Открыто для всех”
                        </p>
                        <div className="create__item-content-radios">
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createAccessOpen"
                                name="createAccess"
                                value="open"
                                checked={accessLevel === 'open'}
                                onChange={handleRadioChange}
                                required
                            />
                            <label htmlFor="createAccessOpen" className="create__item-content-radios-btn">
                                <span></span>
                                Открыто для всех
                            </label>
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createAccessClosed"
                                name="createAccess"
                                value="close"
                                checked={accessLevel === 'close'}
                                onChange={handleRadioChange}
                                required
                            />
                            <label htmlFor="createAccessClosed" className="create__item-content-radios-btn">
                                <span></span>
                                Закрытое мероприятие
                            </label>
                        </div>
                        <button className="create__item-content-btn btn_black" onClick={handleNextBlock}>
                            Далее
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 9,
            title: (
                <div className={`create__item-head ${openBlockId === 9 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Дополнительные поля<span></span>
                    </h1>
                    {/*<div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>*/}
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 9 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <p className="create__item-content-text">Добавьте свои поля для сбора дополнительной информации от участников</p>
                        {customFields.map((field, index) => (
                            <div className="create__item-custom" key={index}>
                                <div className="create__item-content-input_short input_white input_white_gray">
                                    <input
                                        className="input_white-field"
                                        name={`customFields_${index}`}
                                        type="text"
                                        placeholder="Введите название поля"
                                        value={field.title}
                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                    />
                                </div>
                                <button type="button" className="create__item-content-dates-remove" onClick={() => removeField(index)}>
                                    Удалить
                                </button>
                            </div>
                        ))}
                        <button type="button" className="create__item-content-add" onClick={addField}>
                            Добавить дополнительное поле
                        </button>
                        <button type="submit" className="create__item-content-btn btn_black">
                            {isLoadingMessage ? <Spinner /> : 'Создать мероприятие'}
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    // Функция для переключения открытого блока
    const toggleBlock = (id: number) => {
        setOpenBlockId(openBlockId === id ? 0 : id);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const formData = new FormData();

        // Добавьте данные из состояния data
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // Добавьте файлы в formData
        if (fileInfo) {
            formData.append('fileInfo', fileInfo); // Добавьте файл, если он существует
        }

        if (fileInfoDesc) {
            formData.append('fileInfoDesc', fileInfoDesc); // Добавьте файл описания, если он существует
        }
        if (selectedFormat) {
            formData.append('format', selectedFormat);
        }
        const event_dates_times = dateTimes.map((dateTime, index) => {
            const startDate = new Date(dateTime.start);
            const endDate = new Date(dateTime.end);

            // Получаем дату в формате YYYY-MM-DD
            const start_date = startDate.toISOString().split('T')[0];
            const end_date = endDate.toISOString().split('T')[0];
            // Получаем время в формате HH:MM
            const start_time = startDate.toTimeString().split(' ')[0].slice(0, 5);
            const end_time = endDate.toTimeString().split(' ')[0].slice(0, 5);

            return {
                start_date: start_date,
                end_date: end_date,
                start_time: start_time,
                end_time: end_time,
                seats_number: participantCounts[index],
            };
        });

        const eventFullData = {
            event_dates_times,
            custom_fields: customFields,
            visit_cost: Number(data.payCount),
            city: data.city,
            name: data.name,
            status: accessLevel,
            address: data.address,
            format: selectedFormat ? selectedFormat : '',
            description: data.description,
        };
        dispatch(postEventDataAction({ event: eventFullData, photo: fileInfo, schedule: fileInfoDesc }));
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="create__head">Создание мероприятия</div>
            {blocks.map((block) => (
                <div className="create__item" key={block.id}>
                    <div onClick={() => toggleBlock(block.id)}>{block.title}</div>
                    {openBlockId === block.id && block.content}
                </div>
            ))}
            {/*<div className=" save ">
                <p>Проверьте, что все обязательные поля заполнены</p>
                <button type="submit" className=" save__btn btn_black">
                    {isLoadongMessage ? <Spinner /> : 'Создать мероприятие'}
                </button>
            </div>*/}
        </form>
    );
};

export default CreateEventForm;
