// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/base_controller';
import ExportComponent from '../../../app/controller/component';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    component: ExportComponent;
    home: ExportHome;
  }
}
