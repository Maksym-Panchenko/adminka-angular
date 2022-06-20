import {Role} from "@models/enums/roles.enum";

export interface NavItem {
  icon: string;
  title: string;
  link?: string;
  roles?: Role[];
}
