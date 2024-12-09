import { useContext } from 'react';
import { ShopContext } from '../Contexts/ShopContext';

export default function useShop() {
    return useContext(ShopContext);
}
