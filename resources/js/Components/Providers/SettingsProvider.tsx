import { createContext, ReactNode, useContext } from 'react';

interface SettingsContextProps {
    data: any;
    setData: (field: string, value: any) => void;
    post: (url: string, options?: any) => void;
    processing: boolean;
    errors: any;
    setFieldValue: (field: string, value: any) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
    undefined,
);

export const SettingsProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: SettingsContextProps;
}) => {
    const setFieldValue = (field: string, value: any) => {
        const fields = field.split('.');
        let data = value.data;
        for (let i = 0; i < fields.length - 1; i++) {
            if (!data[fields[i]]) {
                data[fields[i]] = {};
            }
            data = data[fields[i]];
        }
        data[fields[fields.length - 1]] = value;
        value.setData(fields[0], value.data[fields[0]]);
    };

    return (
        <SettingsContext.Provider value={{ ...value, setFieldValue }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
