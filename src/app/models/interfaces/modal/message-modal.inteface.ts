import { MessageModalType } from '@models/enums/message-modal-type.enum';

export interface IMessageModal {
  title?: string;
  message?: string;
  type: MessageModalType;
  buttonsNames?: {
    approve?: string;
    decline?: string;
  };
  submitHandler?: any;
}
