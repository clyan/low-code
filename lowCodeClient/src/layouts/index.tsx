import EditPage from '../pages/editer/index';
import HomePage from '../pages/index';
import './index.less';
function LayoutPage(props:any) {
  return (
    <>
      { props.children }
    </>
  );
}
export default LayoutPage