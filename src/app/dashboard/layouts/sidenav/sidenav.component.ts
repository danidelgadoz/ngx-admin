import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

const WIDTH_FOR_RESPONSIVE = 1280;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {
  isFixed = false;
  isOpen = true;

  @ViewChild('sidenav', { static: true }) sidenavElement!: ElementRef;

  @HostListener('window:resize', ['$event']) onResize(e: any) {
    this.changeToResponsiveViewIfNeed(e.target.innerWidth);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.changeToResponsiveViewIfNeed(window.innerWidth);
    this.setMenusExperienceScripts();
  }

  setMenusExperienceScripts(): void {
    const submenuArray = this.sidenavElement.nativeElement.querySelectorAll('.submenu');
    const itemArray = this.sidenavElement.nativeElement.querySelectorAll('dl:not(.submenu) dt');

    itemArray.forEach((item: Element) => {
      item.addEventListener('click', (e) => {
        submenuArray.forEach((submenu: any) => {
          submenu.classList.remove('open');
          submenu.querySelector('dd').style.height = '0';
        });
      });
    });

    if (submenuArray.length > 0) {
      submenuArray.forEach((submenu: any) => {
        submenu.setAttribute('default-height', `${submenu.querySelector('dd')?.clientHeight}`);
        submenu.querySelector('dd').style.height = 0;

        submenu.querySelector('dt').addEventListener('click', () => {
          submenu.classList.toggle('open');
          const smCollapsingSection = submenu.querySelector('dd');
          if (smCollapsingSection.style.height === '0px') {
            smCollapsingSection.style.height = smCollapsingSection.parentElement.getAttribute('default-height') + 'px';
          } else {
            smCollapsingSection.style.height = 0;
          }

          [].slice
            .call(submenuArray)
            .filter( sm => sm !== submenu )
            .map((sibiling: any) => {
              sibiling.querySelector('dd').style.height = 0;
              sibiling.classList.remove('open');
            });
        });
      });
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  private changeToResponsiveViewIfNeed(windowsWidth: number): void {
    if (windowsWidth <= WIDTH_FOR_RESPONSIVE) {
      this.isOpen = false;
      this.isFixed = true;
    } else {
      this.isOpen = true;
      this.isFixed = false;
    }
  }

}
