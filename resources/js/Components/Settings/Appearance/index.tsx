import { useState } from 'react';
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
    const [contentActiveTab, setContentActiveTab] = useState<
        'intro' | 'in_review' | 'failed' | 'completed'
    >('intro');

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
                        <BrandingSection data={data} setData={setData} />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <ColorSettings data={data} setData={setData} />
                    </div>
                </div>

                {/* Right Column - Preview */}
                <div className="lg:w-96 flex-shrink-0">
                    <div className="sticky top-6">
                        <CheckContentPreview
                            data={data}
                            previewState={contentActiveTab}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
