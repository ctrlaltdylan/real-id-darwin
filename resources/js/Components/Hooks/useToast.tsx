import { useContext } from 'react';
import { ToastContext } from '../Contexts/ToastContext';

export default function useToast() {
    return useContext(ToastContext);
}
