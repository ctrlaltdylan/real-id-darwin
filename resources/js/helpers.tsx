import * as chrono from 'chrono-node';
import { format } from 'date-fns';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import has from 'lodash/has';
import intersection from 'lodash/intersection';
import { idVerifiedCustomerTags } from './constants';

export type RenderContentParams = {
    firstName?: string;
    lastName?: string;
    selectedOrder?: string | number;
};

/**
 *  Render a template content string into human readable format
 *
 * NOTE: yes it's called `selectedOrder` but in fact it's the order ID (#1111).
 *   It's a pullover from the new.js page. I'm just tired at the moment.
 *
 * @param {String} content
 * @param {Object} params
 * @return {String}
 */
export const renderContent = (
    content: string = '',
    params: RenderContentParams = {},
    forEmail: boolean = false,
) => {
    let renderedContent = content
        .replace(/\[firstName\]/g, params?.firstName || '')
        .replace(/\[lastName\]/g, params?.lastName || '');

    // not doing this leaves a weird 'undefined' string
    if (params.selectedOrder) {
        renderedContent = renderedContent.replace(
            /\[orderId\]/g,
            String(params.selectedOrder),
        );
    } else {
        renderedContent = renderedContent.replace(/\[orderId\]/g, '');
    }
    if (forEmail) {
        renderedContent = renderedContent.replace(/\n+/g, '<br/><br/>');
    }

    return renderedContent.replace('undefined', '');
};

export type Coordinates = {
    latitude: string;
    longitude: string;
};

export function addressesMatch(
    shipping: Coordinates,
    billing: Coordinates,
): boolean {
    const billingAndShippingAddressAvailable =
        shipping?.longitude &&
        shipping?.latitude &&
        billing?.longitude &&
        billing?.latitude;

    if (!billingAndShippingAddressAvailable) {
        // no billing address or shipping address found on the order
        // Then automatically return false to be safe
        return true;
    }

    return (
        shipping.longitude == billing.longitude &&
        shipping.latitude == billing.latitude
    );
}

/**
 * Given the order, retrieve the phone number associated with it
 *
 * The precedence is customer.phone, then billingAddress.phone, then shippingAddress.phone
 *
 * @param {Object} order
 * @returns String || null
 */
export function getPhoneFromOrder(order: GraphQLShopifyOrder | IOrder) {
    return (
        get(order, 'customer.phone', get(order, 'billingAddress.phone')) ||
        get(order, 'shippingAddress.phone')
    );
}
/**
 * DEPRECATED, should no longer be in use
 */
export const plans = {
    'per-check': {
        name: 'Per Check Pricing',
        oridinalTerms: {},
        pricing: {
            cappedAmount: 100.0,
            terms: '$1.25 per check',
        },
    },
    entry: {
        name: 'Entry - 20 ID checks per month',
        ordinalTerms: {
            checksPerMonth: 20,
        },
        pricing: {
            interval: 'EVERY_30_DAYS',
            price: {
                amount: 20.0,
                currencyCode: 'USD',
            },
        },
    },
    small: {
        name: 'Small - 50 ID checks per month',
        ordinalTerms: {
            checksPerMonth: 50,
        },
        pricing: {
            interval: 'EVERY_30_DAYS',
            price: {
                amount: 75.0,
                currencyCode: 'USD',
            },
        },
    },
    medium: {
        name: 'Medium - 100 ID checks per month',
        ordinalTerms: {
            checksPerMonth: 100,
        },
        pricing: {
            interval: 'EVERY_30_DAYS',
            price: {
                amount: 125.0,
                currencyCode: 'USD',
            },
        },
    },
    large: {
        name: 'Large - 500 ID checks per month',
        ordinalTerms: {
            checksPerMonth: 500,
        },
        pricing: {
            interval: 'EVERY_30_DAYS',
            price: {
                amount: 500.0,
                currencyCode: 'USD',
            },
        },
    },
};

/**
 * Return a Postmark API friendly string of emails to send ID verification events to
 *
 * @param {Object} shop
 * @returns String
 */
export function getShopContactEmails(shop: Shop) {
    const contactEmails = get(shop, 'settings.contactEmails', []);
    if (contactEmails.length > 0) {
        return contactEmails.join(',');
    }

    return get(shop, 'settings.contactEmail', shop.email);
}

