import { useState } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Label, Property, Input, Submit } from './Form.styled';

export default function ContactForm({ addContact }) {
  // state = {
  //   name: '',
  //   number: '',
  // };
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const handleNumberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const submitForm = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setName('');
    setNumber('');
    addContact(newContact);
  };

  return (
    <>
      <Form onSubmit={submitForm}>
        <Label>
          <Property>Name</Property>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleNameChange}
          ></Input>
        </Label>
        <Label>
          <Property>Number</Property>
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleNumberChange}
          ></Input>
        </Label>
        <Submit type="submit">Add contact</Submit>
      </Form>
    </>
  );
}

ContactForm.propTypes = {
  addContact: propTypes.func.isRequired,
};
