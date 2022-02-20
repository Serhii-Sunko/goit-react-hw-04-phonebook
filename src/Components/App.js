import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import { v4 as uuid } from 'uuid';
import Container from './Container/Container';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactData = localStorage.getItem('contacts');
    if (contactData && contactData.length > 0) {
      setContacts([...JSON.parse(contactData)]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const id = uuid();
    const { name } = contact;

    if (contacts.filter(contact => contact.name === name).length > 0) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, { id, ...contact }]);
  };

  const deleteItem = id => {
    setContacts(prevState => [...prevState.filter(item => item.id !== id)]);
  };

  const onFilterChange = e => {
    const filter = e.target.value;
    setFilter(filter.toLowerCase());
  };

  const getFilteredContacts = () =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));

  return (
    <>
      <Container title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Container>
      <Container title="Contacts">
        <ContactFilter onChange={onFilterChange} />

        <ContactList onDelete={deleteItem} items={getFilteredContacts()} />
      </Container>
    </>
  );
};
export default App;
