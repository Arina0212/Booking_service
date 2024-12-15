import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export interface IDropdownOption {
    labelValue: string | number;
    id: number;
}

interface IDropdownProps {
    options: { labelValue: string | number; id: number }[];
    placeHolder: string;
    type?: 'arrow-down'; // Added type definition for type safety
    tabIndex?: number;
    onChange: (selectedValue: number) => void;
}

function DropdownRegister({ options, placeHolder, type = 'arrow-down', tabIndex = 0, onChange }: IDropdownProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | number | null>(null); // Changed to string | null
    const [selectedId, setSelectedId] = useState<string | number | null>(null); // Track the ID
    const wrapperRef = useRef<HTMLDivElement>(null); // Added type for useRef

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
        setSelectedId(selectedOption.id); // Set the selected ID
        onChange(selectedOption.id); // Pass the ID to onChange
        setIsFocused(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div tabIndex={tabIndex} className="dropdown-select dropdown-select-selected" onClick={() => setIsFocused(!isFocused)}>
                <div className="dropdown-select-selected">
                    {/* Conditionally render placeholder or selected item */}
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
