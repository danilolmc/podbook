export class UniqueId {

    private static id = 0;

    private static getCurrentMilliseconds() {
        return new Date().getMilliseconds();
    }

    static getId() {
        return `field-${++this.id + UniqueId.getCurrentMilliseconds()}`;
    }
}