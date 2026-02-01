import { Job } from '../../hooks/useJobs';
import { cn } from '../../utils';
import JobCard from './JobCard';

interface JobListProps {
    jobs: Job[];
    viewMode: 'grid' | 'list';
    isLoading?: boolean;
}

const JobList = ({ jobs, viewMode, isLoading }: JobListProps) => {
    if (isLoading) {
        return (
            <div className={cn(
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div
            data-testid="job-list-container"
            data-view-mode={viewMode}
            className={cn(
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}
        >
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} viewMode={viewMode} />
            ))}
        </div>
    );
};

export default JobList;
