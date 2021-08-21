export interface CardProperties {
    imgUrl: string;
    title: string;
    description: string;
    badgeText: string;
    width: string;
    getCardTypeClass: Function
}

export type CardTypes = 'default' | 'inline';

export const CardTypeStyleStratergy = {

    default: "--default",
    inline: "--inline",
}


