export interface IItems{
    _id: string;
    title: string;
    description: string;
    img: string[];
    characteristics: ICharacteristics[];
    rating: IReview[]
    price: number;
    url: string;
}

export interface ICharacteristics{
    name: string;
    value: string;
}

export interface IReview{
    user_id: string;
    value: number;
    text: string;
}

export interface IParamsItems{
    data: IItems;
}

export interface IBasketItems {
    item: string;
    amount: number;
}

export interface IBusket {
    user_id:string;
    items: IBasketItems[];
}

export interface IUser{
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    boughtItems: {item: string, amount: number}[]
}

export interface IItemsWithAvg extends IItems{
    avg?: number
}