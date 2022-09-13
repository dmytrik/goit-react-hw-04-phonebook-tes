import { useState, useEffect, useMemo } from 'react';
import ContactsList from './ContactsList/ContactsList';
import ContactForm from './Form/Form';
import Filter from './Filter/Filter';
import { Title, ContactsListTitle } from './Phonebook.styled';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const searchByName = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = newContact => {
    setContacts(prevContacts => {
      let isContains = false;
      let updateContacts = [];
      prevContacts.forEach(({ name }) => {
        if (name === newContact.name) {
          alert(`${name} is already in contacts`);
          isContains = true;
        }
      });
      isContains
        ? (updateContacts = [...prevContacts])
        : (updateContacts = [...prevContacts, newContact]);
      return updateContacts;
    });
  };

  const deleteContact = e => {
    const id = e.currentTarget.dataset.id;
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const visibleContacts = useMemo(
    () =>
      contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  return (
    <>
      <Title>Phonebook</Title>
      <ContactForm addContact={addContact} />
      <ContactsListTitle>Contacts</ContactsListTitle>
      <Filter searchByName={searchByName} />
      <ContactsList phoneList={visibleContacts} deleteContact={deleteContact} />
    </>
  );
}

export default App;
