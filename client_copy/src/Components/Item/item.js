import React from "react";

import './item.scss';

export default function Item(props)  {
    return (
      <li className="item-data" id={props.item}>
        <div  >{props.item}</div>
      </li>
    );
  };
