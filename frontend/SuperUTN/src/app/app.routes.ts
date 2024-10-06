import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { authGuard,notAuthGuard,authAdminGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',component:CatalogoComponent},
    {path:'logIn',component:LogInComponent,canActivate:[notAuthGuard]},
    {path:'signUp',component:SignUpComponent,canActivate:[notAuthGuard]},
    {path:'addProducto',component:AddProductoComponent,canActivate:[authAdminGuard]},
    {path:'addCategoria',component:AddCategoriaComponent},
    {path:'editProducto/:id',component:EditProductoComponent}
];
