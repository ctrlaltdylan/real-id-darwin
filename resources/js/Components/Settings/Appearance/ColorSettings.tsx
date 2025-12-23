import { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import InputLabel from '@/Components/InputLabel';

interface ColorSettingsProps {
    data: {
        primaryColor?: string;
        primaryButtonColor?: string;
        buttonTextColor?: string;
    };
    setData: (key: string, value: any) => void;
}

interface ColorPickerFieldProps {
    label: string;
    description: string;
    color: string;
    onChange: (color: string) => void;
}

function ColorPickerField({
    label,
    description,
    color,
    onChange,
}: ColorPickerFieldProps) {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div className="relative">
            <InputLabel value={label} />
            <p className="text-sm text-gray-500 mb-2">{description}</p>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="w-10 h-10 rounded-md border border-gray-300 shadow-sm cursor-pointer"
                    style={{ backgroundColor: color }}
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 max-w-[120px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-mono"
                />
            </div>
            {showPicker && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowPicker(false)}
                    />
                    <div className="absolute z-20 mt-2">
                        <ChromePicker
                            color={color}
                            onChange={(result: ColorResult) =>
                                onChange(result.hex)
                            }
                            disableAlpha={true}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default function ColorSettings({ data, setData }: ColorSettingsProps) {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Colors</h3>

            <div className="space-y-6">
                <ColorPickerField
                    label="Primary Color"
                    description="Background color for the ID check header"
                    color={data.primaryColor || '#007DCC'}
                    onChange={(color) => setData('primaryColor', color)}
                />

                <ColorPickerField
                    label="Button Color"
                    description="Color for action buttons"
                    color={
                        data.primaryButtonColor ||
                        data.primaryColor ||
                        '#007DCC'
                    }
                    onChange={(color) => setData('primaryButtonColor', color)}
                />

                <ColorPickerField
                    label="Button Text Color"
                    description="Text color for action buttons"
                    color={data.buttonTextColor || '#ffffff'}
                    onChange={(color) => setData('buttonTextColor', color)}
                />
            </div>
        </div>
    );
}
