import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function Progress() {
    const { user } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [createdCourses, setCreatedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Online Learning | Progress';
        fetchData();
    }, [user]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch enrolled courses
            const enrollmentsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/enrollments?userEmail=${user.email}`
            );
            setEnrolledCourses(enrollmentsResponse.data.data || []);

            // Fetch created courses
            const coursesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
            const allCourses = coursesResponse.data.data || [];
            const myCourses = allCourses.filter(course => course.instructorEmail === user.email);
            setCreatedCourses(myCourses);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics
    const totalEnrolled = enrolledCourses.length;
    const totalCreated = createdCourses.length;
    const totalSpent = enrolledCourses.reduce((sum, enrollment) => sum + (enrollment.course?.price || 0), 0);
    const totalEarnings = createdCourses.reduce((sum, course) => sum + (course.price || 0), 0);

    // Category distribution for enrolled courses
    const categoryData = enrolledCourses.reduce((acc, enrollment) => {
        const category = enrollment.course?.category || 'Other';
        const existing = acc.find(item => item.name === category);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: category, value: 1 });
        }
        return acc;
    }, []);

    // Monthly enrollment data (sample - replace with actual data)
    const monthlyData = [
        { month: 'Jan', enrollments: 2 },
        { month: 'Feb', enrollments: 3 },
        { month: 'Mar', enrollments: 1 },
        { month: 'Apr', enrollments: 4 },
        { month: 'May', enrollments: 2 },
        { month: 'Jun', enrollments: 5 }
    ];

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Progress Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Track your learning journey and course creation progress
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Enrolled Courses</h3>
                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <p className="text-4xl font-bold">{totalEnrolled}</p>
                    <p className="text-sm opacity-80 mt-2">Active learning paths</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Created Courses</h3>
                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <p className="text-4xl font-bold">{totalCreated}</p>
                    <p className="text-sm opacity-80 mt-2">Courses published</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Total Spent</h3>
                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-4xl font-bold">${totalSpent}</p>
                    <p className="text-sm opacity-80 mt-2">Investment in learning</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium opacity-90">Potential Earnings</h3>
                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <p className="text-4xl font-bold">${totalEarnings}</p>
                    <p className="text-sm opacity-80 mt-2">From created courses</p>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-600"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Enrolled Courses by Category
                    </h3>
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No enrollment data available
                        </div>
                    )}
                </motion.div>

                {/* Monthly Enrollments */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-600"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Monthly Enrollment Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="enrollments" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-600"
            >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Recent Enrollments
                </h3>
                {enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                        {enrolledCourses.slice(0, 5).map((enrollment, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                                <img
                                    src={enrollment.course?.image}
                                    alt={enrollment.course?.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {enrollment.course?.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600 dark:text-blue-400">
                                        ${enrollment.course?.price}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {enrollment.course?.duration}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No enrollments yet
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default Progress;
