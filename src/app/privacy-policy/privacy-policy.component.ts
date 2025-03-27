import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements AfterViewInit {
  ngAfterViewInit() {
    window.scroll({top: 0, left: 0, behavior: 'instant'})
  }
}
