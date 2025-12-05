import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

function AddCourse() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        duration: '',
        category: '',
        description: '',
        isFeatured: false
    });

    useEffect(() => {
        document.title = 'Hiko | Add Course';
    }, []);

    const categories = [
        'Web Development',
        'Frontend',
        'Backend',
        'Programming',
        'Design',
        'Data Science',
        'Mobile Development',
        'DevOps',
        'Cybersecurity',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            setUploadingImage(true);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            toast.error('Please enter a course title');
            return;
        }
        if (!imageFile) {
            toast.error('Please select a course image');
            return;
        }
        if (!formData.price || formData.price <= 0) {
            toast.error('Please enter a valid price');
            return;
        }
        if (!formData.duration.trim()) {
            toast.error('Please enter course duration');
            return;
        }
        if (!formData.category) {
            toast.error('Please select a category');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Please enter a course description');
            return;
        }

        try {
            setSubmitting(true);

            // Step 1: Upload image to ImgBB
            toast.loading('Uploading image...', { id: 'upload' });
            const imageUrl = await uploadImageToImgBB(imageFile);
            toast.success('Image uploaded successfully!', { id: 'upload' });

            // Step 2: Create course with the image URL
            const courseData = {
                title: formData.title.trim(),
                image: imageUrl,
                price: parseFloat(formData.price),
                duration: formData.duration.trim(),
                category: formData.category,
                description: formData.description.trim(),
                isFeatured: formData.isFeatured,
                instructorName: user.displayName || user.email,
                instructorEmail: user.email,
                instructorPhoto: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3b82f6&color=fff`
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/courses`, courseData);
            toast.success('Course created successfully!');

            // Reset form
            setFormData({
                title: '',
                price: '',
                duration: '',
                category: '',
                description: '',
                isFeatured: false
            });
            setImageFile(null);
            setImagePreview('');

            // Redirect to my courses after a short delay
            setTimeout(() => {
                navigate('/dashboard/my-courses');
            }, 1500);
        } catch (error) {
            console.error('Error creating course:', error);
            if (error.message === 'Failed to upload image') {
                toast.error('Failed to upload image. Please try again.');
            } else {
                toast.error('Failed to create course. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Add New Course
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Create and publish a new course for students
                </p>
            </div>

            {/* Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Course Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Course Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Full-Stack Web Development Bootcamp"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Course Image *
                    </label>
                    <div className="space-y-3">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                            required
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Supported formats: JPG, PNG, GIF. Max size: 5MB
                        </p>
                        {imagePreview && (
                            <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Image Preview:
                                </p>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Price (USD) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="99"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Duration *
                        </label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g., 6 Weeks"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what students will learn in this course..."
                        rows="5"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        required
                    />
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mark as Featured Course
                    </label>
                </div>

                {/* Instructor Info (Auto-filled) */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Instructor Information (Auto-filled)
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || 'Instructor'}
                                    className="w-12 h-12 rounded-full"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {user?.displayName || user?.email}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={submitting || uploadingImage}
                        className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (uploadingImage ? 'Uploading Image...' : 'Creating Course...') : 'Create Course'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/my-courses')}
                        disabled={submitting}
                        className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>
            </motion.form>
        </div>
    );
}

export default AddCourse;
