import React from 'react';
import MutationWrappedUpdateForm from './MutationWrappedUpdateForm';

import { ModalContaienr} from './styled-components';

export default function Modal({ refetch, selectedProject, isOpen, modalInteraction}) {

    // console.log('Selected: ', selectedProject )
  if (isOpen) {
    return (
      <ModalContaienr>
        <MutationWrappedUpdateForm refetch={refetch} selectedProject={selectedProject}/>
        <button onClick={()=>modalInteraction.closeModal()}> X  Close Modal</button>
      </ModalContaienr>
    );
  }

  return <div />;
}
