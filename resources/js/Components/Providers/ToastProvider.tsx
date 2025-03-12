import { ReactNode, useState } from 'react';
import { ToastContext } from '../Contexts/ToastContext';

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toast, setToast] = useState(null);

    return (
        <ToastContext.Provider value={setToast}>
            {children}
        </ToastContext.Provider>
    );
};
