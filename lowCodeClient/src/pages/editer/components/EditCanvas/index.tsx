import "./index.less";
import { useDrop } from 'react-dnd';
var uuid = require('uuid');
import { connect, useDispatch} from 'umi';
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import CreativeEngine from '@/core/CreativeEngine';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
function EditCanvas(props:any) {
  const { accepts, canvasId, editData, setDragState, editSize, dragState, dragStop,onDragStart, onResizeStop} = props;
  const { sizeX, sizeY } = editSize;
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: accepts,
    drop: (item:any, monitor:any) => {
      let parentDiv = document.getElementById(canvasId),
        pointRect = parentDiv!.getBoundingClientRect(),
        top = pointRect.top,
        pointEnd = monitor.getSourceClientOffset(),
        y = pointEnd!.y < top ? 0 : pointEnd!.y - top,
        col = 24, // 网格列数
        cellHeight = 2,
        w = item.col || col;
        // 转换成网格规则的坐标和大小
        let gridY = Math.ceil(y / cellHeight);
      dispatch({
        type: 'Edit/addEditData',
        payload: {
            id: uuid.v1(),
            ...item,
            point: { i: `x-${editData.length}`, x: 0, y: gridY, w, h: item.h, isBounded: true, isDraggable: true, isResizable:true }
        }
      })
    },
    collect: (monitor:any) => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <Draggable
      position={ dragState }
      handle=".js_box"
      onStop={(e: any, data: any) => {
        setDragState({ x: data.x, y: data.y });
      }}
    >
    <div ref = { drop } id={canvasId} className = "editWrapper" style={{width:sizeX, minHeight:sizeY, transform:'scale(0.5)' } }>
       {editData.length > 0 ? (
        <GridLayout  className="layout"
          isDraggable = { true }
          isResizable= { true }
          isBounded={true}
          cols={24}
          rowHeight={2}
          width={sizeX}
          margin={[0, 0]}
          onDragStop={dragStop}
          onDragStart={onDragStart}
          onResizeStop={onResizeStop}
          >
          { editData.map((cur:any, index:number) => (
            <div key={cur.id} data-grid={cur.point} >
              <CreativeEngine   {...cur }> </CreativeEngine>
            </div>
          ))}
          </GridLayout >
       ) : ''}
    </div>
    </Draggable>
  )
}

export default connect((state:any) => ({
  editData: state.Edit.editData
}), ()=>({

}))(EditCanvas);