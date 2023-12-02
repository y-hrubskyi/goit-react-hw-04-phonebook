import { useState } from 'react';

import { ModalBase } from 'components/ModalBase/ModalBase';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Button } from 'components/ContactForm/ContactForm.styled';
import { FormWrapper } from './ContactAdd.styled';

export const ContactAdd = ({ onAdd }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(prevState => !prevState);
  };

  const handleSubmit = values => {
    const isAlreadyAdded = onAdd(values);
    if (!isAlreadyAdded) {
      toggleModal();
    }
  };

  return (
    <FormWrapper>
      <Button type="button" onClick={toggleModal}>
        ➕ Add new contact
      </Button>
      <ModalBase isOpen={modalIsOpen} onClose={toggleModal}>
        <ContactForm
          contact={{ name: '', number: '' }}
          action="Add contact"
          onSubmit={handleSubmit}
        />
      </ModalBase>
    </FormWrapper>
  );
};
