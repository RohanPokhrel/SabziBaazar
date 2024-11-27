'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiShoppingBag, 
  FiMapPin, 
  FiEdit2, 
  FiSave,
  FiX,
  FiLogOut
} from 'react-icons/fi';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useLoading } from '@/context/LoadingContext';
import Image from 'next/image';

interface UserData {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AccountPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
        setEditedName(userDoc.data().name);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, 'users', user.uid), {
        name: editedName,
      });

      setUserData(prev => prev ? { ...prev, name: editedName } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userData');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-green-400 to-green-600">
            <div className="absolute -bottom-16 left-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden"
              >
                <Image
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="mt-20 px-8 pb-8">
            {/* Tabs */}
            <div className="flex space-x-6 mb-8 border-b border-gray-200">
              {['profile', 'orders', 'addresses'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 font-medium capitalize ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    {/* Profile Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 p-6 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold flex items-center">
                            <FiUser className="w-5 h-5 mr-2 text-green-600" />
                            Personal Information
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-green-600 hover:text-green-700"
                          >
                            {isEditing ? <FiX size={20} /> : <FiEdit2 size={20} />}
                          </motion.button>
                        </div>

                        {isEditing ? (
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleUpdateProfile}
                              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                            >
                              Save Changes
                            </motion.button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-600">Name: {userData.name}</p>
                            <p className="text-gray-600">Email: {userData.email}</p>
                            <p className="text-gray-600">Role: {userData.role}</p>
                            <p className="text-gray-600">
                              Member since: {new Date(userData.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 p-6 rounded-xl"
                      >
                        <h3 className="text-lg font-semibold flex items-center mb-4">
                          <FiLock className="w-5 h-5 mr-2 text-green-600" />
                          Security
                        </h3>
                        <div className="space-y-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                          >
                            Change Password
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                          >
                            Logout
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FiShoppingBag className="w-5 h-5 mr-2 text-green-600" />
                      Recent Orders
                    </h3>
                    {/* Add orders list here */}
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FiMapPin className="w-5 h-5 mr-2 text-green-600" />
                      Saved Addresses
                    </h3>
                    {/* Add addresses list here */}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 