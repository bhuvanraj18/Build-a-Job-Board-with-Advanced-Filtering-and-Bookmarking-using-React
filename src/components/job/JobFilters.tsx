import ReactSelect from 'react-select';
import ReactSlider from 'react-slider';
import { useJobStore } from '../../store/useJobStore';
import { formatCurrency } from '../../utils';
import Button from '../common/Button';

const JOB_TYPES = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCE_LEVELS = ['Internship', 'Junior', 'Mid-Level', 'Senior'];
const SKILLS_OPTIONS = [
    { value: 'React', label: 'React' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Docker', label: 'Docker' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'SQL', label: 'SQL' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    // Add more based on mock data if needed
];

const JobFilters = () => {
    const {
        jobType,
        experienceLevel,
        selectedSkills,
        salaryRange,
        setJobType,
        setExperienceLevel,
        setSelectedSkills,
        setSalaryRange,
        clearFilters
    } = useJobStore();

    const handleSkillChange = (selectedOptions: any) => {
        setSelectedSkills(selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []);
    };

    const activeFiltersCount = [
        jobType,
        experienceLevel,
        selectedSkills.length > 0,
        salaryRange[0] > 0 || salaryRange[1] < 200000
    ].filter(Boolean).length;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {activeFiltersCount}
                        </span>
                    )}
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    data-testid="clear-filters-btn"
                    className="text-gray-500 hover:text-red-600"
                >
                    Clear All
                </Button>
            </div>

            {/* Job Type */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Job Type</h3>
                <div className="space-y-2">
                    {JOB_TYPES.map((type) => (
                        <div key={type} className="flex items-center">
                            <input
                                id={`job-type-${type}`}
                                type="radio"
                                name="jobType"
                                value={type}
                                checked={jobType === type}
                                onChange={() => setJobType(type)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                data-testid={`filter-job-type-${type.toLowerCase()}`}
                            />
                            <label htmlFor={`job-type-${type}`} className="ml-2 text-sm text-gray-700">
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Level */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Experience Level</h3>
                <div className="space-y-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                        <div key={level} className="flex items-center">
                            <input
                                id={`exp-level-${level}`}
                                type="radio"
                                name="experienceLevel"
                                value={level}
                                checked={experienceLevel === level}
                                onChange={() => setExperienceLevel(level)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                data-testid={`filter-exp-level-${level.toLowerCase()}`}
                            />
                            <label htmlFor={`exp-level-${level}`} className="ml-2 text-sm text-gray-700">
                                {level}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Salary Range */}
            <div data-testid="filter-salary-slider">
                <h3 className="text-sm font-medium text-gray-900 mb-6">Salary Range</h3>
                <ReactSlider
                    className="h-2 bg-gray-200 rounded-full"
                    thumbClassName="h-6 w-6 bg-blue-600 rounded-full cursor-grab focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 -top-2 flex items-center justify-center shadow-md"
                    trackClassName="bg-blue-300 h-2 rounded-full"
                    value={salaryRange}
                    onChange={(value) => setSalaryRange(value as [number, number])}
                    min={0}
                    max={200000}
                    step={5000}
                    pearling
                    minDistance={10000}
                    renderThumb={(props, state) => (
                        <div {...props}>
                            <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                                {formatCurrency(state.valueNow)}
                            </div>
                        </div>
                    )}
                />
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                    <span>{formatCurrency(salaryRange[0])}</span>
                    <span>{formatCurrency(salaryRange[1])}+</span>
                </div>
            </div>

            {/* Skills */}
            <div data-testid="filter-skills">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Skills</h3>
                <ReactSelect
                    isMulti
                    options={SKILLS_OPTIONS}
                    value={SKILLS_OPTIONS.filter(opt => selectedSkills.includes(opt.value))}
                    onChange={handleSkillChange}
                    className="text-sm"
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: '#e5e7eb',
                            boxShadow: 'none',
                            '&:hover': {
                                borderColor: '#d1d5db',
                            }
                        })
                    }}
                    placeholder="Select skills..."
                />
            </div>
        </div>
    );
};

export default JobFilters;
