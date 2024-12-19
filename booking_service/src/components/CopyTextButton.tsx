import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

const copyTextToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Текст успешно скопирован в буфер обмена!');
    } catch (err) {
        console.error('Ошибка:', err);
    }
};
type CopyButtonWithFeedbackProps = {
    textToCopy: string;
    isIcon?: boolean;
};
export default function CopyButtonWithFeedback({ textToCopy, isIcon }: CopyButtonWithFeedbackProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await copyTextToClipboard(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Скопировано успешно');
    };
    if (isIcon) {
        return (
            <button className="invite__item-copy" onClick={handleCopy}>
                <img src="/svg/event/copy.svg" alt="copy" />
            </button>
        );
    } else {
        return <button onClick={handleCopy}>{copied ? 'Скопировано' : textToCopy}</button>;
    }
}
