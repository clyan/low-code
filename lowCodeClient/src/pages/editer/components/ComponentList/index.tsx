import "./index.less";
import { useDrag, useDrop , DropTarget } from 'react-dnd';
import { connect } from 'umi';
const ComponentList =  (props: any) => {
  const { componentSchemas, componentTemplates, setRightCollapsed  ,currentDrag, setCurrentDrag } = props;
  const  getDrag = (name:any, h: number) => {
    let [collectedProps, drag]  =  useDrag({
      item: {
        type: name,
        editData: componentSchemas[name].editData,
        h,
        defaultConfigs: componentSchemas[name].defaultConfigs,
      },
      begin(monitor) {
         
      },
      end(item, monitor) {
        setRightCollapsed(true);
      }
    });
    return drag;
  }
  return (
      <div className = "componentWrapper">
          {
            componentTemplates.map((component:any, index:number) => (
                <div ref={ getDrag(component.type, component.h) } key = { index } className="component">
                    {  component.type }
              </div>))
          }
      </div>
  )
}




export default ComponentList;