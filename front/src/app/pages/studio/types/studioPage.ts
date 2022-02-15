import { TabItem } from "@components/tab/types/TabItem";
import { PaginationMetadata } from "@typing/pagination/pagination";

export enum RecordingStatus {
    RECORDING = 'recording',
    STOPPED = 'stopped'
}

export abstract class Studio {

    recordingStatus: RecordingStatus = RecordingStatus.STOPPED;

    abstract toggleRecordingStatus(): void;

    abstract getRecordingStatusClass(): string;

}

export interface Podbook {

    bannerImage: File
    bannerTitle: string
    description: string
    category: string
    audio: File;
}
export interface PodbookResponse {

    bannerImage: string
    bannerTitle: string
    description: string
    category: { cat_id: number, name: string }
    audio: string;
}
export interface PaginatedPodbookResponse {

    data: {
        bannerImage: string
        bannerTitle: string
        description: string
        category: { cat_id: number, name: string }
        audio: string;
    }[],
    paginationMetadata: PaginationMetadata

}

export interface PodbookData {

    user_id: number
    podbook: Podbook
}

export interface Navigator {
    getUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
}

export interface RecordedAudio {
    audioBlob?: Blob,
    audioUrl?: string
    audioName: string;
}

export class TabRoutedCreator {

    static currentActiveTab: TabItem;

    private tabItem: TabItem = {} as TabItem;

    private urlMapping: string = '';

    get tab() {
        return this.tabItem;
    }

    set tab(tab: TabItem) {
        this.tabItem = tab;
    }

    get url() {
        return this.urlMapping;
    }

    set url(url: string) {
        this.urlMapping = url;
    }

    constructor(tab: TabItem, url: string) {

        this.tabItem = tab;
        this.urlMapping = url;
    };
}

export interface SelectOption {
    cat_id: string;
    name: string;
}