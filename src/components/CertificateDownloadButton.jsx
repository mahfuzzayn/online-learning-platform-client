import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import CertificateDocument from './CertificateDocument';

function CertificateDownloadButton({
    studentName,
    courseName,
    instructorName,
    completionDate,
    courseId
}) {
    const [isGenerating, setIsGenerating] = useState(false);

    // Generate unique certificate ID
    const certificateId = `CERT-${courseId}-${Date.now()}`.toUpperCase();

    // Format date
    const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <PDFDownloadLink
            document={
                <CertificateDocument
                    studentName={studentName}
                    courseName={courseName}
                    instructorName={instructorName}
                    completionDate={formattedDate}
                    certificateId={certificateId}
                />
            }
            fileName={`${courseName.replace(/[^a-z0-9]/gi, '_')}_Certificate.pdf`}
            className="inline-block"
        >
            {({ blob, url, loading, error }) => (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    className={`
                        px-4 py-2 rounded-lg font-semibold text-sm
                        transition-all duration-300 flex items-center gap-2
                        ${loading
                            ? 'bg-gray-400 cursor-wait text-white'
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg hover:shadow-green-500/50'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Certificate
                        </>
                    )}
                </motion.button>
            )}
        </PDFDownloadLink>
    );
}

export default CertificateDownloadButton;
