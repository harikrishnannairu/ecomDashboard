import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,SidebarComponent,TopbarComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

   collapsed = false;
   constructor(private themeService:ThemeService){

   }
   ngOnInit(){
    this.themeService.init();
   }
}
