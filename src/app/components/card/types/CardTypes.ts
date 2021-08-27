import { CardStyleMappingEnum } from "@enums/cardComponent/CardSstyleMappingEnum";

export interface CardProperties {
    imgUrl: string;
    title: string;
    description: string;
    badgeText: string;
    width: string;
    getCardTypeClass: Function
}

export type CardTypes = CardStyleMappingEnum;
