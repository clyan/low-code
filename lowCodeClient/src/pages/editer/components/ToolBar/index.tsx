import { Button, Input } from 'antd';
import { format } from 'prettier';
import { useState } from 'react';
import { useDispatch } from 'umi';
import './index.less'
export default function ToolBar(props: any) {
    const { editSize, editData, revocationData } = props;
    const { sizeX,  sizeY} = editSize;
    const dispatch = useDispatch();
    const [X,setX] = useState(sizeX);
    const [Y,setY] = useState(sizeY);
    const changeEditSizeX = (e:any) => {
        dispatch({
            type: 'Edit/setEditSize',
            payload: {
                sizeX: e.target.value,
                sizeY,
            }
        })
    }

    const changeEditSizeY = (e) => {
        console.log(e.target.value);
        dispatch({
            type: 'Edit/setEditSize',
            payload: {
                sizeX,
                sizeY: e.target.value
            }
        });
    }
    const revocationEditCanvas = () => {
        dispatch({
            type: 'Edit/revocationEditCanvas',
            payload: {}
        });
    }

    const recoverEditCanvas = () => {
        dispatch({
            type: 'Edit/recoverEditCanvas',
            payload: {
                
            }
        });
    }
    
    const clearEditCanvas = () => {
        dispatch({
            type: 'Edit/clearEditCanvas',
            payload: {
                
            }
        });
    }
    return (
        <div className = "toolBar">
            <Button ghost disabled = { editData.length <=  0 } onClick = { revocationEditCanvas }> 撤销 </Button>
            <Button ghost disabled = { revocationData.length <= 0 } onClick = { recoverEditCanvas }> 恢复 </Button>
            <Button ghost > 预览 </Button>
            <Button ghost onClick = { clearEditCanvas }> 清空 </Button>
            
            {/* <Input value= { X }  style= {{ width: '80px' }} onBlur={ ()=> { changeEditSizeX  } } /> 
            <span style= {{ padding: '0 5px',color: '#fff', fontSize: '18px' }}>*</span>
            <Input value= { Y } style= {{ width: '80px' }} onBlur={ ()=> { changeEditSizeY  } }/> */}
        </div>
    );
}