import { Component } from '@angular/core';
import members from 'src/app/config/members';
import { Member } from 'src/app/types';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  members: Member[] = members;
}
