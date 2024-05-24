import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  onTabChange(event: any) {
    const tab = event.tab;
    console.log('Tab changed to:', tab);
  }

  navigateToTab(tab: string) {
    this.router.navigate([`/tabs/${tab}`]);
  }
}
