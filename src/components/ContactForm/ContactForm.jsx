import { useState } from 'react';
import { Button, Form, Input, Label } from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        throw new Error('Unsupported form field');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isAlreadyAdded = onSubmit({ name, number });
    if (!isAlreadyAdded) reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <Label htmlFor="number">Number</Label>
        <Input
          type="tel"
          id="number"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />

        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};
