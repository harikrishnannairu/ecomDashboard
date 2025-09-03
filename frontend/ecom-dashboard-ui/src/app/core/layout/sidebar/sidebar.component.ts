import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Home, Settings, FileText, Package, Bot } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router:Router){}
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();


  goToDashboard(){
     this.router.navigate(['/']);
  }
    goToOrders() {
    this.router.navigate(['/orders']);
  }
    goToProducts() {
    this.router.navigate(['/products']);
  }
    goToChatBot() {
    this.router.navigate(['/chatgpt']);
  }
}
