import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false)

  const url = '/api/newsletter';

  const subscribe = async (e) => {
    e.preventDefault();

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      setSubscribed(true);
      return res.json();
    })
    .catch(error => {
      setErrorMessage(error.message);
    })
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-6 font-semibold border-b pb-4">Subscribe to the newsletter </h3>
      <p className="text-lg font-semibold"><span className="text-2xl font-bold text-pink-600">Bula re!</span> Thanks for visiting</p>
      <p className="mb-8">Why not follow my journey and get notified every time a new post is out.</p>
      <form onSubmit={subscribe}>
        <label htmlFor="email-input">Email Address:</label>
        <input
          id="email-input"
          name="email"
          placeholder="you@awesome.com*"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="py-2 px-4 mb-3 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <button type="submit" className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3">{'✨ Subscribe 💌'}</button>
        <div className=" mt-2 text-sm text-gray-600"> 
          {
            errorMessage
            ? <p><span className="text-red-500">{errorMessage}</span> Oh no! Sorry about that. Email me at keluburotu@gmail.com and I'll add you to the list.</p>
            : subscribed
            ? <p className="text-green-500">{`Success - ${email} is subscribed to Vulavula Dre!`}</p>
            : <p>*I'll only send emails when new content is posted. No spam.</p>
          }
        </div>
      </form>
    </div>
  )
}

export default Newsletter

