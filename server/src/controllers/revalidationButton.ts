
import { PLUGIN_ID } from '../../../contants'

type ConfigProps = {
  url: string;
}


const revalidationButtonController = {
  async config(ctx: any) {
    const config: ConfigProps = await strapi.config.get(`plugin::${PLUGIN_ID}`)
    ctx.send({ config });
  },
};

export default revalidationButtonController;
