import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // LoginComponent import edildi
import { CreateUserComponent } from './create/user/user.component'; // CreateUserComponent import edildi
import { FormsModule } from '@angular/forms'; // FormsModule'ü import edin
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './categories/category.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    CategoryComponent
    
     // CreateUserComponent'i ekleyin
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule, // FormsModule'u imports içine ekleyin
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
