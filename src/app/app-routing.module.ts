import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ComparisonComponent } from './comparison/comparison.component';
import { LivergradingComponent } from './livergrading/livergrading.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'liver', component: LivergradingComponent},
  {path:'comparison', component: ComparisonComponent},
  {path:'', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
