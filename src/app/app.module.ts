import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // LoginComponent import edildi
import { CreateUserComponent } from './create/user/user.component'; // CreateUserComponent import edildi
import { FormsModule } from '@angular/forms'; // FormsModule'ü import edin
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // FormsModule'u imports içine ekleyin
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
