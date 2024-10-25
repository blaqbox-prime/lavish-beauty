# Makeup Artist Booking Website

A booking website for a makeup artist, allowing clients to view services, book sessions, make payments, and receive email notifications. Admins can manage services, availability, and bookings through a dashboard.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Requirements](#requirements)
- [User Stories](#user-stories)
- [Architecture](#architecture)
- [Project Setup](#project-setup)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Development Process](#development-process)
- [Deployment and CI/CD](#deployment-and-cicd)
- [Monitoring and Analytics](#monitoring-and-analytics)

---

## Project Overview

This project aims to create an interactive platform for clients to book makeup sessions and services. The website includes:
- Service browsing with detailed descriptions and prices.
- Booking functionality with date and time selection.
- Integrated payment processing.
- Automated email notifications for bookings.
- Admin dashboard for the artist to manage bookings and services.

---

## Requirements

### Functional Requirements
1. **Service Listing**: The website should display available makeup services with descriptions, pricing, and booking options.
2. **Booking System**: Clients should be able to select a service, date, and time, and complete the booking.
3. **Online Payments**: Payments are processed through an integrated payment provider (Stripe).
4. **Email Notifications**: Automated emails are sent to clients upon booking confirmation and as reminders.
5. **Admin Panel**: Allows the artist to manage services, view bookings, and update availability.

### Non-Functional Requirements
1. **Performance**: The website should be optimized for speed, including lazy loading and code-splitting.
2. **Accessibility**: Ensure compliance with WCAG guidelines for an accessible experience.
3. **SEO and Analytics**: Implement SEO best practices and integrate analytics for traffic monitoring.

---

## User Stories

### Client-Facing
1. **As a client**, I want to browse makeup services and prices so I can choose a service that fits my needs.
2. **As a client**, I want to select a date and time for a makeup session and book it to secure my spot.
3. **As a client**, I want to pay online to confirm my appointment.
4. **As a client**, I want to receive an email confirmation with booking details for verification.

### Admin-Facing
1. **As an admin**, I want to manage my service offerings and availability.
2. **As an admin**, I want to view upcoming bookings to prepare for my appointments.
3. **As an admin**, I want to edit my availability for certain dates and times.

---

## Architecture

### Tech Stack
- **Frontend**: Next.js with SSR (Server-Side Rendering) for faster loading and SEO.
- **Backend**: Next.js API routes for handling data transactions (bookings, payments).
- **Database**: Supabase (PostgreSQL) for storing user, booking, and service data.
- **Authentication**: NextAuth.js for client login and session management.
- **Email Service**: Nodemailer for automated email notifications.

### Data Flow
1. **Frontend**: Handles client interactions and displays available services and booking forms.
2. **API Routes**: Receives booking and payment requests, confirms bookings, and sends email notifications.
3. **Database**: Stores service listings, bookings, and client data.
4. **Stripe Webhook**: Verifies and finalizes payments.

---

## Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/makeup-artist-booking.git
   cd makeup-artist-booking
