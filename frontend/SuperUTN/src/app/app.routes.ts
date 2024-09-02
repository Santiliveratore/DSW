import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {path:'',component:CatalogoComponent},
    {path:'logIn',component:LogInComponent},
    {path:'signUp',component:SignUpComponent}
];
