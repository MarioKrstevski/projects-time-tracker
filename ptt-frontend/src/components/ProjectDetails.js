import React, {useRef, useState} from 'react';
import Project from './Project';

export default function ProjectDetails(props){

    const textInputValue = useRef(null);
    const {project} = props.location.state;

    const addTimeToProject = () => {
        textInputValue.current.focus();
        // props.addTime(props.name,{dateRegistered: new Date() , duration: parseInt(textInput.current.value)});
        if( textInputValue.current.value != ''){
            setTimeEntries([...timeEntries, {dateRegistered: new Date(), duration:parseInt(textInputValue.current.value)}]);
            console.log({timeEntries});
            textInputValue.current.value = '';


            // props.location.state.addTime(project.projectName, {dateRegistered: new Date(), duration:parseInt(textInputValue.current.value)} );
        }
    };

  

    const [timeEntries,setTimeEntries] = useState(project.time)
    
    const allTimeEntries = timeEntries.map( (timeEntry,index) => {

        let {dateRegistered,duration}= timeEntry;
        
        return (
            <div key={index} children={` Date: ${dateRegistered}, Time: ${duration} `}/>
        )
    })
    console.log(props.location)


    return <div > 
    <h1>{project.name}</h1>
    <p>{project.description}</p>  
    {console.log(project)}
    <p> Total Hours: { project.time.reduce((acc, current)=> acc + current.duration, 0)/3600}</p>
    {console.log({allTimeEntries})}
    {allTimeEntries}
    
    <div> 
        <input type='number' ref={textInputValue}></input>
        <button onClick={addTimeToProject}>Add time</button>
    </div>
    </div>
}