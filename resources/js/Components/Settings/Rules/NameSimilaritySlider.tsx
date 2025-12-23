import { InformationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface NameSimilaritySliderProps {
    value: number;
    onChange: (value: number) => void;
}

export default function NameSimilaritySlider({
    value,
    onChange,
}: NameSimilaritySliderProps) {
    return (
        <div className="mt-4 mb-4 ml-6 max-w-md">
            <p className="text-sm font-medium text-gray-700 mb-2">
                Name Similarity Sensitivity
            </p>

            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">More lenient</span>
                <span className="text-xs text-gray-500">More strict</span>
            </div>

            <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                style={{
                    background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`,
                }}
            />

            <div className="flex items-center mt-3 text-sm text-gray-600">
                <ShieldExclamationIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                    Will block IDs with a name matching score of{' '}
                    <span className="font-semibold">{value}%</span>
                </span>
            </div>

            <div className="flex items-center mt-2 text-xs text-gray-500 group cursor-help">
                <InformationCircleIcon className="h-4 w-4 mr-1" />
                <span className="underline decoration-dotted">
                    Uses fuzzy matching to compare names
                </span>
                <div className="hidden group-hover:block absolute bg-gray-900 text-white text-xs rounded py-2 px-3 max-w-xs mt-16 z-10">
                    Fuzzy matching attempts to match names in cases such as
                    matching nicknames or shortened names. Matching John to
                    Johnathon, or Jenn to Jennifer, etc.
                </div>
            </div>
        </div>
    );
}
