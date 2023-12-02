import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { ContactEditor } from 'components/ContactEditor/ContactEditor';
import { ContactWrapper, ContactData, Button } from './ContactItem.styled';

export const ContactItem = ({ contact, onUpdate, onDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(prevState => !prevState);
  };

  return (
    <li>
      <ContactWrapper>
        <ContactData>
          {contact.name}: {contact.number}
        </ContactData>
        <div>
          <Button type="button" onClick={toggleModal}>
            <MdEdit size={22} />
          </Button>{' '}
          <Button type="button" onClick={() => onDelete(contact.id)}>
            <MdDelete size={22} />
          </Button>
        </div>
      </ContactWrapper>
      <ContactEditor
        contact={contact}
        onUpdate={onUpdate}
        isOpen={modalIsOpen}
        onClose={toggleModal}
      />
    </li>
  );
};
