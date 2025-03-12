import { ReactNode } from 'react';
import { Shop } from 'types/Shop';
import { ShopContext } from '../Contexts/ShopContext';
interface ShopProviderProps {
    children: ReactNode;
    shop: Shop;
}

export const ShopProvider = ({ children, shop }: ShopProviderProps) => {
    return (
        <ShopContext.Provider value={{ shop }}>{children}</ShopContext.Provider>
    );
};
