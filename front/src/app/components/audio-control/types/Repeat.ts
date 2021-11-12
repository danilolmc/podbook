import { Audio } from "./AudioControl";

export class Repeat {

    private repeat = false;

    repeatNotRepeatIcons: [string, string] = ['assets/icons/not-repeat-icon.svg', 'assets/icons/repeat-icon.svg'];

    constructor(private htmlAudio: Audio) { }

    get repeatNotRepeatCurrentIcon(): string {

        const isToRepeat = this.repeat;

        return this.repeatNotRepeatIcons[Number(isToRepeat)];
    }

    get shouldRepeat() {
        return this.repeat;
    }

    enableRepeating() {
        this.repeat = true;

        this.htmlAudio.audio.loop = true;
    }

    disableRepeating() {
        this.repeat = false;

        this.htmlAudio.audio.loop = false;
    }


    toggle() {
        this.repeat ? this.disableRepeating() : this.enableRepeating();
    }
}