/**
 * Is this customer already verified?
 *
 * @Array customerTags
 * @return Boolean
 */
export function isAlreadyVerifiedCustomer(customerTags: string[]) {
    return intersection(customerTags, idVerifiedCustomerTags).length > 0;
}

export const vouchedToCardinalMapping = {
    InvalidIdError: "The customer provided an ID we didn't recognize.",
    FaceMatchError:
        "The customer's headshot photo doesn't match the face in the ID document photo.",
    InvalidIdPhotoError:
        'The ID did not meet the minimum confidence threshold. Possible issues include poor image quality (too dark or blurry), obscured critical fields, or an unsupported ID type.',
    MissingIdFieldsError:
        'The customer provided an ID that is missing or covered required fields.',
    UnsupportedIdPhotoError: "The customer provided an ID we didn't recognize.",
    BlacklistedDocument: "This customer's ID is on your blocked IDs list.",
    IdPhotoForHeadshot:
        'This customer provided a photo of their ID when prompted for their headshot',
    UnreadableIdError:
        'The customer provided an ID photo that was unreadable due to glare, blurriness or bad quality.',
    InvalidUserPhotoError:
        "We weren't able to confidently find the customers face in their headshot photo.",
    ExpiredIdError: 'The customer provided an expired ID.',
    IdOutOfFocus: 'The ID photo is out of focus',
    DarkIdPhoto: 'The ID photo is too dark',
    OverExposedIdPhoto: 'The ID photo is over exposed',
    ShippingAddressCrossCheckFailed:
        "The address on the provided ID does not match the order's shipping address.",
    // keeping this mapping for the legacy version
    LastNameCrossCheckFailed:
        "The name on the provided ID does not match the customer's name on the billing address.",
    BillingNameCrossCheckFailed:
        "The name on the provided ID does not match the customer's name on the billing address.",
    ShippingNameCrossCheckFailed:
        'Failed ID verification because name on the ID did not match the name on the shipping address.',
    CreditCardNameCrossCheckFailed:
        'The name on the provided ID does not match the name on the credit card for the order.',
    UnderageIdError: 'The customer provided an underage ID.',
    FaceNotFoundError:
        'The customer did not provide a photo of their face for the headshot portion of the ID check.',
    InvalidRequestError: 'There was an error analyzing their ID.',
    MultipleFacesError:
        'The customer submitted a photo that contained multiple faces for the headshot portion of their ID check.',
    AuthenticationError:
        'There was an system level issue when processing the customers ID check.',
    ConnectionError:
        'There was an system level issue when processing the customers ID check.',
    UnknownSystemError:
        'There was an system level issue when processing the customers ID check.',
    SuspiciousIdPhoto:
        'This ID photo shows signs of manipulation, or has been taken from a public source.',
};

export function mapVouchedErrors(errors: Error[]) {
    return errors.reduce((sum, error) => {
        const translated = vouchedToCardinalMapping[error.type];

        if (translated) {
            return [...sum, translated];
        }

        return sum;
    }, []);
}

export function buildSubjectLine({
    base = null,
    insertAt = 'has completed ID verification',
    firstName,
    lastName,
    orderId,
    shopName = null,
}: {
    base?: string | null;
    insertAt?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    orderId?: string | number | null;
    shopName?: string | null;
}) {
    let subjectLine =
        base || '[Notice] A customer has completed ID verification';
    if (firstName && lastName) {
        subjectLine = subjectLine.replace(
            /A customer/i,
            `${firstName} ${lastName}`,
        );
    }

    if (orderId) {
        // inject the message in the right spot in the string
        const position = subjectLine.indexOf(insertAt);
        return (
            subjectLine.substring(0, position) +
            `with order ${String(orderId)} ${shopName ? `on ${shopName} ` : ''}` +
            subjectLine.substring(position)
        );
    }

    return subjectLine;
}

export function convertToSimpleStatus(check: Check | PublicCheck) {
    /**
   *  "delivered",
      "opened",
      "id",
      "face", // personally I don't think this step exists...it seems like it skips from "id" to "face_match"
      "completed",
   */
    if (
        ['delivered', 'opened', 'id', 'face', 'in_review'].includes(check.step)
    ) {
        return 'in_progress';
    }

    if (check.step == 'completed' && get(check, 'job.result.success')) {
        return 'verified';
    }

    if (check.step == 'completed' && !get(check, 'job.result.success')) {
        return 'failed';
    }
}

