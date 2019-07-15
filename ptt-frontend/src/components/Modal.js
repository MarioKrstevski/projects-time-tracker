
import React, {useState} from 'react';
import MutationWrappedUpdateForm from './MutationWrappedUpdateForm';

export default function Modal({refetch}) {
    
    const [isOpen, setIsOpen] = useState(false);
    

    if(isOpen){
        return <MutationWrappedUpdateForm />
    }

    return <div></div>
  }