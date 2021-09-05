import { Audio } from "./AudioControl";

export class Repeat extends Audio {

    private repeat = false;

    repeatNotRepeatIcons: [string, string] = ['assets/icons/not-repeat-icon.svg', 'assets/icons/repeat-icon.svg'];

    get repeatNotRepeatCurrentIcon(): string {

        const isToRepeat = this.repeat;

        return this.repeatNotRepeatIcons[Number(isToRepeat)];
    }

    get shouldRepeat() {
        return this.repeat;
    }

    enableRepeating() {
        this.repeat = true;
    }

    disableRepeating() {
        this.repeat = false;
    }


    toggle() {
        this.repeat ? this.disableRepeating() : this.enableRepeating();
    }
}