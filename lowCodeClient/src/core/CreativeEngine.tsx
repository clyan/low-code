import { dynamic } from 'umi';
import React, { FC , useMemo, memo} from 'react';

const CreativeFunc = (type:any) => {
  return dynamic({
    loader: async function() {
      let Component: FC<{}>;
      const { default: Graph } = await require(/* webpackChunkName: "Dynamic_Component" */`@/components/${type}`);
      Component = Graph;
      return (props:any)=> {
        const { defaultConfigs } = props;
        return <Component {...defaultConfigs} />
      };
    }
  });
};
const CreativeEngine = memo((props:any) => {
  const { type, config} = props;
  const Dynamic = useMemo(() => {
    return (CreativeFunc(type) as unknown) as FC<{}>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return <Dynamic {...props} />;
});

export default CreativeEngine;
