import { useEffect, useState } from 'react';

const STORAGE_KEY = 'bookmarkedJobs';

export const useBookmarks = () => {
    const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
        // Initial state from localStorage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    });

    // Sync to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [bookmarkedIds]);

    const toggleBookmark = (jobId: number) => {
        setBookmarkedIds(prev => {
            if (prev.includes(jobId)) {
                return prev.filter(id => id !== jobId);
            } else {
                return [...prev, jobId];
            }
        });
    };

    const isBookmarked = (jobId: number) => bookmarkedIds.includes(jobId);

    return {
        bookmarkedIds,
        toggleBookmark,
        isBookmarked
    };
};
