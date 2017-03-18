import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { DropdownModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule.forRoot()
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  providers: [ AuthService ]
})
export class HeaderModule { }
