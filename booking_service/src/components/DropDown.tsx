import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface IDropdownOption {
    labelValue: string | number;
}

interface IDropdownProps {
    name?: string;
    options: IDropdownOption[];
    required?: boolean;
    tabIndex?: number;
    className?: string;
    type?: string;
    placeHolder?: string;
    labelName?: string;
}

function Dropdown({ options, placeHolder, type, tabIndex }: IDropdownProps) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<number | string>(options[0].labelValue);
    const wrapperRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const onValueChange = (selectedValue: string | number) => {
        setSelectedItem(selectedValue);
        setIsFocused(false);
    };

    React.useEffect(() => {
        setIsFocused(false);
    }, [selectedItem]);

    return (
        <div ref={wrapperRef} className="relative">
            <div tabIndex={tabIndex} className=" dropdown-select dropdown-select-selected" onClick={() => setIsFocused(!isFocused)}>
                <div className="dropdown-select-selected">
                    <span>{placeHolder}</span>&nbsp;<p className="dropdown-select-selected-text">{selectedItem}</p>
                </div>
                {type === 'arrow-down' && (
                    <div className={clsx('dropdown-select-caret ', { 'rotate-180 items-center': isFocused })}>
                        <img src="/svg/caret.svg" alt="" />
                    </div>
                )}
            </div>
            {isFocused && (
                <div className="dropdown-menu">
                    <ul className="dropdown-menu-wrapper">
                        {options.map(({ labelValue }) => (
                            <li key={labelValue} onClick={() => onValueChange(labelValue)} className="dropdown-menu-item ">
                                <p className="dropdown-menu-item-text">{labelValue}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;

Dropdown.defaultProps = {
    name: '',
    type: '',
    className: '',
    placeHolder: '',
    required: false,
    tabIndex: 0,
    labelName: '',
};
