import { CardStyleMappingEnum } from "@enums/cardComponent/CardSstyleMappingEnum";

export interface CardProperties {
    imgUrl: string;
    title: string;
    description: string;
    badgeText: string;
    click?: Function;
}
export type CardTypes = CardStyleMappingEnum;
