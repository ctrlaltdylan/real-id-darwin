import { useState, useRef } from 'react';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';

interface BrandingSectionProps {
    data: {
        imageUrl?: string;
        imagePublicId?: string;
    };
    setData: (key: string, value: any) => void;
}

export default function BrandingSection({ data, setData }: BrandingSectionProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('upload_preset', 'real_id_unsigned');
        formData.append('file', file);

        try {
            const { data: uploadData } = await axios.post(
                'https://api.cloudinary.com/v1_1/tinyhouse/image/upload',
                formData,
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                },
            );

            setData('imageUrl', uploadData.secure_url);
            setData('imagePublicId', uploadData.public_id);
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload logo. Please try again.');
        } finally {
            setUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveLogo = () => {
        setData('imageUrl', '');
        setData('imagePublicId', '');
    };

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Branding</h3>

            <div>
                <InputLabel value="Logo" />

                {data.imageUrl && (
                    <div className="mt-2 mb-4">
                        <img
                            src={data.imageUrl}
                            alt="Company logo"
                            className="max-h-24 object-contain bg-gray-100 p-2 rounded-md"
                        />
                    </div>
                )}

                <div className="mt-2 flex items-center gap-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="logo-upload"
                    />
                    <SecondaryButton
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading
                            ? 'Uploading...'
                            : data.imageUrl
                              ? 'Change Logo'
                              : 'Upload Logo'}
                    </SecondaryButton>

                    {data.imageUrl && (
                        <button
                            type="button"
                            onClick={handleRemoveLogo}
                            className="text-sm text-red-600 hover:text-red-800"
                        >
                            Remove
                        </button>
                    )}
                </div>

                <p className="mt-2 text-sm text-gray-500">
                    JPG, PNG or GIF. Max 5MB.
                </p>

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}
