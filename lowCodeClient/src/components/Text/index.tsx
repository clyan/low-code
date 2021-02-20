import React, { memo } from 'react';

const Text = (props: any) => {
  const { align, text, fontSize, color, lineHeight } = props;
  return (
     <div style={{ color, textAlign: align, fontSize, lineHeight }}>{ text }</div>
  );
}
export default Text;
