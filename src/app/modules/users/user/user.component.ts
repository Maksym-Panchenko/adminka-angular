import { Component, Input } from '@angular/core';
import { IUser } from '@models/interfaces/user.interface';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: IUser;
}
