import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudioControlModule } from '@components/audio-control/audio-control.module';
import { FooterModule } from '@components/footer/footer.module';
import { MenuModule } from '@components/menu/menu.module';
import { HomeModule } from '@pages/home/home.module';
import { AppRoutingModule } from '@routes/app.routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    MenuModule,
    AudioControlModule,
    FooterModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
