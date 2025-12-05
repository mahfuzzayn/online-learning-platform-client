import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles for the certificate
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
    },
    border: {
        border: '8px solid #3B82F6',
        padding: 40,
        height: '100%',
    },
    innerBorder: {
        border: '2px solid #3B82F6',
        padding: 30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#3B82F6',
        marginBottom: 10,
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 5,
    },
    body: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    presentedTo: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 15,
    },
    studentName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
        borderBottom: '2px solid #3B82F6',
        paddingBottom: 10,
    },
    completionText: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 10,
        lineHeight: 1.6,
    },
    courseName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3B82F6',
        marginTop: 10,
        marginBottom: 20,
    },
    footer: {
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    signatureBlock: {
        textAlign: 'center',
        width: '40%',
    },
    signatureLine: {
        borderTop: '2px solid #1F2937',
        marginBottom: 5,
        paddingTop: 5,
    },
    signatureLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    dateBlock: {
        textAlign: 'center',
        width: '40%',
    },
    dateLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 5,
    },
    dateValue: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: 'bold',
    },
    decorativeElement: {
        textAlign: 'center',
        fontSize: 40,
        color: '#3B82F6',
        marginBottom: 10,
    },
    certificateId: {
        textAlign: 'center',
        fontSize: 10,
        color: '#9CA3AF',
        marginTop: 20,
    },
});

// Certificate Document Component
const CertificateDocument = ({ studentName, courseName, instructorName, completionDate, certificateId }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.border}>
                <View style={styles.innerBorder}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.decorativeElement}>🎓</Text>
                        <Text style={styles.title}>CERTIFICATE</Text>
                        <Text style={styles.subtitle}>OF COMPLETION</Text>
                    </View>

                    {/* Body */}
                    <View style={styles.body}>
                        <Text style={styles.presentedTo}>This certificate is proudly presented to</Text>
                        <Text style={styles.studentName}>{studentName}</Text>

                        <Text style={styles.completionText}>
                            For successfully completing the online course
                        </Text>

                        <Text style={styles.courseName}>{courseName}</Text>

                        <Text style={styles.completionText}>
                            Demonstrating dedication, commitment, and excellence in learning.
                        </Text>
                        <Text style={styles.completionText}>
                            This achievement reflects your passion for continuous growth and development.
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.signatureBlock}>
                            <View style={styles.signatureLine}>
                                <Text style={styles.signatureLabel}>{instructorName}</Text>
                            </View>
                            <Text style={styles.signatureLabel}>Course Instructor</Text>
                        </View>

                        <View style={styles.dateBlock}>
                            <Text style={styles.dateLabel}>Date of Completion</Text>
                            <Text style={styles.dateValue}>{completionDate}</Text>
                        </View>
                    </View>

                    {/* Certificate ID */}
                    <View style={styles.certificateId}>
                        <Text>Certificate ID: {certificateId}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default CertificateDocument;
