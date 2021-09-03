import { CardStyleMappingEnum } from "@enums/cardComponent/CardSstyleMappingEnum";

export interface CardProperties {
    imgUrl: string;
    title: string;
    description: string;
    badgeText: string;
    width: string;
    getCardTypeClass: Function;
    callback?: Function;
}
export interface CardPropertiesDTO {
    imgUrl: string;
    title: string;
    description: string;
    badgeText: string;
    width: string;
    callback?: Function;
}

export type CardTypes = CardStyleMappingEnum;
