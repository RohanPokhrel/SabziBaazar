'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useLoading } from '@/context/LoadingContext';
import BackButton from '@/components/ui/BackButton';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Find user with matching email and password
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('email', '==', formData.email),
        where('password', '==', formData.password)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Invalid email or password');
        return;
      }

      // Get user data
      const userDoc = querySnapshot.docs[0];
      const userData = {
        id: userDoc.id,
        ...userDoc.data()
      };

      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirect to home
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains same
} 