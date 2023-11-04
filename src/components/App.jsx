import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { getContactsFromLS, setContactsToLS } from 'services/localStorage';

import { GlobalStyle } from './GlobalStyle';
import { AppWrapper } from './App.styled';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(getContactsFromLS);

  useEffect(() => {
    setContactsToLS(contacts);
  }, [contacts]);

  const updateFilter = value => {
    setFilter(value);
  };

  const addContact = data => {
    const formattedName = data.name.toLowerCase();
    const isAlreadyAdded = contacts.some(
      ({ name }) => name.toLowerCase() === formattedName
    );

    if (isAlreadyAdded) {
      alert(`${data.name} is already in contacts.`);
      return isAlreadyAdded;
    }

    const newContact = { ...data, id: nanoid() };
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
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
    <AppWrapper>
      <GlobalStyle />

      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} filterInfo={filterInfo} onChange={updateFilter} />
      <ContactList contacts={filteredContacts} onClick={deleteContact} />
    </AppWrapper>
  );
};
