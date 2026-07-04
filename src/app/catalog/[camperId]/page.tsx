'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { fetchCamperById, createBooking } from '@/lib/api';

type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  gallery: string[];
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC?: boolean;
  kitchen?: boolean;
  radio?: boolean;
  bathroom?: boolean;
  reviews?: { reviewer_name: string; reviewer_rating: number; comment: string; }[];
};

export default function CamperDetailsPage() {
  const { camperId } = useParams<{ camperId: string }>();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  
 
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  const [form, setForm] = useState({ name: '', email: '', date: '', comment: '' });
  const [errors, setErrors] = useState({ name: '', email: '', comment: '' });

  useEffect(() => {
    const getCamper = async () => {
      try {
        const data = await fetchCamperById(camperId);
        setCamper(data);
      } catch (err) {
        console.error('Error fetching camper:', err);
      } finally {
        setLoading(false);
      }
    };
    getCamper();
  }, [camperId]);

  const validateForm = () => {
    const newErrors = { name: '', email: '', comment: '' };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your full name.';
      isValid = false;
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!form.comment.trim()) {
      newErrors.comment = 'Comment is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBooking = async () => {
    if (!validateForm()) return;

    try {
      await createBooking({
        name: form.name,
        email: form.email,
        date: form.date,
        comment: form.comment
      });
      alert('Booking successful!');
      setForm({ name: '', email: '', date: '', comment: '' });
      setErrors({ name: '', email: '', comment: '' });
    } catch  {
      alert('Booking failed. Please try again.');
    }
  };


  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={'text-lg ' + (star <= Math.round(rating) ? 'text-[#FFC533]' : 'text-[#E4E7EC]')}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  
  const formatForm = (formType: string) => {
    const forms: Record<string, string> = {
      panelTruck: 'Panel truck',
      fullyIntegrated: 'Fully integrated',
      alcove: 'Alcove',
    };
    return forms[formType] || formType;
  };

  if (loading) return <div className="p-10 text-center text-lg font-medium text-[#475467]">Loading camper info...</div>;
  if (!camper) return <div className="p-10 text-center text-red-500 font-medium">Camper not found</div>;

  return (<div className="max-w-[1440px] mx-auto px-16 py-12 flex flex-col gap-8">
      
      <div>
        <h1 className="text-3xl font-semibold text-[#101828] mb-2">{camper.name}</h1>
        <div className="flex gap-4 text-sm text-[#101828] items-center">
          <div className="flex items-center gap-1">
            {renderStars(camper.rating)}
            <span className="underline ml-1">({camper.reviews?.length || 0} Reviews)</span>
          </div>
          <span className="flex items-center gap-1">📍 {camper.location}</span>
        </div>
        <p className="text-2xl font-semibold text-[#101828] mt-4">€{camper.price.toFixed(2)}</p>
      </div>

   
      <div className="w-full max-w-[800px]">
        
        <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Thumbs]}
          className="w-full h-[480px] rounded-2xl mb-4 shadow-sm"
        >
          {camper.gallery?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <Image 
                  src={img} 
                  alt={`${camper.name} view ${idx + 1}`} 
                  fill 
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={16}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full h-[96px]"
        >
          {camper.gallery?.map((img, idx) => (
            <SwiperSlide key={idx} className="cursor-pointer overflow-hidden rounded-xl">
              <div className="relative w-full h-full border-2 border-transparent hover:border-[#E44848] transition active-thumb">
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className="text-[#475467] leading-relaxed max-w-[1024px]">{camper.description}</p>

    
      <section className="border-b border-[#DADDE1] flex gap-10">
        <button 
          onClick={() => setActiveTab('features')}
          className={'pb-5 text-xl font-semibold transition ' + (activeTab === 'features' ? 'border-b-4 border-[#E44848] text-[#101828]' : 'text-[#475467]')}
        >
          Features
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={'pb-5 text-xl font-semibold transition ' + (activeTab === 'reviews' ? 'border-b-4 border-[#E44848] text-[#101828]' : 'text-[#475467]')}
        >
          Reviews
        </button>
      </section>

     
      <div className="flex gap-16 items-start">
        
       
        <div className="flex-1">
          {activeTab === 'features' ? (
            <div className="bg-[#F7F7F7] p-6 rounded-2xl flex flex-col gap-10">
              
              
              <div className="flex flex-wrap gap-2">
                <span className="capitalize bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] border border-[#EAEAEA] shadow-sm">⚙️ {camper.transmission}</span>
                <span className="capitalize bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] border border-[#EAEAEA] shadow-sm">⛽️ {camper.engine}</span>
            {camper.AC && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] border border-[#EAEAEA] shadow-sm">💨 AC</span>}
                {camper.kitchen && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] border border-[#EAEAEA] shadow-sm">🍳 Kitchen</span>}
                {camper.radio && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] border border-[#EAEAEA] shadow-sm">📻 Radio</span>}
                {camper.bathroom && <span className="bg-white px-4 py-3 rounded-full text-sm font-medium text-[#101828] border border-[#EAEAEA] shadow-sm">🚿 Bathroom</span>}
              </div>

              
              <div>
                <h3 className="text-xl font-semibold text-[#101828] border-b border-[#DADDE1] pb-6 mb-6">Vehicle details</h3>
                <table className="w-full text-sm font-medium text-[#101828]">
                  <tbody>
                    <tr className="flex justify-between py-3">
                      <td className="text-[#475467]">Form</td>
                      <td>{formatForm(camper.form)}</td>
                    </tr>
                    <tr className="flex justify-between py-3">
                      <td className="text-[#475467]">Length</td>
                      <td>{camper.length}</td>
                    </tr>
                    <tr className="flex justify-between py-3">
                      <td className="text-[#475467]">Width</td>
                      <td>{camper.width}</td>
                    </tr>
                    <tr className="flex justify-between py-3">
                      <td className="text-[#475467]">Height</td>
                      <td>{camper.height}</td>
                    </tr>
                    <tr className="flex justify-between py-3">
                      <td className="text-[#475467]">Tank</td>
                      <td>{camper.tank}</td>
                    </tr>
                    <tr className="flex justify-between py-3">
                      <td className="text-[#475467]">Consumption</td>
                      <td>{camper.consumption}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
         
            <div className="flex flex-col gap-6">
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((r, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F2F4F7] text-[#E44848] rounded-full flex items-center justify-center text-xl font-bold">
                        {r.reviewer_name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-[#101828]">{r.reviewer_name}</p>
                        {renderStars(r.reviewer_rating)}
                      </div>
                    </div>
                    <p className="text-[#475467] text-sm leading-relaxed pl-16">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-[#475467]">No reviews available for this camper yet.</p>
              )}
            </div>
          )}
        </div>

        
        <div className="w-[448px] border border-[#DADDE1] p-6 rounded-2xl flex flex-col gap-4 bg-white shadow-sm shrink-0">
          <h2 className="text-xl font-semibold text-[#101828]">Book your campervan now</h2>
          <p className="text-sm text-[#475467] mb-2">Stay connected! We are always ready to help you.</p><div className="flex flex-col gap-1">
            <input
              placeholder="Name*"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={'w-full h-14 rounded-xl bg-[#F7F7F7] px-5 outline-none border text-[#101828] transition ' + (errors.name ? 'border-[#E44848] bg-red-50/50' : 'border-transparent focus:border-[#DADDE1]')}
            />
            {errors.name && <span className="text-xs text-[#E44848] px-1">{errors.name}</span>}
          </div>

         
          <div className="flex flex-col gap-1">
            <input
              placeholder="Email*"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={'w-full h-14 rounded-xl bg-[#F7F7F7] px-5 outline-none border text-[#101828] transition ' + (errors.email ? 'border-[#E44848] bg-red-50/50' : 'border-transparent focus:border-[#DADDE1]')}
            />
            {errors.email && <span className="text-xs text-[#E44848] px-1">{errors.email}</span>}
          </div>

         
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full h-14 rounded-xl bg-[#F7F7F7] px-5 outline-none border border-transparent focus:border-[#DADDE1] text-[#101828]"
          />

          
          <div className="flex flex-col gap-1">
            <textarea
              placeholder="Comment*"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className={'w-full h-28 rounded-xl bg-[#F7F7F7] p-5 outline-none border text-[#101828] transition resize-none ' + (errors.comment ? 'border-[#E44848] bg-red-50/50' : 'border-transparent focus:border-[#DADDE1]')}
            />
            {errors.comment && <span className="text-xs text-[#E44848] px-1">{errors.comment}</span>}
          </div>

          <button 
            onClick={handleBooking} 
            className="w-[160px] h-14 bg-[#829181] text-white font-medium rounded-full hover:bg-[#6d7b6c] transition self-start mt-2 shadow-sm"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}