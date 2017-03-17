import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';

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
  ]
})
export class HeaderModule { }
