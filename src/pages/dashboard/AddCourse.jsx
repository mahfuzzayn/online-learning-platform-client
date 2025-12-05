import { useEffect } from 'react';

function AddCourse() {
    useEffect(() => {
        document.title = 'Online Learning | Add Course';
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Add New Course
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                Create and publish a new course
            </p>
        </div>
    );
}

export default AddCourse;
