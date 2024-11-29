import { CartItem } from './CartItem';
import { MenuCartItem } from './MenuCartItem';

export type Cart = {
    Items: CartItem[],
    MenuItems: MenuCartItem[],
    TotalSum: number,
}
