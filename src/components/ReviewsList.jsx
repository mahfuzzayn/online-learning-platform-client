import { motion } from 'framer-motion';
import StarRating from './StarRating';

function ReviewsList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-5xl mb-4">💬</div>
                <p className="text-gray-600 dark:text-gray-400">
                    No reviews yet. Be the first to review this course!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review, index) => (
                <motion.div
                    key={review.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-600"
                >
                    {/* User Info */}
                    <div className="flex items-start gap-4 mb-4">
                        <img
                            src={review.userPhoto}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {review.userName}
                                </h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <StarRating rating={review.rating} readonly size="sm" />
                        </div>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {review.comment}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

export default ReviewsList;
