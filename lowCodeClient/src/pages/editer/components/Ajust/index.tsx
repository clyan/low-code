import { Tabs } from 'antd';
import { useMemo } from 'react';
import { useDispatch } from 'umi';
const { TabPane } = Tabs;
import AnimationAjust from '../Ajust/AnimationAjust';
import EventAjust from '../Ajust/EventAjust';
import PropertyAjust from '../Ajust/PropertyAjust';
import "./index.less";
export default function (props:any) {
  const { config, defaultValues, currentEditData } = props;
  const dispatch = useDispatch();
  const onSave = useMemo(() => {
    return (data: any) => {
      dispatch({
        type: 'Edit/updateEditData',
        payload: { 
          ...currentEditData, defaultConfigs:{
            ...data
          }
        },
      });
    };
  }, [currentEditData, defaultValues, dispatch]);
    return (
        <div className = "ajustWrapper">
          <Tabs defaultActiveKey="1">
              <TabPane tab="属性" key="1">
                { defaultValues ? <PropertyAjust  config= { config } onSave={onSave} defaultValues = { defaultValues }></PropertyAjust>: ''}
              </TabPane>
              {/* <TabPane tab="动画" key="2">
                <AnimationAjust></AnimationAjust>
              </TabPane>
              <TabPane tab="事件" key="3">
                <EventAjust></EventAjust>
              </TabPane> */}
            </Tabs>
        </div>
    )
}