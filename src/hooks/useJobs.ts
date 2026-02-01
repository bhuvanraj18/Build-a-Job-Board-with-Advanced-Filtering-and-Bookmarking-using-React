import { useMemo } from 'react';
import useSWR from 'swr';
import mockData from '../data/mock-data.json';

export interface Company {
    id: number;
    name: string;
    size: string;
    description: string;
}

export interface Job {
    id: number;
    title: string;
    companyId: number;
    company?: Company; // Enriched property
    location: string;
    jobType: string;
    salary: number;
    experienceLevel: string;
    skills: string[];
    postedDate: string;
}

// Helper type for mock data structure
interface MockData {
    jobs: Omit<Job, 'company'>[];
    companies: Company[];
}

const fetcher = async (): Promise<MockData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData as unknown as MockData;
};

export const useJobs = () => {
    const { data, error, isLoading } = useSWR<MockData>('jobs', fetcher);

    const jobs = useMemo(() => {
        if (!data) return [];
        return data.jobs.map(job => ({
            ...job,
            company: data.companies.find(c => c.id === job.companyId)
        })) as Job[];
    }, [data]);

    return {
        jobs,
        companies: data?.companies,
        isLoading,
        isError: error
    };
};
