import { useState } from 'react';
import Switch from '@/Components/Switch';
import Collapse from '@/Components/Collapse';

interface AgeRequirementsProps {
    minimumAgeEnabled: boolean;
    minimumAge: number | string;
    onMinimumAgeEnabledChange: (enabled: boolean) => void;
    onMinimumAgeChange: (age: number | string) => void;
}

// Canadian Tobacco Ages Data
const canadianTobaccoAges = [
    ['Alberta', '18+'],
    ['British Columbia', '19+'],
    ['Manitoba', '18+'],
    ['Ontario', '19+'],
    ['Prince Edward Island', '21+'],
    ['Quebec', '18+'],
    ['Saskatchewan', '18+'],
    ['New Brunswick', '19+'],
    ['Newfoundland and Labrador', '19+'],
    ['Northwest Territories', '18+'],
    ['Nova Scotia', '19+'],
    ['Nunavut', '18+'],
    ['Yukon Territories', '18+'],
];

// Canadian Marijuana Ages Data
const canadianMarijuanaAges = [
    ['Alberta', '18+'],
    ['British Columbia', '19+'],
    ['Manitoba', '19+'],
    ['New Brunswick', '19+'],
    ['Newfoundland and Labrador', '19+'],
    ['Nova Scotia', '19+'],
    ['Ontario', '19+'],
    ['Prince Edward Island', '19+'],
    ['Quebec', '21+'],
    ['Saskatchewan', '19+'],
    ['Yukon Territories', '19+'],
    ['Northwest Territories', '19+'],
    ['Nunavut', '19+'],
];

export default function AgeRequirements({
    minimumAgeEnabled,
    minimumAge,
    onMinimumAgeEnabledChange,
    onMinimumAgeChange,
}: AgeRequirementsProps) {
    const isCustomAge =
        typeof minimumAge === 'number' && minimumAge !== 18 && minimumAge !== 21;

    const handleToggle = () => {
        if (minimumAgeEnabled) {
            onMinimumAgeEnabledChange(false);
        } else {
            onMinimumAgeEnabledChange(true);
            if (!minimumAge) {
                onMinimumAgeChange(21);
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-medium text-gray-900">
                        Age Requirements
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        If your products are age restricted, you can have Real
                        ID enforce a minimum age to pass ID verification.
                        You'll be alerted if a customer is underage.
                    </p>
                </div>
                <Switch
                    checked={minimumAgeEnabled}
                    onChange={handleToggle}
                    label=""
                />
            </div>

            {minimumAgeEnabled && (
                <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium text-gray-700">
                        Minimum age to pass an ID check
                    </p>

                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="minimumAge"
                                checked={minimumAge === 18}
                                onChange={() => onMinimumAgeChange(18)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                18
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="minimumAge"
                                checked={minimumAge === 21}
                                onChange={() => onMinimumAgeChange(21)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                21
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="minimumAge"
                                checked={isCustomAge}
                                onChange={() => onMinimumAgeChange(25)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Other age
                            </span>
                        </label>

                        {isCustomAge && (
                            <div className="ml-6 mt-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Enter age"
                                    value={minimumAge || ''}
                                    onChange={(e) =>
                                        onMinimumAgeChange(
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Enter custom minimum age
                                </p>
                            </div>
                        )}

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="minimumAge"
                                checked={
                                    minimumAge === 'legal_canadian_smoking_ages'
                                }
                                onChange={() =>
                                    onMinimumAgeChange(
                                        'legal_canadian_smoking_ages'
                                    )
                                }
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Canadian and U.S. Legal Tobacco Ages
                            </span>
                        </label>

                        {minimumAge === 'legal_canadian_smoking_ages' && (
                            <div className="ml-6">
                                <Collapse title="View age restrictions by region">
                                    <div className="mt-4 space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                Canadian Tobacco Purchase Age
                                                Restrictions
                                            </h4>
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Province
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Minimum Age
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {canadianTobaccoAges.map(
                                                        ([province, age]) => (
                                                            <tr key={province}>
                                                                <td className="px-4 py-2 text-sm text-gray-900">
                                                                    {province}
                                                                </td>
                                                                <td className="px-4 py-2 text-sm text-gray-900">
                                                                    {age}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                United States Tobacco Purchase
                                                Age Restrictions
                                            </h4>
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            State
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Minimum Age
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            All States
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            21+
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            All other countries will not be
                                            checked for an age minimum.
                                        </p>
                                    </div>
                                </Collapse>
                            </div>
                        )}

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="minimumAge"
                                checked={
                                    minimumAge ===
                                    'legal_canadian_marijuana_ages'
                                }
                                onChange={() =>
                                    onMinimumAgeChange(
                                        'legal_canadian_marijuana_ages'
                                    )
                                }
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Canadian and U.S. Legal Marijuana Ages
                            </span>
                        </label>

                        {minimumAge === 'legal_canadian_marijuana_ages' && (
                            <div className="ml-6">
                                <Collapse title="View age restrictions by region">
                                    <div className="mt-4 space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                Canadian Marijuana Purchase Age
                                                Restrictions
                                            </h4>
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Province
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Minimum Age
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {canadianMarijuanaAges.map(
                                                        ([province, age]) => (
                                                            <tr key={province}>
                                                                <td className="px-4 py-2 text-sm text-gray-900">
                                                                    {province}
                                                                </td>
                                                                <td className="px-4 py-2 text-sm text-gray-900">
                                                                    {age}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                United States Marijuana Purchase
                                                Age Restrictions
                                            </h4>
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            State
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Minimum Age
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            All States
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            21+
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            All other countries will not be
                                            checked for an age minimum.
                                        </p>
                                    </div>
                                </Collapse>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
