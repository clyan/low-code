import BaseController from './base_controller';

export default class ComponentController extends BaseController {
  async components() {
    const { ctx } = this;
    const components = await ctx.service.component.ComponentList();
    const data = components.map(item => {
      return { ...item, schema: JSON.parse(item.schema) };
    });
    this.success(data);
  }
}
