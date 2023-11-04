const LS_KEY = 'contacts';

export const getContactsFromLS = () => {
  const contacts = JSON.parse(localStorage.getItem(LS_KEY));
  if (contacts) {
    return contacts;
  }
};

export const setContactsToLS = contacts => {
  localStorage.setItem(LS_KEY, JSON.stringify(contacts));
};
