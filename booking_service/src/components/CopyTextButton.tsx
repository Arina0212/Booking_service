import { useState } from 'react';

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
};
export default function CopyButtonWithFeedback({ textToCopy }: CopyButtonWithFeedbackProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await copyTextToClipboard(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return <button onClick={handleCopy}>{copied ? 'Скопировано' : textToCopy}</button>;
}
