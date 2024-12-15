'use server'

import { BookingNotification } from '@/emails/BookingNotification';
import BookingReminder from '@/emails/BookingReminder';
import DepositReminder, { DepositData } from '@/emails/DepositReminder';
import { BookingRecord } from '@/types';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "karabosambo.prime@gmail.com",
    pass: "qaxcdwcyavcjbabz",
  },
});

export const sendNotification = async (booking: BookingRecord) => {
    try {
      const info = await transporter.sendMail({
        from: '"Lavish Beauty | Palesa Maremane" <owner@lavish-beauty-neon.vercel.app>',
        to: booking.customer.email,
        subject: 'Appointment Reserved | Lavish Beauty',
        html: BookingNotification(booking)
      });

      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email: %s', error);
      return error
    }
}

export const sendBookingReminder = async (booking: BookingRecord) => {
  try {
    const info = await transporter.sendMail({
      from: '"Lavish Beauty | Palesa Maremane" <owner@lavish-beauty-neon.vercel.app>',
      to: booking.customer.email,
      subject: 'Appointment Reminder | Lavish Beauty',
      html: BookingReminder(booking)
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: %s', error);
    return error
  }
}

export const sendDepositReminder = async (data: DepositData, email: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Lavish Beauty | Palesa Maremane" <owner@lavish-beauty-neon.vercel.app>',
      to: email,
      subject: 'Deposit Reminder | Lavish Beauty',
      html: DepositReminder(data)
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: %s', error);
    return error
  }
}