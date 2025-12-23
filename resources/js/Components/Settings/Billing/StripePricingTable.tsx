import { useEffect, useRef } from 'react';

interface StripePricingTableProps {
    shopEmail?: string;
    shopName?: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    'pricing-table-id': string;
                    'publishable-key': string;
                    'customer-email'?: string;
                    'client-reference-id'?: string;
                    'success-url'?: string;
                    'cancel-url'?: string;
                },
                HTMLElement
            >;
        }
    }
}

export default function StripePricingTable({
    shopEmail,
    shopName,
}: StripePricingTableProps) {
    const scriptLoaded = useRef(false);

    useEffect(() => {
        // Only load script once
        if (!scriptLoaded.current) {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/pricing-table.js';
            script.async = true;
            document.body.appendChild(script);
            scriptLoaded.current = true;
        }
    }, []);

    // Build return URLs for after checkout
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/settings?tab=billing&checkout=success`;
    const cancelUrl = `${baseUrl}/settings?tab=billing`;

    // Get environment variables from meta tags or use defaults
    const pricingTableId =
        (document.querySelector('meta[name="stripe-pricing-table-id"]') as HTMLMetaElement)?.content ||
        import.meta.env.VITE_STRIPE_PRICING_TABLE_ID ||
        '';
    const publishableKey =
        (document.querySelector('meta[name="stripe-publishable-key"]') as HTMLMetaElement)?.content ||
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
        '';

    if (!pricingTableId || !publishableKey) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">
                    Stripe pricing table is not configured. Please contact
                    support.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Available Plans
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                Choose the plan that best fits your business needs
            </p>

            <div className="mt-4">
                <stripe-pricing-table
                    pricing-table-id={pricingTableId}
                    publishable-key={publishableKey}
                    customer-email={shopEmail}
                    client-reference-id={shopName}
                    success-url={successUrl}
                    cancel-url={cancelUrl}
                />
            </div>
        </div>
    );
}
