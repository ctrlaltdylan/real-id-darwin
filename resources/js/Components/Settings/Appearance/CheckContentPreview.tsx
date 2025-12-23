import get from 'lodash/get';

interface CheckContentPreviewProps {
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
        primaryColor?: string;
        primaryButtonColor?: string;
        buttonTextColor?: string;
    };
    previewState: 'intro' | 'in_review' | 'failed' | 'completed';
}

const defaultContents = {
    intro: 'Hello [firstName],\n\nWe received your order [orderId], but ID verification is required to complete your order.',
    in_review:
        'Hello [firstName],\n\nWe have received your ID for verification, but we were unable to automatically verify it.\n\nA team member will be manually reviewing your case shortly.',
    failed: 'Hello [firstName],\n\nUnfortunately, after review, we were not able to verify your ID.\n\nPlease contact customer support for the status of your order.',
    completed:
        'Hello [firstName],\n\nThanks for completing ID verification!\n\nYour order has been confirmed and will be processed shortly.',
};

const defaultLogoUrl =
    'https://res.cloudinary.com/tinyhouse/image/upload/v1/real-id-logo';

export default function CheckContentPreview({
    data,
    previewState,
}: CheckContentPreviewProps) {
    const getContent = () => {
        switch (previewState) {
            case 'intro':
                return data.defaultContent || defaultContents.intro;
            case 'in_review':
                return get(
                    data,
                    'emailContent.customer.check.in_review',
                    defaultContents.in_review,
                );
            case 'failed':
                return get(
                    data,
                    'emailContent.customer.check.failed',
                    defaultContents.failed,
                );
            case 'completed':
                return get(
                    data,
                    'emailContent.customer.check.completed',
                    defaultContents.completed,
                );
            default:
                return data.defaultContent || defaultContents.intro;
        }
    };

    // Replace shortcodes with sample data for preview
    const previewContent = getContent()
        .replace(/\[firstName\]/g, 'John')
        .replace(/\[lastName\]/g, 'Doe')
        .replace(/\[orderId\]/g, '#1234')
        .replace(/\[shopName\]/g, 'Your Store')
        .replace(/\[customerEmail\]/g, 'john@example.com')
        .replace(/\[phone\]/g, '+1 555-0123');

    const logoUrl = data.imageUrl || defaultLogoUrl;
    const primaryColor = data.primaryColor || '#007DCC';
    const buttonColor =
        data.primaryButtonColor || data.primaryColor || '#007DCC';
    const buttonTextColor = data.buttonTextColor || '#ffffff';

    const getButtonText = () => {
        switch (previewState) {
            case 'intro':
                return 'Start ID Check';
            case 'in_review':
                return 'View Status';
            case 'failed':
                return 'Contact Support';
            case 'completed':
                return 'View Order';
            default:
                return 'Start ID Check';
        }
    };

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Preview</h3>
            <p className="text-sm text-gray-500 mb-4">
                This is how your ID check will appear to customers
            </p>

            <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {/* Logo Header */}
                <div
                    className="text-center py-6 px-4"
                    style={{ backgroundColor: primaryColor }}
                >
                    <img
                        src={logoUrl}
                        alt="Company Logo"
                        className="max-h-16 mx-auto object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        onError={(e) => {
                            // Hide broken images
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>

                {/* Content */}
                <div className="bg-white p-6">
                    <div
                        className="whitespace-pre-line text-sm text-gray-700 leading-relaxed"
                        style={{ minHeight: '100px' }}
                    >
                        {previewContent}
                    </div>

                    {/* Action Button */}
                    <div className="text-center mt-6">
                        <span
                            className="inline-block px-6 py-3 rounded font-semibold text-sm uppercase tracking-wide cursor-pointer transition-transform hover:-translate-y-0.5"
                            style={{
                                backgroundColor: buttonColor,
                                color: buttonTextColor,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            {getButtonText()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
