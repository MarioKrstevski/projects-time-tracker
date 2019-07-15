import React, { useRef } from 'react';
import { Link } from '@reach/router';

export default function Project(props) {
  const textInput = useRef(null);

  return (
    <div>
      <Link to={'project/' + props.name.toLowerCase()}>
        <h2>{props.name}</h2>
      </Link>
      <p>{props.description}</p>
      <p> Total Hours: {props.time && props.time.reduce((acc, current) => acc + current.duration, 0) / 3600}</p>

      <div>
        <input type="number" ref={textInput} />
        <button>Add time</button>
      </div>
    </div>
  );
}
