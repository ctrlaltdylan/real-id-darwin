export const defaultCheckContent = `Hello [firstName],

We received your order [orderId], but ID verification is required to complete your order.
`;

// export const defaultImagePublicId = "Real%20ID/Screen_Shot_2020-09-17_at_5.38.59_PM.png";
export const defaultImagePublicId = 'Real%20ID/real_id_white_png.png';

export const defaultPrimaryColor = '#108043';

// there are the tags that should be overwritten with new stages in checks.
export const availableIdVerificationTags = [
    'ID verification required',
    'ID verification completed',
    'ID verification failed',
    'ID check manually approved',
    'ID check manually rejected',
];

// This tags signify that a customer has already completed ID verification and will not be challenged to IDv again
// If the merchant has the remember repeat customer flag enabled.
export const idVerifiedCustomerTags = [
    'ID verification completed',
    'ID verification complete',
    'AGE VERIFIED',
    'AgeVerified',
    'ManuallyVerified',
    'Consumer+ Verified',
];

/**
 * Below are special "middle" in review logic for MarijuanaPackaging and stores in their network.
 *
 * These stores will have special "Requires Manual Review" tags if orders are over a certain threshold AND meet normal ID verification triggers on their account
 * And when ID verification is completed on these stores, there's a replacement tag "Manual review ready"
 */
export const SPECIAL_SHOPS_WITH_MIDDLE_REVIEW_LOGIC: string[] = [
    // "420packagingweb.myshopify.com",
    // "marijuanapackaging.myshopify.com",
];
export const SPECIAL_SHOPS_MIDDLE_REVIEW_ORDER_AMOUNT_THRESHOLD = 1500.0;

export const SPECIAL_SHOPS_MIDDLE_REVIEW_REQUIRED_VERIFICATIONS_NUM = 1;

export const stepsToTitlesMapping = {
    delivered: 'Delivered',
    opened: 'Opened',
    id: 'Submitted ID',
    submitted_id: 'Submitted ID',
    back_id: 'Back of ID',
    submitted_back_id: 'Back of ID',
    submitted_proof_of_address: 'Proof of Address',
    submitted_face: 'Submitted Headshot',
    face_match: 'Face Match',
    completed: 'Completed',
    in_review: 'In Review',
};

export const MAXIMUM_FREE_TRIAL_CHECKS = 50;
