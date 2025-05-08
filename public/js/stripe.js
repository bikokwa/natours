/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QjjZxP4Nt0bqmXLbEst7gMAmztCsyukpStcqyJz9Ku5jIMxO5wXC3utXs75LM8GYVkWtXIVBRkmTgXrfHHlrsWK00qCBkZd7u'
);

export const bookTour = async tourId => {
  try {
    // Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // Create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
