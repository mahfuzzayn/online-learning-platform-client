import { motion } from 'framer-motion';

function LoadingSpinner({ size = 'md', message = '' }) {
    const sizeClasses = {
        sm: 'h-8 w-8 border-2',
        md: 'h-16 w-16 border-t-4 border-b-4',
        lg: 'h-24 w-24 border-t-4 border-b-4',
        xl: 'h-32 w-32 border-t-4 border-b-4'
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`animate-spin rounded-full border-blue-600 ${sizeClasses[size]}`}
            />
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );
}

export default LoadingSpinner;
