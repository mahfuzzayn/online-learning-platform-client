import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

function EnrolledCourses() {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Online Learning | My Enrolled Courses';
        if (user?.email) {
            fetchEnrollments();
        }
    }, [user]);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/enrollments?userEmail=${user.email}`
            );
            const enrollmentsData = response.data.data || [];
            setEnrollments(enrollmentsData);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            toast.error('Failed to load enrolled courses');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (enrollments.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
            >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Enrolled Courses Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start your learning journey by enrolling in a course!
                </p>
                <Link
                    to="/courses"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                    Browse Courses
                </Link>
            </motion.div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    My Enrolled Courses
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    You have enrolled in {enrollments.length} {enrollments.length === 1 ? 'course' : 'courses'}
                </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment, index) => (
                    <motion.div
                        key={enrollment._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
                    >
                        {/* Course Image */}
                        <div className="relative overflow-hidden h-40">
                            <img
                                src={enrollment.courseImage}
                                alt={enrollment.courseTitle}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Course Info */}
                        <div className="p-5">
                            {/* Category Badge */}
                            <div className="mb-3">
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                                    {enrollment.courseCategory}
                                </span>
                            </div>

                            {/* Course Title */}
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                {enrollment.courseTitle}
                            </h3>

                            {/* Instructor */}
                            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{enrollment.instructorName}</span>
                            </div>

                            {/* Course Meta */}
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{enrollment.courseDuration}</span>
                                </div>
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    ${enrollment.coursePrice}
                                </div>
                            </div>

                            {/* Enrolled Date */}
                            <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Link
                                    to={`/courses/${enrollment.courseId}`}
                                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all duration-300"
                                >
                                    Continue Learning
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default EnrolledCourses;
