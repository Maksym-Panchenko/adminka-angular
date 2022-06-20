import { Component, Input } from '@angular/core';
import { Role } from "@models/enums/roles.enum";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() currentRole: Role;
}
