import { Component, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../translation.service';
import AOS from 'aos';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  translation = inject(TranslationService);
    
    ngOnInit() {
        AOS.init({
          offset: 200,
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          delay: 100,
        });
      }
    
      ngAfterViewInit(): void {
        AOS.refresh();
      }
}
