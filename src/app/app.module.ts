import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// COMPONENT
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
