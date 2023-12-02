const storageKey = 'contacts';

export const getInitialContacts = () => {
  return JSON.parse(localStorage.getItem(storageKey)) ?? [];
};

export const saveContacts = contacts => {
  localStorage.setItem(storageKey, JSON.stringify(contacts));
};
