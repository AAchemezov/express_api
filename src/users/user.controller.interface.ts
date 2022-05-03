import { IControllerRoute } from '../common/route.interface';
import { BaseController } from '../common/base.controller';

export interface IUserController extends BaseController {
	login: IControllerRoute['func'];

	register: IControllerRoute['func'];
}
