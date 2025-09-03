import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'theme'; // 'light' | 'dark'
  private document = inject(DOCUMENT);
  constructor() { }

 init(){

  const saved=localStorage.getItem(this.storageKey) as 'light' | 'dark' | null;
  const prefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme: 'light' | 'dark' = saved ?? (prefersDark ? 'dark' : 'light');
  this.apply(theme,{save:false});
 }

 toggle(){
  const isDark=this.document.documentElement.classList.contains('dark');
  this.apply(isDark ? 'dark' : 'light');
 }

 private apply(theme: 'light' | 'dark',opts:{save?:boolean}={save:true}){
  const root=this.document.documentElement;
  if(theme === 'dark'){
    root.classList.add('dark');
  }else{
    root.classList.remove('dark');
  }
  if(opts.save) localStorage.setItem(this.storageKey,theme);
 }
}
