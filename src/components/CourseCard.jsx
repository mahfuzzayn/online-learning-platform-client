import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CourseCard({ course, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
        >
            {/* Course Image */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {course.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        ⭐ Featured
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Course Content */}
            <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                        {course.category}
                    </span>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <img
                        src={course.instructorPhoto}
                        alt={course.instructorName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.instructorName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
                    </div>
                </div>

                {/* Course Meta Info */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{course.duration}</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${course.price}
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/courses/${course._id}`}
                    className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
}

export default CourseCard;
