import BaseController from './base_controller';

export default class HomeController extends BaseController {
  public async index() {
    const { ctx } = this;
    const components = await ctx.service.component.ComponentList();
    await ctx.render('layout.html', { components });
  }
}
