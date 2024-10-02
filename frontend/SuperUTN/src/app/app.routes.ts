import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { authGuard,authAdminGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',component:CatalogoComponent},
    {path:'logIn',component:LogInComponent},
    {path:'signUp',component:SignUpComponent},
    {path:'addProducto',component:AddProductoComponent,canActivate:[authAdminGuard]},
    {path:'editProducto/:id',component:EditProductoComponent}
];
