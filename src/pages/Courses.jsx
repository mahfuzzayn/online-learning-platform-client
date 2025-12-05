import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);

    useEffect(() => {
        document.title = 'Hiko | Courses';
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
            const coursesData = response.data.data || [];
            setCourses(coursesData);
            setFilteredCourses(coursesData);

            // Extract unique categories
            const uniqueCategories = ['All', ...new Set(coursesData.map(course => course.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course => course.category === category);
            setFilteredCourses(filtered);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Page Header */}
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                            Explore All Courses
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Browse our complete collection of courses and find the perfect one to advance your skills
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryFilter(category)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-md'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Course Count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <p className="text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
                            {selectedCategory !== 'All' && (
                                <span> in <span className="font-semibold">{selectedCategory}</span></span>
                            )}
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* Courses Grid */}
                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredCourses.map((course, index) => (
                                        <CourseCard key={course._id} course={course} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center py-20"
                                >
                                    <div className="text-6xl mb-4">📚</div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        No courses found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        No courses available in this category at the moment.
                                    </p>
                                    <button
                                        onClick={() => handleCategoryFilter('All')}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                                    >
                                        View All Courses
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Courses;
