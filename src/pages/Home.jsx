import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Online Learning | Home';
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                                🎓 Welcome to LearnHub
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight"
                        >
                            Transform Your Future with Online Learning
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                        >
                            Discover thousands of courses taught by expert instructors. Learn at your own pace,
                            build new skills, and advance your career with our comprehensive learning platform.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link
                                to="/courses"
                                className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1"
                            >
                                <span className="relative z-10">Explore Courses</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                            <Link
                                to="/courses"
                                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                Learn More
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
                        >
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
                                <div className="text-gray-600 dark:text-gray-400">Online Courses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50K+</div>
                                <div className="text-gray-600 dark:text-gray-400">Active Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">200+</div>
                                <div className="text-gray-600 dark:text-gray-400">Expert Instructors</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}

export default Home;
