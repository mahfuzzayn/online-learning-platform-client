import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

function ReviewForm({ courseId, onReviewSubmitted }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (!comment.trim()) {
            toast.error('Please write a review');
            return;
        }

        setSubmitting(true);
        try {
            // Simulate API call (replace with actual API endpoint)
            const reviewData = {
                courseId,
                userId: user.uid,
                userName: user.displayName || user.email,
                userPhoto: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff`,
                rating,
                comment: comment.trim(),
                createdAt: new Date().toISOString()
            };

            // TODO: Replace with actual API call
            // await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewData);

            // For now, just simulate success
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Review submitted successfully!');
            setRating(0);
            setComment('');

            if (onReviewSubmitted) {
                onReviewSubmitted(reviewData);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-600"
        >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Write a Review
            </h3>

            {/* Rating */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Rating *
                </label>
                <StarRating rating={rating} onRatingChange={setRating} size="lg" />
            </div>

            {/* Comment */}
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Review *
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this course..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </motion.form>
    );
}

export default ReviewForm;
