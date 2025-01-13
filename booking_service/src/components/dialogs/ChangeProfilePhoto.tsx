import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeProfilePhoto } from '../../store/api-actions';
import { getLoadingPhoto } from '../../store/user-process/selectors';
import Spinner from '../Spinner';

type ChangeProfilePhotoProps = {
    isOpen: boolean;
    onClose: VoidFunction;
};

export default function ChangeProfilePhoto({ isOpen, onClose }: ChangeProfilePhotoProps) {
    const [fileInfo, setFileInfo] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const isLoadingPhoto = useAppSelector(getLoadingPhoto);
    if (!isOpen) return null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
            setError(null);
            setFileInfo(file);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (fileInfo) {
            await dispatch(
                changeProfilePhoto({
                    new_photo: fileInfo,
                }),
            );

            onClose();
        }
    };

    const getTruncatedFileName = (name: string): string => {
        return name.length > 27 ? `${name.slice(0, 24)}...` : name;
    };

    return (
        <dialog className="dialog dialog_change" open>
            <form method="dialog" className="dialog__content" onSubmit={handleUpload}>
                <button className="dialog__content-close" formMethod="dialog" onClick={onClose}>
                    <img src="/svg/closeCross.svg" alt="закрыть" />
                </button>

                <h2 className="dialog__content-title">Смена аватара</h2>

                <p className="dialog__content-text">Формат: .jpg, .png и .bmp, размер от 400 пикселей в ширину и высоту, вес до 2 MB</p>

                <div className="dialog__content-upload">
                    <input
                        type="file"
                        accept=".jpg,.png,.bmp"
                        id="dialog__content-upload-input"
                        onChange={handleFileChange}
                        className="dialog__content-upload-input"
                        style={{
                            display: 'none',
                        }}
                    />
                    <label className="dialog__content-upload-btn" htmlFor="dialog__content-upload-input">
                        +
                    </label>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {fileInfo ? (
                        <>
                            <p>{getTruncatedFileName(fileInfo.name)}</p>
                            <div className="dialog__content-upload-btn_delete ">
                                <span>{(fileInfo.size / (1024 * 1024)).toFixed(2)} Мб </span>
                                <button
                                    className="create__item-content-file-delete"
                                    onClick={() => {
                                        setFileInfo(null);
                                        setError(null);
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Нажмите на + и</p>
                            <p>выберите файл</p>
                        </>
                    )}
                </div>

                <button className="dialog__content-btn btn_black" type="submit">
                    {isLoadingPhoto ? <Spinner /> : 'Изменить аватар'}
                </button>
            </form>
        </dialog>
    );
}
