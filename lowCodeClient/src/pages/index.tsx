import { connect, useDispatch, history } from 'umi';
import { Button } from 'antd';
import { useState, memo, useMemo, useEffect, useRef, Component } from 'react';
import "./index.less";
class HomePage extends Component {
  state = {
    count: 0,

  }
  componentDidMount() {
  // this.setState({
  //   count: 1
  // }, () => {
  //   console.log(this.state.count) //1
  // })
  // console.log(this.state.count) // 0



  // this.setState({
  //   count: this.state.count + 1
  // }, () => {
  //    console.log(this.state.count) //1
  // })
  // this.setState({
  //   count: this.state.count + 1
  // }, () => {
  //    console.log(this.state.count)  // 1
  // })

  this.setState(
    (preState:any)=> ({
      count:preState.count + 1
  }),()=>{
     console.log(this.state.count)
  })
  this.setState(
    (preState:any)=>({
      count:preState.count + 1
  }),()=>{
     console.log(this.state.count)
  })
  }
  render() {
    return (
      <div>
        <Button onClick= {() => {history.push('/editer');}}>编辑页面 </Button>
      </div>
    )
  }
}
// const  HomePage = (props:any) => {
//   const [state, setState] = useState({
//     count: 0
//   }) 
//   useEffect(()=> {
//   }, [])
//   return (
//     <div>
//       <Button onClick= {() => {history.push('/editer');}}>编辑页面 </Button>
//     </div>
//   )
// }



export default HomePage;

