'use client';

import { useState } from 'react';
import axios from 'axios';

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
      // Имитируем отправку на бэкенд согласно ТЗ
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
}
  };

  return (
    <div className="border border-[#E4E7EC] rounded-2xl p-6 bg-white max-w-[448px] w-full">
      <h3 className="text-xl font-semibold text-[#101828]">Book your campervan now</h3>
      <p className="text-sm text-[#475467] mt-2 mb-6">Stay connected, attentive and mobile</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name*"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-[#F7F9FC] border border-transparent rounded-xl text-base text-[#101828] focus:outline-none focus:border-[#E44848] transition-all"
        />
        <input
          type="email"
          placeholder="Email*"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-[#F7F9FC] border border-transparent rounded-xl text-base text-[#101828] focus:outline-none focus:border-[#E44848] transition-all"
        />
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 bg-[#F7F9FC] border border-transparent rounded-xl text-base text-[#101828] focus:outline-none focus:border-[#E44848] transition-all"
        />
        <textarea
          placeholder="Comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 bg-[#F7F9FC] border border-transparent rounded-xl text-base text-[#101828] focus:outline-none focus:border-[#E44848] transition-all resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-4 bg-[#E44848] text-white font-semibold text-base rounded-full hover:bg-[#cf3e3e] transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}