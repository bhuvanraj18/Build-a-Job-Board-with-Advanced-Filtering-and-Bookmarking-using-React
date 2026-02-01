import { useMemo, useState } from 'react';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import JobFilters from '../components/job/JobFilters';
import JobList from '../components/job/JobList';
import Layout from '../components/layout/Layout';
import { useJobs } from '../hooks/useJobs';
import { useJobStore } from '../store/useJobStore';

const JOBS_PER_PAGE = 10;

const Home = () => {
    const { jobs, isLoading } = useJobs();
    const {
        searchQuery,
        jobType,
        experienceLevel,
        selectedSkills,
        salaryRange,
        sortOption,
        viewMode,
        setSortOption,
        setViewMode
    } = useJobStore();

    const [currentPage, setCurrentPage] = useState(1);

    // Filter and Sort Logic
    const filteredJobs = useMemo(() => {
        if (!jobs) return [];

        let result = [...jobs];

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.company?.name.toLowerCase().includes(query)
            );
        }

        // Job Type
        if (jobType) {
            result = result.filter(job => job.jobType === jobType);
        }

        // Experience
        if (experienceLevel) {
            result = result.filter(job => job.experienceLevel === experienceLevel);
        }

        // Skills
        if (selectedSkills.length > 0) {
            result = result.filter(job =>
                selectedSkills.every(skill => job.skills.includes(skill))
            );
        }

        // Salary (Range)
        result = result.filter(job =>
            job.salary >= salaryRange[0] && job.salary <= salaryRange[1]
        );

        // Sorting
        if (sortOption === 'salary-desc') {
            result.sort((a, b) => b.salary - a.salary);
        } else if (sortOption === 'recent') {
            result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        }

        return result;
    }, [jobs, searchQuery, jobType, experienceLevel, selectedSkills, salaryRange, sortOption]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * JOBS_PER_PAGE,
        currentPage * JOBS_PER_PAGE
    );

    // Reset page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, jobType, experienceLevel, selectedSkills, salaryRange, sortOption]);

    return (
        <Layout>
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <SearchBar />
                    <div className="flex gap-2 ml-auto">
                        <select
                            data-testid="sort-salary-desc"
                            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="recent">Most Recent</option>
                            <option value="salary-desc">Highest Salary</option>
                            <option value="relevance">Relevance</option>
                        </select>

                        <div className="flex bg-gray-100 rounded-md p-1">
                            <button
                                data-testid="grid-view-btn"
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            </button>
                            <button
                                data-testid="list-view-btn"
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <JobFilters />
                </div>
                <div className="lg:col-span-3">
                    <JobList jobs={currentJobs} viewMode={viewMode} isLoading={isLoading} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Home;
