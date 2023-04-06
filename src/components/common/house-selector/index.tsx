/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { Button, Popover, Typography } from 'antd';

import styles from './house-selector.module.css';

type Props = {
    placeholder?: string;
    hideText?: boolean;
    buttonIcon?: ReactNode;
    disbled?: boolean;
    isLoading?: boolean;
    options?: Array<{
        value: string;
        label: string;
        selectOption: ReactNode;
    }>;
    onSelectedItem?: (value: string) => void;
};

export const HouseSelector = ({
    placeholder,
    options,
    onSelectedItem,
    disbled = false,
    isLoading = false,
    buttonIcon = null,
    hideText = false,
}: Props) => {
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [selectedLabel, setSelectedLabel] = useState<string>('');

    useEffect(() => {
        if (onSelectedItem) {
            onSelectedItem(selectedItem);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem]);

    const createContent = () => (
        <div className={styles['options-body']}>
            {options?.map((i) => (
                <div
                    onClick={() => {
                        setSelectedItem(i.value);
                        setSelectedLabel(i.label);
                    }}
                    className={`${styles['option-item']} ${
                        styles[i.value === selectedItem ? 'option-item__selected' : '']
                    }`}
                    id='houseSelectorItem'
                    data-value={i.value}
                >
                    {i.selectOption}
                </div>
            ))}
        </div>
    );
    const text = selectedLabel || (
        <Typography.Text style={{ color: 'lightgrey' }}>{placeholder}</Typography.Text>
    );

    return (
        <Popover placement='bottom' content={createContent()} trigger='click'>
            <Button disabled={disbled} icon={isLoading ? <LoadingOutlined /> : buttonIcon}>
                {!hideText && text}
            </Button>
        </Popover>
    );
};
