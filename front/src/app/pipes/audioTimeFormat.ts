
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'audioTime'
})
export class AudioPipe implements PipeTransform {
    transform(timeInSeconds: number = 0) {
        const pad = function (num: any, size: any) { return ('000' + num).slice(size * -1); };
        const time = Number(timeInSeconds);
        const hours = Math.floor(time / 60 / 60);
        const minutes = Math.floor(time / 60) % 60;
        const seconds = Math.floor(time - minutes * 60)


        if (hours === 0 && [minutes, seconds].every(timer => timer > 0)) {
            return pad(minutes, 2) + ':' + pad(seconds, 2);
        }

        if ([hours, minutes].every(timer => timer == 0) && seconds > 0) {
            return '0:' + pad(seconds, 2);
        }

        if ([hours, seconds].every(timer => timer == 0) && minutes > 0) {
            return pad(seconds, 2) + ':00';
        }

        if ([hours, minutes, seconds].every(timer => timer == 0)) {
            return '0:00';
        }

        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
    }
}