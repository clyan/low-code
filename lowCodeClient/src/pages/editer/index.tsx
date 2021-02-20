import { Layout, Button } from 'antd';
import { connect, useDispatch, history } from 'umi';
import { useState, memo, useMemo, useEffect, useRef } from 'react';
import ComponentList from './components/ComponentList';
import Logo from './components/Logo';
import User from './components/User';
import Ajust from './components/Ajust';
import EditCanvas from './components/EditCanvas';
import ToolBar from './components/ToolBar';
import { HTML5Backend  } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
const { Header, Content} = Layout;
import componentTemplates from '@/components/template';
import componentSchemas from '@/components/schema';
import "./index.less";

function throttle(fn: Function, delay: number) {
    let flag = true;
    return (...args: any) => {
      if (flag) {
        flag = false;
        fn(...args);
        setTimeout(() => {
          flag = true;
        }, delay);
      }
    };
}

const  IndexPage = (props:any) => {
  let canvasId = 'editer';
  const dispatch = useDispatch();
  const  { currentEditData, editSize, editData, revocationData } = props;
  const defaultValues = currentEditData ? currentEditData.defaultConfigs : {};
  const config = currentEditData ? currentEditData.editData : [];
  const [leftCollapsed, setLeftCollapsed] = useState(true);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accepts = useMemo( () => (componentTemplates.map((i:any) => {
      return i.type;
  })), [componentTemplates]);
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });

  const mousedownfn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          move: true,
        });
      }
    };
  }, []);

  const mousemovefn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffmove.move) {
        let diffx: number;
        let diffy: number;
        const newX = e.clientX;
        const newY = e.clientY;
        diffx = newX - diffmove.start.x;
        diffy = newY - diffmove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY,
          },
          move: true,
        });
        setDragState(prev => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy,
          };
        });
      }
    };
  }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  const mouseupfn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false,
      });
    };
  }, []);

  const onwheelFn = useMemo(() => {
    return (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY < 0) {
        setDragState(prev => ({
          x: prev.x,
          y: prev.y + 40,
        }));
      } else {
        setDragState(prev => ({
          x: prev.x,
          y: prev.y - 40,
        }));
      }
    };
  }, []);

  const onDragStart = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const currentEditData = editData.filter(item => item.id === newItem.i)[0];
      dispatch({
        type: 'Edit/updateEditData',
        payload: { ...currentEditData },
      });
    };
  }, [dispatch, editData, currentEditData, defaultValues]);

  const dragStop = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = editData.filter(item => item.id === newItem.i)[0];
      // dispatch({
      //   type: 'editorModal/updateEditData',
      //   payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      // });
    };
  }, [dispatch, editData]);

  const onResizeStop = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = editData.filter(item => item.id === newItem.i)[0];
      // dispatch({
      //   type: 'Edit/updateEditData',
      //   payload: { ...curPointData, point: newItem},
      // });
    };
  }, [dispatch, editData]);

  useEffect(() => {
    if (diffmove.move && containerRef.current) {
      containerRef.current.style.cursor = 'move';
    } else {
      containerRef.current!.style.cursor = 'default';
    }
  }, [diffmove.move]);

  const [dragState, setDragState] = useState({ x: 360, y: 100 });

  return (<DndProvider backend={ HTML5Backend }>
        <Layout className="container">
            <Header className = "header">
                <nav className = "navBar">
                    <Logo></Logo>
                    <ToolBar editSize= { editSize } editData = { editData } revocationData= { revocationData }></ToolBar>
                    <User></User>
                </nav>
            </Header>
            <Layout className="content-wrapper">
                <aside className="leftSider" style={{
                        flexBasis: leftCollapsed ? '300px': '0px',
                        transition: 'all ease-in-out 0.5s'
                    }}>
                    <div className='leftCollapsedIcon' onClick={ ()=> {setLeftCollapsed(!leftCollapsed)}}> &lt; </div>
                    { leftCollapsed  && <ComponentList setRightCollapsed={ setRightCollapsed } componentSchemas= { componentSchemas } componentTemplates= { componentTemplates } canvasId={ canvasId }></ComponentList>}
                </aside>

                <Content className = "content"> 
                {/* <div className='watermaker'>
                        有手就行组</div> */}
                    <div  ref={containerRef} 
                            className = "editCanvasWrapper"
                            onMouseDown={mousedownfn}
                            onMouseMove={throttle(mousemovefn, 500)}
                            onMouseUp={mouseupfn}
                            onMouseLeave={mouseupfn}
                            onWheel={onwheelFn} style= { { minHeight: '100%' }}>
                        {accepts.length > 0 && 
                        <EditCanvas
                            dragStop={dragStop}
                            onDragStart={onDragStart}
                            onResizeStop={onResizeStop}
                            dragState = { dragState } 
                            setDragState= { setDragState } 
                            editSize= { editSize }
                            accepts = { accepts } 
                            canvasId= { canvasId }>
                        </EditCanvas>
                        }

                    </div>
                </Content>
                
                <aside className="rightSider" style={{
                        flexBasis: rightCollapsed ?  '300px': '0px',
                        // transition: 'all ease-in-out 0.5s',
                    }}>
                      <div className='rightCollapsedIcon'  onClick={ ()=> {setRightCollapsed(!rightCollapsed)}}> &gt; </div>
                     { rightCollapsed ? <Ajust config = {config} defaultValues={defaultValues} currentEditData={currentEditData}></Ajust> : ''}
                </aside>

            </Layout>
    </Layout>
  </DndProvider>
  );
}

const mapStatetoprops = (state:any) => ({
  componentList: state.Component.componentList,
  currentEditData: state.Edit.currentEditData,
  editSize: state.Edit.editSize,
  editData: state.Edit.editData,
  revocationData: state.Edit.revocationData,
});



export default connect(mapStatetoprops)(IndexPage);