import { ReactNode, useState } from 'react';
import { ShopContext } from '../Contexts/ShopContext';

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider = ({ children }: ShopProviderProps) => {
    const [shopState, setShopState] = useState({});

    return (
        <ShopContext.Provider value={{ shopState, setShopState }}>
            {children}
        </ShopContext.Provider>
    );
};
