import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../theme/theme.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  isDark:boolean=false;
  dropdownOpen = false;
  isLoggedIn = false;
  userName = '';
  userRole:string |null ='';
  userEmail :string | null='';

   @Output() toggleSidebar = new EventEmitter<void>();

   constructor(private theme:ThemeService,
     private router: Router,
     private tokenService:TokenService
   ){}
   ngOnInit(){
    this.isDark = document.documentElement.classList.contains('dark');
    this.isLoggedIn=this.tokenService.isLoggedIn();
   }

   toggleTheme(){
    this.isDark=!this.isDark;
    if(!this.isDark){
      document.documentElement.classList.remove('dark');
    }else{
      document.documentElement.classList.add('dark');
    }
    this.theme.toggle();

   }
   userSection(){
    this.dropdownOpen = !this.dropdownOpen
    this.userEmail = this.tokenService.getEmail();
    this.userRole=this.tokenService.getRole();
   }
   
  logout() {
    this.tokenService.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
    goToMyOrders() {
    this.dropdownOpen = false;
    this.router.navigate(['/my-orders']);
  }
}
