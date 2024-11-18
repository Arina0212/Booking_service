import React, { useRef, useState } from 'react';
import useAutosizeTextArea from '../hooks/useAutoSize';
import { FORMATS } from '../const';

interface Block {
    id: number;
    title: JSX.Element;
    content: JSX.Element;
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

    const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
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

            // Проверка разрешения изображения
            const img = new Image();
            img.onload = () => {
                if (img.width < 400 || img.height < 400) {
                    setError('Минимальное разрешение изображения: 400x400 пикселей.');
                    setFileInfo(null);
                } else {
                    setError(null); // Если все проверки пройдены, сбрасываем ошибку
                    setFileInfo({ name: file.name, size: file.size });
                }
            };
            img.src = URL.createObjectURL(file); // Создаем URL для этого файла
        }
    };
    const [fileInfoDesc, setFileInfoDesc] = useState<{ name: string; size: number } | null>(null);

    const handleFileDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Получаем загруженный файл
        if (file) {
            setFileInfoDesc({ name: file.name, size: file.size }); // Сохраняем имя и размер файла
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

    const [dateTimes, setDateTimes] = useState<Array<string>>(['']); // Начальное состояние с одним пустым полем

    const handleAddDateTime = () => {
        setDateTimes([...dateTimes, '']); // Добавляем новое пустое поле для даты
    };

    const handleRemoveDateTime = (index: number) => {
        const newDateTimes = dateTimes.filter((_, i) => i !== index); // Удаляем поле по индексу
        setDateTimes(newDateTimes);
    };

    const handleChangeDateTime = (index: number, value: string) => {
        setDateTimes((prevDateTimes) => prevDateTimes.map((dt, i) => (i === index ? value : dt)));
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

    const [accessLevel, setAccessLevel] = useState('open');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccessLevel(event.target.value);
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({ ...prevState, paymentType: event.target.value }));
    };
    const handlePaymentCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({ ...prevState, payCount: event.target.value }));
    };
    // Состояние для управления открытыми блоками
    const [openBlockId, setOpenBlockId] = useState<number | null>(null);

    // Массив блоков с их содержимым
    const blocks: Block[] = [
        {
            id: 1,
            title: (
                <div className={`create__item-head ${openBlockId === 1 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Название мероприятия<span>*</span>
                    </h1>
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 1 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <p className="create__item-content-text">
                            Назовите ваше событие ярко и кратко, чтобы заинтересовать пользователей
                            <br />
                            Максимум 120 символов
                        </p>
                        <textarea
                            className="create__item-content-input textarea"
                            placeholder="Введите название"
                            maxLength={120}
                            onChange={handleChangeName}
                            ref={textAreaRef}
                            rows={1}
                            value={data.name}
                            required
                        ></textarea>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: (
                <div className={`create__item-head ${openBlockId === 2 ? 'create__item-head_active' : ''}`}>
                    <h1>Баннер</h1>
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 2 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
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
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: (
                <div className={`create__item-head ${openBlockId === 3 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Описание<span>*</span>
                    </h1>
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 3 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <p className="create__item-content-text">
                            Расскажите подробнее о мероприятии
                            <br />
                            Рекомендуем 3-4 предложения, чтобы познакомить пользователей с предстоящим событием
                        </p>
                        <textarea
                            className="create__item-content-input textarea"
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
                                Выберать файл
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
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 4 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
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
                                        <div className="input_white">
                                            <input
                                                className="input_white-field"
                                                name="city"
                                                type="text"
                                                placeholder="Введите город"
                                                value={data.city}
                                                onChange={handleChangeCity}
                                            />
                                        </div>
                                        <div className="input_white">
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
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 5 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <p className="create__item-content-text">Укажите один из форматов вашего мероприятия</p>
                        <div className="create__item-content-dropdown dropdown">
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
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 6 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <p className="create__item-content-text">
                            Укажите даты и время начала и окончания вашего мероприятия
                            <br />
                            Если оно состоит из нескольких частей, то можно указать несколько временных отрезков
                        </p>

                        {dateTimes.map((dateTime, index) => (
                            <div id="createDates" className="create__item-content-dates">
                                <div key={index} className="create__item-content-dates-date input_white">
                                    <input
                                        className="input_white-field input_white-field_date"
                                        type="datetime-local"
                                        value={dateTime}
                                        onChange={(e) => handleChangeDateTime(index, e.target.value)}
                                    />
                                    <img src="/svg/calendar.svg" alt="" className="input_white-calendar" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDateTime(index)}
                                    className={`create__item-content-dates-remove ${index === 0 && 'visually-hidden'} `}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddDateTime} // Обработчик добавления
                            className="create__item-content-add"
                        >
                            Добавить дату и время
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
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 7 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
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
                                    <div className="create__item-content-input_short input_white">
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
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 8 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
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
                                value="closed"
                                checked={accessLevel === 'closed'}
                                onChange={handleRadioChange}
                                required
                            />
                            <label htmlFor="createAccessClosed" className="create__item-content-radios-btn">
                                <span></span>
                                Закрытое мероприятие
                            </label>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 9,
            title: (
                <div className={`create__item-head ${openBlockId === 9 ? 'create__item-head_active' : ''}`}>
                    <h1>
                        Количество участников<span>*</span>
                    </h1>
                    <div className="create__item-head-pic">
                        <img src="/svg/caret.svg" alt="caret" />
                    </div>
                </div>
            ),
            content: (
                <div className={`create__item-content ${openBlockId === 9 ? 'create__item-content_active' : ''}`}>
                    <div className="create__item-content-wrap">
                        <p className="create__item-content-text">
                            Если вы не можете вместить большее количество людей, чем подразумевает площадка,
                            <br />
                            то поставьте ограничение на участников
                        </p>
                        <div className="create__item-content-radios">
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createMembersUnlimited"
                                name="createMembers"
                                value="unlimited"
                                required
                            />
                            <label htmlFor="createMembersUnlimited" className="create__item-content-radios-btn">
                                <span></span>
                                Неограниченно
                            </label>
                            <input
                                type="radio"
                                className="visually-hidden"
                                id="createMembersLimited"
                                name="createMembers"
                                value="limited"
                                required
                            />
                            <label form="createMembersLimited" className=" create__item-content-radios-btn">
                                <span></span>
                                Ограниченно
                            </label>
                        </div>
                        <div id=" createMembersLimitedAmount" className=" create__item-content-hidden">
                            <div className=" create__item-content-wrap">
                                <div className=" create__item-content-inputs">
                                    <div className=" input_white">
                                        <input
                                            className=" input_white-field"
                                            name="countPeople"
                                            type=" text"
                                            placeholder=" Введите количество"
                                        />
                                    </div>
                                    <p>19.10.23 18:00 – 19.10.23 18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    // Функция для переключения открытого блока
    const toggleBlock = (id: number) => {
        setOpenBlockId(openBlockId === id ? null : id);
    };

    return (
        <form className="create">
            {blocks.map((block) => (
                <div className="create__item" key={block.id}>
                    <div onClick={() => toggleBlock(block.id)}>{block.title}</div>
                    {openBlockId === block.id && block.content}
                </div>
            ))}
            <div className=" save save_hide">
                <p>Проверьте, что все обязательные поля заполнены</p>
                <button type="submit" className=" save__btn btn_black">
                    Создать мероприятие
                </button>
            </div>
        </form>
    );
};

export default CreateEventForm;
