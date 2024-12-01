import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Admin | Lavish Beauty",
    description: "Admin dashboard",
  };

function Dashboard() {
  return (
    <div>
      Dashboard

      <h2 role='greeting'>Welcome Back <span>Evelyn</span></h2>

    </div>
  )
}

export default Dashboard