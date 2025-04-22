'use server'

import { BookingNotification } from '@/emails/BookingNotification';
import BookingReminder from '@/emails/BookingReminder';
import DepositReminder, { DepositData } from '@/emails/DepositReminder';
import {BookingRecord, CancellationReason} from '@/types';
import BookingCancellation from "@/emails/BookingCancellation";
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
        // cc: "evelynpalesa3@gmail.com",
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
      cc: "evelynpalesa3@gmail.com",
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
      cc: "evelynpalesa3@gmail.com",
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

export const sendBookingCancellationNotice = async (booking: BookingRecord, reason: string | CancellationReason,email: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Lavish Beauty | Palesa Maremane" <owner@lavish-beauty-neon.vercel.app>',
      to: email,
      cc: "evelynpalesa3@gmail.com",
      subject: 'Cancellation Notice | Lavish Beauty',
      html: BookingCancellation(booking, reason)
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: %s', error);
    return error
  }
}
