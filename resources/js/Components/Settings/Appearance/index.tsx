import { useState, useEffect } from 'react';
import Card from '@/Components/Card';
import ContentEditor from './ContentEditor';
import BrandingSection from './BrandingSection';
import ColorSettings from './ColorSettings';
import CheckContentPreview from './CheckContentPreview';

interface AppearanceProps {
    data: {
        defaultContent?: string;
        emailContent?: {
            customer?: {
                check?: {
                    in_review?: string;
                    failed?: string;
                    completed?: string;
                };
            };
        };
        imageUrl?: string;
        imagePublicId?: string;
        primaryColor?: string;
        primaryButtonColor?: string;
        buttonTextColor?: string;
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function Appearance({
    data,
    setData,
    errors = {},
}: AppearanceProps) {
    // Local state for preview to work around Inertia reactivity issues
    const [previewImageUrl, setPreviewImageUrl] = useState(data.imageUrl || '');

    // Sync local state when data.imageUrl changes (e.g., on page load)
    useEffect(() => {
        if (data.imageUrl) {
            setPreviewImageUrl(data.imageUrl);
        }
    }, [data.imageUrl]);

    const [contentActiveTab, setContentActiveTab] = useState<
        'intro' | 'in_review' | 'failed' | 'completed'
    >('intro');

    // Wrapper for setData that also updates local preview state
    const handleSetData = (key: string, value: any) => {
        if (key === 'imageUrl') {
            setPreviewImageUrl(value);
        }
        setData(key, value);
    };

    // Create preview data with local imageUrl state
    const previewData = {
        ...data,
        imageUrl: previewImageUrl,
    };

    return (
        <Card title="Appearance Settings">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Settings */}
                <div className="flex-1 space-y-8">
                    <ContentEditor
                        data={data}
                        setData={setData}
                        activeTab={contentActiveTab}
                        onTabChange={(tab) =>
                            setContentActiveTab(
                                tab as
                                    | 'intro'
                                    | 'in_review'
                                    | 'failed'
                                    | 'completed',
                            )
                        }
                    />

                    <div className="border-t border-gray-200 pt-6">
                        <BrandingSection data={data} setData={handleSetData} />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <ColorSettings data={data} setData={setData} />
                    </div>
                </div>

                {/* Right Column - Preview */}
                <div className="lg:w-96 flex-shrink-0">
                    <div className="sticky top-6">
                        <CheckContentPreview
                            data={previewData}
                            previewState={contentActiveTab}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
