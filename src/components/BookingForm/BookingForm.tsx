'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://campers-api.goit.study/campers', {
        camperId,
        name,
        email,
        date,
        comment,
      });
      alert('⚡ Booking successful! Your dynamic rental request has been registered.');
      setName('');
      setEmail('');
      setDate('');
      setComment('');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>Stay connected, attentive and mobile</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name*"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email*"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.textarea}
        />
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}