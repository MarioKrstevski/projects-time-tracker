import React from 'react';
import MutationWrappedUpdateForm from './MutationWrappedUpdateForm';

export default function Modal({ refetch, selectedProject, isOpen, modalInteraction}) {

    console.log('Selected: ', selectedProject )
  if (isOpen) {
    return (
      <div>
        <MutationWrappedUpdateForm refetch={refetch} selectedProject={selectedProject}/>
        <button onClick={()=>modalInteraction.closeModal()}>Close Modal</button>
      </div>
    );
  }

  return <div />;
}
