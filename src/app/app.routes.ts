import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'privacy_policy', component: PrivacyPolicyComponent }, // Translate link Ger <-> En?
    { path: 'legal_notice', component: LegalNoticeComponent },  // Translate link Ger <-> En?
    // { path: 'impressum', component: LegalNoticeComponent }  // Translate link Ger <-> En? Maybe catch path for translation.
];
