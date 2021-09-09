import { IconProperties } from "../types/FormField";

export function getIcon(iconName: string, iconDataList: IconProperties[]): IconProperties | undefined {

    if (!iconDataList.length) return undefined;

    const icon = iconDataList.filter(icon => icon.key === iconName)[0]

    return icon;
}