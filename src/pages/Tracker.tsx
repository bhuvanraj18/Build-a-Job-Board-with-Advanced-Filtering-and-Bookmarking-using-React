import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import JobList from '../components/job/JobList';
import Layout from '../components/layout/Layout';
import { useBookmarks } from '../hooks/useBookmarks';
import { useJobs } from '../hooks/useJobs';

const Tracker = () => {
    const { jobs, isLoading } = useJobs();
    const { bookmarkedIds } = useBookmarks();

    const bookmarkedJobs = useMemo(() => {
        if (!jobs) return [];
        return jobs.filter(job => bookmarkedIds.includes(job.id));
    }, [jobs, bookmarkedIds]);

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>

                {bookmarkedIds.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                        <h2 className="text-xl font-medium text-gray-900">No bookmarked jobs yet</h2>
                        <p className="mt-2 text-gray-500 mb-6">Start exploring jobs and bookmark them to track your applications.</p>
                        <Link to="/">
                            <Button>Browse Jobs</Button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600 mb-4">You have {bookmarkedJobs.length} bookmarked job{bookmarkedJobs.length !== 1 ? 's' : ''}.</p>
                        <JobList jobs={bookmarkedJobs} viewMode="grid" isLoading={isLoading} />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Tracker;
