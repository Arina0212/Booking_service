import { useCallback, useState } from 'react';

interface UseVisibilityResult {
    isVisible: boolean;
    onShow: VoidFunction;
    onHide: VoidFunction;
    onToggle: VoidFunction;
}

type UseVisibility = (initialState?: boolean) => UseVisibilityResult;

/** Хук, для контроля и изменения состояния видимости */
export const useVisibility: UseVisibility = (initialState) => {
    const [isVisible, setVisibility] = useState<boolean>(initialState ?? false);

    return {
        isVisible,
        onShow: useCallback(() => setVisibility(true), []),
        onHide: useCallback(() => setVisibility(false), []),
        onToggle: useCallback(() => setVisibility((prevState) => !prevState), []),
    };
};
