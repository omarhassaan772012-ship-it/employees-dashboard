'use server';

import { redirect } from 'next/navigation';

const API_URL =
  process.env.NEXT_PUBLIC_SECURITY_API_URL || "https://employees-dashboard-back-end.vercel.app/api/security";

export async function loginAction(previousState, formData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch security data');
    }

    const data = await response.json();
    const securityRecords = data.security || [];
    const isValid = securityRecords.some(
      (security) => security.email.toLowerCase() === email && security.password === password,
    );

    if (isValid) {
      redirect('/staff-dashboard');
    }
  } catch (error) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Login error:', error);
  }

  return { error: 'بيانات الدخول غير صحيحة' };
}