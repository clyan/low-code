import { Service } from 'egg';

export default class ComponentService extends Service {
  async ComponentList() {
    const components = await this.app.mysql.select('component');
    return components;
  }
}
