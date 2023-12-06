import React from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ x, y, content }) => {

    // const offset = -radius - 10;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        left: x + 'px',
        top: y + 100 + 'px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
      }}
    >
      {content}
    </div>,
    document.body
  );
};

export default Tooltip;
