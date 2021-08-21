export class UniqueId {

    private static id = "field-1" + UniqueId.getCurrentMilliseconds();

    private static getCurrentMilliseconds() {
        return new Date().getMilliseconds();
    }

    static getId() {
        return this.id;
    }
}