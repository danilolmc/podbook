export abstract class ButtonControl{
 
    abstract set callback(fun: Function);

    abstract toggleControl(): void;

    abstract get currentIcon(): string;

    abstract get currentStyleClass(): string;

    abstract executeCallback(): void;

}