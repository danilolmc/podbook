import { Request } from "express";
import path from "path"
import { Podbook } from "../entity/Podbook"

export const getPodbooksFiles = (podbooks: Podbook[], request: Request) => {

    if (!podbooks.length) return;

    const HOST = process.env.HOST + ':';
    const PORT = process.env.SERVER_PORT;
    const PROTOCOL = request.protocol + '://';

    const podbook: Podbook[] = podbooks.map(podbook => ({
        ...podbook,
        bannerImage: `${PROTOCOL}${HOST}${PORT}${path.join('/uploads', podbook.bannerImage).replace(/\\/g,'\/')}`,
        audio: `${PROTOCOL}${HOST}${PORT}${path.join('/uploads', podbook.audio).replace(/\\/g,'\/')}`
    }))

    return podbook;
}