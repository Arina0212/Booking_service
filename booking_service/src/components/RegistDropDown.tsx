import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export interface IDropdownOption {
    labelValue: string | number;
    id: number;
}

interface IDropdownProps {
    options: { labelValue: string | number; id: number }[];
    placeHolder: string;
    type?: 'arrow-down';
    tabIndex?: number;
    onChange: (selectedValue: number) => void;
}

function DropdownRegister({ options, placeHolder, type = 'arrow-down', tabIndex = 0, onChange }: IDropdownProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [wrapperRef]);

    const onValueChange = (selectedOption: IDropdownOption) => {
        setSelectedItem(selectedOption.labelValue);
        setSelectedId(selectedOption.id);
        onChange(selectedOption.id);
        setIsFocused(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div tabIndex={tabIndex} className="dropdown-select dropdown-select-selected" onClick={() => setIsFocused(!isFocused)}>
                <div className="dropdown-select-selected">
                    {selectedItem === null ? <span>{placeHolder}</span> : <p className="dropdown-select-selected-text">{selectedItem}</p>}
                </div>
                {type === 'arrow-down' && (
                    <div className={clsx('dropdown-select-caret', { 'rotate-180 items-center': isFocused })}>
                        <img src="/svg/caret.svg" alt="" />
                    </div>
                )}
            </div>
            {isFocused && (
                <div className="dropdown-menu">
                    <ul className="dropdown-menu-wrapper">
                        {options.map((option) => (
                            <li key={option.id} onClick={() => onValueChange(option)} className="dropdown-menu-item">
                                <p className="dropdown-menu-item-text">{option.labelValue}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropdownRegister;
