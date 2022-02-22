import path from "path"
import { Podbook } from "../entity/Podbook"

export const getPodbooksFiles = (podbooks: Podbook[]) => {

    if (!podbooks.length) return;

    const podbook: Podbook[] = podbooks.map(podbook => ({
        ...podbook,
        bannerImage: path.join('/uploads', podbook.bannerImage).replace(/\\/g,'\/'),
        audio: path.join('/uploads', podbook.audio).replace(/\\/g,'\/')
    }))

    return podbook;
}