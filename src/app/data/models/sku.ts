import { Price } from "./price";

export interface Sku {
    id: string;
    name: string;
    imageUrl: string;
    code: string;
    description: string;
    prices: Price[];
    __collectionMeta: {
        recordCount: number;
        pageCount: number;
    };
}

export interface SkuV2 {
    attributes : {
        name: string;
        image_url: string;
        code: string;
        description: string;
        price_per_item: any;
    },
    id: string;
    prices: Price[];
    
    __collectionMeta: {
        recordCount: number;
        pageCount: number;
    };
}