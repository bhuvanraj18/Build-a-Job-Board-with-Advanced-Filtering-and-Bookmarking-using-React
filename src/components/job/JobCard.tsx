import { useBookmarks } from '../../hooks/useBookmarks';
import { Job } from '../../hooks/useJobs';
import { cn, formatCurrency, formatDate } from '../../utils';

interface JobCardProps {
    job: Job;
    viewMode?: 'grid' | 'list';
}

const JobCard = ({ job, viewMode = 'grid' }: JobCardProps) => {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const bookmarked = isBookmarked(job.id);

    return (
        <div
            data-testid={`job-card-${job.id}`}
            className={cn(
                "bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md relative group",
                viewMode === 'list' && "flex flex-row items-center gap-6"
            )}
        >
            <div className={cn("flex-1", viewMode === 'list' && "grid grid-cols-12 gap-4 items-center")}>

                {/* Header / Title Section */}
                <div className={cn(viewMode === 'list' && "col-span-4")}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 font-medium">{job.company?.name}</p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className={cn("mt-4 space-y-2", viewMode === 'list' && "mt-0 col-span-5 grid grid-cols-2 gap-4 space-y-0")}>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <span className="font-medium">📍 {job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <span className="font-medium">💼 {job.jobType}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <span className="font-medium">🎓 {job.experienceLevel}</span>
                    </div>
                    <div className="flex items-center text-sm text-green-700 font-semibold gap-2" data-testid="job-salary">
                        <span>💰 {formatCurrency(job.salary)}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className={cn("mt-4 flex flex-wrap gap-2", viewMode === 'list' && "mt-0 col-span-3 justify-end")}>
                    {job.skills.slice(0, 4).map(skill => (
                        <span
                            key={skill}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                        >
                            {skill}
                        </span>
                    ))}
                    {job.skills.length > 4 && (
                        <span className="text-xs text-gray-500 self-center">+{job.skills.length - 4}</span>
                    )}
                </div>
            </div>

            {/* Bookmark Button */}
            <div className={cn("mt-4 border-t pt-4 flex justify-end gap-2", viewMode === 'list' && "mt-0 border-t-0 pt-0 ml-4")}>
                <button
                    data-testid={`bookmark-btn-${job.id}`}
                    data-bookmarked={bookmarked}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(job.id);
                    }}
                    className={cn(
                        "p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                        bookmarked ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    )}
                    aria-label={bookmarked ? "Remove bookmark" : "Bookmark this job"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                </button>
            </div>

            <div className={cn("text-xs text-gray-400 mt-2", viewMode === 'list' && "absolute bottom-2 right-4")}>
                Posted {formatDate(job.postedDate)}
            </div>
        </div>
    );
};

export default JobCard;
