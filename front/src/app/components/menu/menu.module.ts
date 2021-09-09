import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "@components/menu/menu.component";
import { MenuDirective } from './directives/menu.directive';

@NgModule({
    declarations: [MenuComponent, MenuDirective],
    imports: [CommonModule, RouterModule],
    exports: [MenuComponent]
})
export class MenuModule { }