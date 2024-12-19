import React, { useEffect, useState } from 'react';

const FileInfo: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    /*const [fileSize, setFileSize] = useState<number | null>(null);*/

    useEffect(() => {
        const fetchFileInfo = async () => {
            try {
                /* const response = await axios.head(fileUrl);
                 const size = response.headers['content-length'];

                 // Получаем имя файла из URL*/
                const urlParts = fileUrl.split('/');
                const nameFromUrl = urlParts[urlParts.length - 1];
                setFileName(decodeURIComponent(nameFromUrl));

                /*if (size) {
                    setFileSize(parseInt(size, 10));
                }*/
            } catch (error) {
                console.error('Ошибка при получении информации о файле:', error);
            }
        };

        fetchFileInfo();
    }, [fileName, fileUrl]);

    return (
        <>
            {fileName ? (
                <a href={fileUrl} download="proposed_file_name" className="event__desc-download">
                    <div className="event__desc-download-pic">
                        <img src="/svg/event/docIcon.svg" alt="doc" />
                    </div>

                    <p>Программа мероприятия</p>

                    <span>{fileName}</span>
                    {/*{fileSize && <span>{(fileSize / 1024).toFixed(2)} КБ</span>}*/}
                </a>
            ) : (
                <p>Загрузка информации о файле...</p>
            )}
        </>
    );
};

export default FileInfo;
