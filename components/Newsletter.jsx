import React, { useRef, useState } from 'react';

const Newsletter = () => {
  const inputEl = useRef(null);
  const [message, setMessage] = useState('');

   const subscribe = async (e) => {
    e.preventDefault();
 
    try {
      const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
      return;
    }
    
    inputEl.current.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-6 font-semibold border-b pb-4">Subscribe to the newsletter </h3>
      <p className="text-lg font-semibold"><span className="text-2xl font-bold text-pink-600">Bula re!</span> Thanks for visiting</p>
      <p className="mb-8">Why not follow my journey and get notified every time a new post is out.</p>
      <form onSubmit={subscribe}>
      <label htmlFor="email-input">{'Email Address'}</label>
      <input
        id="email-input"
        name="email"
        placeholder="you@awesome.com"
        ref={inputEl}
        required
        type="email"
        className="py-2 px-4 mb-3 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      />
      <div className="mb-3"> 
        {message
          ? message
          : `I'll only send emails when new content is posted. No spam.`}
      </div>
      <button type="submit" className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3">{'✨ Subscribe 💌'}</button>
    </form>
    </div>
  )
}

export default Newsletter