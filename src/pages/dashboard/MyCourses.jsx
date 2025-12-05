import { useEffect } from 'react';

function MyCourses() {
    useEffect(() => {
        document.title = 'Online Learning | My Courses';
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                My Added Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                Manage courses you've created
            </p>
        </div>
    );
}

export default MyCourses;
