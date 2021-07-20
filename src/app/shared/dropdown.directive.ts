import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  constructor(private el:ElementRef, private render: Renderer2) { }
  
  @HostListener('document:click', ['$event']) toggleOpen1(event: Event) {
    this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
    let part = this.el.nativeElement.querySelector('.dropdown-menu');
     if(this.isOpen) this.render.addClass(part,"show");
     else this.render.removeClass(part,'show');
  }
}
