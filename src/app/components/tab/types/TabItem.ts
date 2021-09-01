export abstract class TabItem{
    title: string = '';
    selected: boolean = false;

    abstract set callback(fun: Function);
}