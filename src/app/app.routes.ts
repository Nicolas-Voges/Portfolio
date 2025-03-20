import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'privacy_policy', component: PrivacyPolicyComponent },
    { path: 'datenschutz', component: PrivacyPolicyComponent },
    { path: 'legal_notice', component: LegalNoticeComponent },
    { path: 'impressum', component: LegalNoticeComponent }
];
