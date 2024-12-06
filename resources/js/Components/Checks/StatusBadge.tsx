import Badge from '../Badge';

export default function renderBadge({
    step,
    success,
}: {
    step: string;
    success: boolean;
}) {
    if (step === 'draft') {
        return <Badge progress="incomplete">Draft</Badge>;
    } else if (step === 'delivered') {
        return (
            <Badge progress="incomplete" status="default">
                Delivered
            </Badge>
        );
    } else if (step === 'opened') {
        return (
            <Badge progress="incomplete" status="default">
                Link Opened
            </Badge>
        );
    } else if (step === 'id') {
        return (
            <Badge progress="incomplete" status="default">
                1 of 2 photos submitted
            </Badge>
        );
    } else if (step === 'submitted-photo') {
        return (
            <Badge progress="incomplete" status="default">
                2 of 2 photos submitted
            </Badge>
        );
    } else if (step === 'face_match') {
        return (
            <Badge progress="incomplete" status="default">
                Face match in Progress
            </Badge>
        );
    } else if (step === 'in_review') {
        return (
            <Badge progress="incomplete" status="warning">
                Needs Reviewed
            </Badge>
        );
    } else if (step === 'completed' && success) {
        return (
            <Badge progress="completed" status="success">
                Verified
            </Badge>
        );
    } else if (step === 'completed' && !success) {
        return (
            <Badge progress="completed" status="critical">
                Failed Verification
            </Badge>
        );
    } else {
        return <></>;
    }
}
