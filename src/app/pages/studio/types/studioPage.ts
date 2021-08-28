export enum RecordingStatus {
    RECORDING = 'recording',
    STOPPED = 'stopped'
}

export abstract class Studio {

    recordingStatus: RecordingStatus = RecordingStatus.STOPPED;

    abstract toggleRecordingStatus(): void;

    abstract getRecordingStatusClass() : string;

}
