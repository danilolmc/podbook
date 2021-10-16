import { TabItem } from "@components/tab/types/TabItem";

export enum RecordingStatus {
    RECORDING = 'recording',
    STOPPED = 'stopped'
}

export abstract class Studio {

    recordingStatus: RecordingStatus = RecordingStatus.STOPPED;

    abstract toggleRecordingStatus(): void;

    abstract getRecordingStatusClass(): string;

}

export interface Navigator {
    getUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
}

export interface RecordedAudio {
    audioBlob: Blob,
    audioUrl: string
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
