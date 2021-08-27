import { CardStyleMappingEnum } from "@enums/cardComponent/CardSstyleMappingEnum";
import { ListStatesEnum } from "@enums/styleListComponent/ListStateEnum";


export const StyleListStratergy = {

    [ListStatesEnum.GRID]: CardStyleMappingEnum.DEFAULT,
    [ListStatesEnum.LIST]: CardStyleMappingEnum.INLINE,
}

