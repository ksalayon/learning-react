import React from 'react';

export default function Square (props) {
  return (
    <button className={(props.win) ? 'win square' : ((props.current) ? 'current square' : 'square')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
