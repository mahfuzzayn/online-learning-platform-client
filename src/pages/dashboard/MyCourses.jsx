import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

function MyCourses() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        document.title = 'Online Learning | My Courses';
        if (user?.email) {
            fetchMyCourses();
        }
    }, [user]);

    const fetchMyCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
            const allCourses = response.data.data || [];
            // Filter courses by instructor email
            const myCourses = allCourses.filter(course => course.instructorEmail === user.email);
            setCourses(myCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('Failed to load your courses');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId, courseTitle) => {
        // Confirmation dialog
        const confirmed = window.confirm(
            `Are you sure you want to delete "${courseTitle}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setDeletingId(courseId);
            await axios.delete(`${import.meta.env.VITE_API_URL}/courses/${courseId}`);

            // Update UI by removing the deleted course
            setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));

            toast.success('Course deleted successfully!');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Failed to delete course. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
            >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Courses Created Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start sharing your knowledge by creating your first course!
                </p>
                <Link
                    to="/dashboard/add-course"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                    Create Your First Course
                </Link>
            </motion.div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    My Added Courses
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    You have created {courses.length} {courses.length === 1 ? 'course' : 'courses'}
                </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <motion.div
                        key={course._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
                    >
                        {/* Course Image */}
                        <div className="relative overflow-hidden h-40">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {course.isFeatured && (
                                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    ⭐ Featured
                                </div>
                            )}
                        </div>

                        {/* Course Info */}
                        <div className="p-5">
                            {/* Category Badge */}
                            <div className="mb-3">
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                                    {course.category}
                                </span>
                            </div>

                            {/* Course Title */}
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem]">
                                {course.title}
                            </h3>

                            {/* Course Meta */}
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    ${course.price}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <Link
                                        to={`/courses/${course._id}`}
                                        className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all duration-300"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        to={`/dashboard/update-course/${course._id}`}
                                        className="flex-1 text-center px-3 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-all duration-300"
                                    >
                                        Update
                                    </Link>
                                </div>
                                <button
                                    onClick={() => handleDelete(course._id, course.title)}
                                    disabled={deletingId === course._id}
                                    className="w-full px-3 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deletingId === course._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MyCourses;
