import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import { ContactAdd } from './ContactAdd/ContactAdd';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { GlobalStyle } from './GlobalStyle';
import { Layout, PageTitle, Title } from './App.styled';

import { getInitialContacts, saveContacts } from 'services/localStorage';

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const updateFilter = value => {
    setFilter(value);
  };

  const addContact = contact => {
    const formattedName = contact.name.toLowerCase();
    const isExist = contacts.some(
      ({ name }) => name.toLowerCase() === formattedName
    );

    if (isExist) {
      toast.error(`${contact.name} is already in contacts.`);
      return isExist;
    }

    const newContact = { ...contact, id: nanoid() };
    setContacts(prevState => [...prevState, newContact]);
    toast.success('Contact successfully added');
  };

  const updateContact = newContact => {
    setContacts(prevState =>
      prevState.map(contact =>
        contact.id === newContact.id ? newContact : contact
      )
    );
    toast.success('Contact successfully updated');
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
    toast.success('Contact successfully deleted');
  };

  const filterContacts = () => {
    const formattedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(formattedFilter)
    );
  };

  const filteredContacts = filterContacts();
  const results = filteredContacts.length;

  let filterInfo = '';
  if (!results && !filter) filterInfo = <p>Your contact list is empty</p>;
  if (!results && filter) filterInfo = <p>Not Finded</p>;

  return (
    <Layout>
      <GlobalStyle />
      <Toaster toastOptions={{ duration: 1500 }} />

      <PageTitle>Phonebook</PageTitle>
      <Title>Contacts</Title>
      {contacts.length > 0 && (
        <Filter filter={filter} onUpdate={updateFilter} />
      )}
      {filteredContacts.length ? (
        <ContactList
          contacts={filteredContacts}
          onUpdate={updateContact}
          onDelete={deleteContact}
        />
      ) : (
        filterInfo
      )}
      <ContactAdd onAdd={addContact} />
    </Layout>
  );
};
