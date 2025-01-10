import * as React from 'react';
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
    iconName?: 'whatsappIcon' | 'vkIcon' | 'tgIcon' | 'mailIcon';
};
export default function CopyButtonWithFeedback({ textToCopy, isIcon, iconName }: CopyButtonWithFeedbackProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await copyTextToClipboard(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Скопировано успешно');
    };
    if (isIcon) {
        if (iconName === 'whatsappIcon') {
            return (
                <button className="invite__item-copy" type="button" onClick={handleCopy}>
                    <img src="/svg/event/whatsappIcon.svg" alt="whatsapp" />
                </button>
            );
        }
        if (iconName === 'vkIcon') {
            return (
                <button className="invite__item-copy" type="button" onClick={handleCopy}>
                    <img src="/svg/event/vkIcon.svg" alt="vk" />
                </button>
            );
        }
        if (iconName === 'tgIcon') {
            return (
                <button className="invite__item-copy" type="button" onClick={handleCopy}>
                    <img src="/svg/event/tgIcon.svg" alt="tg" />
                </button>
            );
        }
        if (iconName === 'mailIcon') {
            return (
                <button className="invite__item-copy" type="button" onClick={handleCopy}>
                    <img src="/svg/event/mailIcon.svg" alt="mail" />
                </button>
            );
        } else {
            return (
                <button className="invite__item-copy" type="button" onClick={handleCopy}>
                    <img src="/svg/event/copy.svg" alt="copy" />
                </button>
            );
        }
    } else {
        return <button onClick={handleCopy}>{copied ? 'Скопировано' : textToCopy}</button>;
    }
}