/**
 * Get the plan, but a workaround for WC shops that have a different data structure
 *
 * @param {Shop} shop
 * @returns {String}
 */
export function getShopPlan(shop: Shop) {
    if (shop.platform == 'wc') {
        return shop.usagePlan;
    }

    return shop.subscriptionPlan;
}

/**
 * Interpret the check's current status into a Shopify note
 *
 * @param {Check} check
 * @returns String
 */
export const interpretCheckNote = (check: Check) => {
    if (check.step == 'delivered') {
        return 'Delivered an ID check to the customer';
    }

    if (check.step == 'opened') {
        return 'Customer opened the ID check';
    }

    if (check.step == 'id') {
        return 'Customer uploaded their ID photo';
    }

    if (check.step == 'face_match') {
        return 'Customer uploaded their headshot photo';
    }

    if (check.step == 'completed' && check.job.result) {
        return 'Customer completed ID verification';
    }

    if (check.step == 'completed' && !check.job.result) {
        return 'Customer failed ID verification';
    }
};

/**
 * Interpret the check's current status into a Shopify tag
 *
 * @param {Check} check
 * @returns String
 */
export const getCurrentOrderTagCandidate = (check: Check) => {
    if (check.step == 'delivered') {
        return 'ID verification required';
    }

    if (check.step == 'opened') {
        return 'ID verification required';
    }

    if (check.step == 'id') {
        return 'ID verification required';
    }

    // NOTE: this particular status is deprecated and replaced with "id", but leaving a catch here just in case
    if (check.step == 'submitted_id') {
        return 'ID verification required';
    }

    if (check.step == 'face_match') {
        return 'ID verification required';
    }

    // we shouldn't get this far if there isn't a check.job.result.success verdict in place
    if (!has(check, 'job.result.success')) {
        throw new Error(`Unrecognized check status: ${check.step}`);
    }

    if (check.step == 'completed' && check?.job?.result?.success) {
        return 'ID verification completed';
    }

    const jobErrors = get(check, 'job.errors', []);

    // NOTE: makes sure this more specific check is above the general ID check failure one.
    // Otherwise, underage submissions won't be tagged specially different.
    if (
        check.step == 'completed' &&
        !check?.job?.result?.success &&
        jobErrors.find((e: Error) => e.type === 'UnderageIdError')
    ) {
        return 'Underage ID submitted';
    }

    // Always keep the general catch all "ID verification failed" status last
    if (check.step == 'completed' && !check?.job?.result?.success) {
        return 'ID verification failed';
    }
};

/**
 * format a date according to the shop settings
 *
 * @param {String | null } date -
 * @param {String} format
 */
export const formatVouchedDate = (
    date: string,
    formatPattern = 'MM/dd/yyyy',
) => {
    // example 12/06/2023
    if (!date) {
        return '';
    }

    try {
        const parsed = chrono.strict.parseDate(date);

        return format(parsed, formatPattern);
    } catch (e) {
        return '';
    }
};

export function generateAvailableSteps(check: Check): CheckStep[] {
    let steps: CheckStep[] = ['delivered', 'opened'];

    let algo = check?.algoConfig?.frontend || 'vouched';

    if (check?.proofOfAddressRequired) {
        steps.push('submitted_proof_of_address');
    }

    if (algo === 'tahoe') {
        steps.push('submitted_id');
    } else if (algo === 'vouched') {
        steps.push('id');
    }

    if (check?.includeBackId) {
        steps.push('submitted_back_id');
    }

    if (check.idCheckType === 'idv') {
        steps.push('submitted_face');
    }

    steps.push('completed');

    return steps;
}

export function hasPermission(
    staffMember: StaffMember,
    permission: Permission,
) {
    return staffMember.permissions.includes(permission);
}

/**
 * Extract the first alphabet name and captialize it
 *
 * "DYLAN JOHN" => "Dylan"
 *
 * @param name
 * @returns
 */
export function prettifyName(name: string): string {
    const parts = name.split(' ');

    if (parts[0]) {
        return capitalize(parts[0] || '');
    }

    return name;
}
