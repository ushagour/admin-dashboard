import { useState, useEffect } from 'react';
import { apiFetch } from '../api/utils';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    if (!userId) {
      setNotifications([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use Promise.allSettled to handle partial failures gracefully
      const [messagesRes, reviewsRes] = await Promise.allSettled([
        apiFetch(`/messages/unread?userId=${userId}`),
        apiFetch(`/reviews/unread?userId=${userId}`)
      ]);


      
      const allNotifications = [];


      // Process messages
      if (messagesRes.status === 'fulfilled') {
        allNotifications.push(...messagesRes.value.map(msg => ({ ...msg, type: 'message' })));
      }

      // Process reclamations
      if (reviewsRes.status === 'fulfilled') {
        allNotifications.push(...reviewsRes.value.map(rec => ({ ...rec, type: 'reclamation' })));
      }

      // Sort by creation date (newest first)
      const sortedNotifications = allNotifications.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotifications(sortedNotifications);
    } catch (err) {
      console.warn('Failed to fetch notifications:', err);
      setError('Failed to load notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications when userId changes
  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  // Return refresh function for manual updates
  return {
    notifications,
    loading,
    error,
    refresh: fetchNotifications
  };
}; 