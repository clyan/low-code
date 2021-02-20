import React, { memo } from 'react';

const Text = (props: any) => {
  const {
    imgUrl,
    round
  } = props;
  console.log('round',round)
  return (
     <>
       <img  src={ imgUrl } style={ {
         borderRadius: round + 'px',
         width: '100%'
       } } />
     </>
  );
}
export default Text;
