import { create } from 'zustand';

interface JobFilterState {
    searchQuery: string;
    jobType: string | null;
    experienceLevel: string | null;
    selectedSkills: string[]; // IDs or strings? Strings as per mock data
    salaryRange: [number, number];
    sortOption: string; // 'recent', 'salary-desc'
    viewMode: 'grid' | 'list';

    // Actions
    setSearchQuery: (query: string) => void;
    setJobType: (type: string | null) => void;
    setExperienceLevel: (level: string | null) => void;
    setSelectedSkills: (skills: string[]) => void;
    setSalaryRange: (range: [number, number]) => void;
    setSortOption: (option: string) => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    clearFilters: () => void;
}

// Default initial state
const initialState = {
    searchQuery: '',
    jobType: null,
    experienceLevel: null,
    selectedSkills: [],
    salaryRange: [0, 200000] as [number, number],
    sortOption: 'recent',
    viewMode: 'grid' as const,
};

export const useJobStore = create<JobFilterState>((set) => ({
    ...initialState,

    setSearchQuery: (query) => set({ searchQuery: query }),

    setJobType: (type) => set({ jobType: type }),

    setExperienceLevel: (level) => set({ experienceLevel: level }),

    setSelectedSkills: (skills) => set({ selectedSkills: skills }),

    setSalaryRange: (range) => set({ salaryRange: range }),

    setSortOption: (option) => set({ sortOption: option }),

    setViewMode: (mode) => set({ viewMode: mode }),

    clearFilters: () => set({
        searchQuery: '',
        jobType: null,
        experienceLevel: null,
        selectedSkills: [],
        salaryRange: [0, 200000],
        sortOption: 'recent'
    })
}));
