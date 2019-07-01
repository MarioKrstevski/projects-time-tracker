import React, { useRef } from 'react';

export default function Project(props) {
  const textInput = useRef(null);

  const addTime = () => {
    textInput.current.focus();
    props.addTime(props.name, { dateRegistered: new Date(), duration: parseInt(textInput.current.value) });
  };

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p> Total Hours: {props.time && props.time.reduce((acc, current) => acc + current.duration, 0) / 3600}</p>

      <div>
        <input type="number" ref={textInput} />
        <button onClick={addTime}>Add time</button>
      </div>
    </div>
  );
}
