'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  gallery: string[];
  reviews?: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
};

export default function CamperDetailsPage() {
  const { camperId } = useParams<{ camperId: string }>();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);


  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const res = await axios.get(
          `https://campers-api.goit.study/campers/${camperId}`
        );
        setCamper(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [camperId]);

  const handleBooking = async () => {
    try {
      await axios.post('https://campers-api.goit.study/booking', {
        camperId,
        ...form,
      });

      alert('Booking successful!');
      setForm({ name: '', email: '', date: '', comment: '' });
    } catch {
  alert('Booking failed');
}
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!camper) {
    return <p className="p-10">Camper not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">

      <div>
        <h1 className="text-3xl font-bold">{camper.name}</h1>
        <p className="text-gray-500">📍 {camper.location}</p>
        <p className="text-red-500 font-semibold">€{camper.price}</p>
        <p>⭐ {camper.rating}</p>
      </div>

     
      <Swiper spaceBetween={10} slidesPerView={1}>
        {camper.gallery?.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt="camper"
              width={800}
              height={500}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    
      <p className="text-gray-700">{camper.description}</p>

     
      <div>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>

        {camper.reviews?.map((r, i) => (
          <div key={i} className="border p-3 rounded mb-2">
            <p className="font-semibold">{r.reviewer_name}</p>
            <p>⭐ {r.reviewer_rating}</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>

      <div className="border p-4 rounded flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Book this camper</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Comment"
          value={form.comment}
          onChange={(e) =>
            setForm({ ...form, comment: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={handleBooking}
          className="bg-red-500 text-white py-2 rounded"
        >
          Book now
        </button>
      </div>
    </div>
  );
}