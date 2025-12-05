import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    useEffect(() => {
        if (course) {
            document.title = `Online Learning | ${course.title}`;
        }
    }, [course]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${id}`);
            setCourse(response.data.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
            toast.error('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            toast.error('Please login to enroll in this course');
            navigate('/login');
            return;
        }

        try {
            setEnrolling(true);
            const enrollmentData = {
                courseId: course._id,
                courseTitle: course.title,
                courseImage: course.image,
                coursePrice: course.price,
                courseDuration: course.duration,
                courseCategory: course.category,
                instructorName: course.instructorName,
                instructorEmail: course.instructorEmail,
                userEmail: user.email,
                userName: user.displayName || user.email,
                enrolledAt: new Date().toISOString()
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/enrollments`, enrollmentData);
            toast.success('Successfully enrolled in the course!');
            navigate('/dashboard/enrolled');
        } catch (error) {
            console.error('Error enrolling in course:', error);
            if (error.response?.status === 400) {
                toast.error('You are already enrolled in this course');
            } else {
                toast.error('Failed to enroll in course');
            }
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course not found</h2>
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Course Header */}
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <button onClick={() => navigate('/')} className="hover:text-blue-600 dark:hover:text-blue-400">
                                Home
                            </button>
                            <span>/</span>
                            <button onClick={() => navigate('/courses')} className="hover:text-blue-600 dark:hover:text-blue-400">
                                Courses
                            </button>
                            <span>/</span>
                            <span className="text-gray-900 dark:text-white">{course.title}</span>
                        </div>

                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                                {course.category}
                            </span>
                            {course.isFeatured && (
                                <span className="ml-3 inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>

                        {/* Course Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            {course.title}
                        </h1>

                        {/* Course Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${course.price}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Course Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Course Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8"
                            >
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-96 object-cover rounded-2xl shadow-xl"
                                />
                            </motion.div>

                            {/* Course Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    About This Course
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                    {course.description}
                                </p>
                            </motion.div>

                            {/* What You'll Learn */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    What You'll Learn
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Master core concepts and fundamentals',
                                        'Build real-world projects',
                                        'Learn industry best practices',
                                        'Get hands-on experience',
                                        'Understand advanced techniques',
                                        'Prepare for professional work'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600 dark:text-gray-400">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24"
                            >
                                {/* Instructor Info */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Your Instructor
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={course.instructorPhoto}
                                            alt={course.instructorName}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {course.instructorName}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {course.instructorEmail}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="mb-8 space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-400">Duration</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{course.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-400">Category</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{course.category}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Price</span>
                                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">${course.price}</span>
                                    </div>
                                </div>

                                {/* Enroll Button */}
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>

                                {/* Features */}
                                <div className="mt-8 space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>24/7 support</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CourseDetails;
