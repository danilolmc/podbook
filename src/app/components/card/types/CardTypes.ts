export interface CardProperties {
    imgUrl: string;
    title: string;
    description: string;
    badgeText: string;
    width: string;
    getCardType: Function

}

export type CardTypes = 'default' | 'inline';

export const CardTypeStyleStratergy = {

    default: "--default",
    inline: "--inline",
}


