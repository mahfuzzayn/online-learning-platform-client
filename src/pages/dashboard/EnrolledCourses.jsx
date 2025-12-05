import { useEffect } from 'react';

function EnrolledCourses() {
    useEffect(() => {
        document.title = 'Online Learning | My Enrolled Courses';
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                My Enrolled Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                View all the courses you've enrolled in
            </p>
        </div>
    );
}

export default EnrolledCourses;
