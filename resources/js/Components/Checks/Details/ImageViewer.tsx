// @ts-nocheck
import * as React from 'react';
import { Lightbox } from 'react-modal-image';

import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';
import * as Sentry from '@sentry/react';
// import useApi from 'components/contexts/useApi';
// import useCurrentUser from 'components/hooks/useCurrentUser';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Check } from 'types/Check';

type Props = {
    check: Check;
};

type ActivePhoto = {
    index: number;
    type: PhotoType;
};

type PhotoType = 'id' | 'backId' | 'headshot' | 'signature' | 'proofOfAddress';

type ImagePreviewProps = {
    idx: number;
    openPhoto: (e: Event, idx: number, type: string) => void;
    blur: boolean;
    sandboxMode?: boolean;
    photo: Photo;
    showAcknowledgementModal: () => void;
    checkId: string;
};

type BoundingBox = {
    Top: number;
    Left: number;
    Width: number;
    Height: number;
};

type UnmatchedFace = {
    BoundingBox: BoundingBox;
};

type MatchedFace = {
    Face: {
        BoundingBox: BoundingBox;
    };
};

type Photo = {
    src: string;
    detailSrc: string;
    type: PhotoType;
    boundingBox: BoundingBox;
    matchedFaces: MatchedFace[];
    unmatchedFaces: UnmatchedFace[];
};

export async function downloadImage(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);

        // Create a temporary link to trigger the download
        const a = document.createElement('a');
        a.href = downloadUrl;

        // extract filename
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error(`Error downloading ${filename}:`, error);
    }
}

const ImagePreview = ({
    idx,
    photo,
    openPhoto,
    blur,
    sandboxMode,
    showAcknowledgementModal,
    checkId,
}: ImagePreviewProps) => {
    const [rotation, setRotation] = React.useState(0);
    // const { currentUser } = useCurrentUser();
    // const api = useApi();

    return (
        <div className="my-5">
            <div className="mb-2 flex justify-end gap-1">
                {/* <AiOutlineDownload
                    className="w-8 h-8 border-solid rounded-full p-1 border-slate-500 text-slate-500 cursor-pointer hover:bg-slate-100 mr-3"
                    onClick={
                        !currentUser?.downloadLiabilityAcknowledgedAt
                            ? showAcknowledgementModal
                            : () => {
                                  downloadImage(photo.src);
                                  api.post(
                                      `/api/shop/current-user/checks/${checkId}/downloaded-image`,
                                      { photoType: photo?.type },
                                  );
                              }
                    }
                /> */}
                {/* <AiOutlineRotateLeft
                    className="w-8 h-8 border-solid rounded-full p-1 border-slate-500 text-slate-500 cursor-pointer hover:bg-slate-100"
                    onClick={() => setRotation(rotation - 90)}
                />
                <AiOutlineRotateRight
                    className="w-8 h-8 border-solid rounded-full p-1 border-slate-500 text-slate-500 cursor-pointer hover:bg-slate-100"
                    onClick={() => setRotation(rotation + 90)}
                /> */}
            </div>
            <a
                className="relative mb-2 block rounded bg-white p-1 shadow hover:bg-slate-100"
                style={{ transform: `rotate(${rotation}deg)` }}
                key={photo.src}
                href={photo.detailSrc || photo.src}
                onClick={(e) => {
                    openPhoto(e, idx, photo.type);
                }}
            >
                {photo.boundingBox && (
                    <div
                        className="absolute z-10 block border-2 border-solid border-blue-600"
                        style={{
                            height: `${photo.boundingBox.Height * 100}%`,
                            width: `${photo.boundingBox.Width * 100}%`,
                            top: `${photo.boundingBox.Top * 100}%`,
                            left: `${photo.boundingBox.Left * 100}%`,
                        }}
                    ></div>
                )}

                {photo.matchedFaces?.map((row) => (
                    <div
                        className="absolute z-10 block border-2 border-solid border-green-600"
                        style={{
                            height: `${row.Face.BoundingBox.Height * 100}%`,
                            width: `${row.Face.BoundingBox.Width * 100}%`,
                            top: `${row.Face.BoundingBox.Top * 100}%`,
                            left: `${row.Face.BoundingBox.Left * 100}%`,
                        }}
                    ></div>
                ))}

                {photo.unmatchedFaces?.map((face) => (
                    <>
                        <span className="absolute right-4 top-4 z-10 flex items-center rounded bg-white p-3 text-xs font-semibold text-black">
                            <RiErrorWarningLine className="mr-1 h-5 w-5 text-yellow-500" />
                            Face doesn't match
                        </span>
                        <div
                            className="absolute z-10 block border-2 border-solid border-red-600"
                            style={{
                                height: `${face.BoundingBox.Height * 100}%`,
                                width: `${face.BoundingBox.Width * 100}%`,
                                top: `${face.BoundingBox.Top * 100}%`,
                                left: `${face.BoundingBox.Left * 100}%`,
                                background: `conic-gradient(rgb(236 89 136 / 16%) 25%, rgb(214 31 31 / 10%) 0 50%, rgb(204 42 42 / 30%) 0 75%, rgb(245 57 57 / 20%) 0) 0 0/10px 10px`,
                            }}
                        ></div>
                    </>
                ))}
                {sandboxMode && (
                    <div className="relative z-20">
                        <div className="relative z-20 bg-orange-500 p-2 text-lg font-semibold text-white no-underline">
                            Test Mode
                        </div>
                    </div>
                )}
                <img
                    className={`w-full rounded ${blur && 'blur-md'}`}
                    src={photo.detailSrc || photo.src}
                    alt={photo.type}
                />
            </a>
            <figcaption className="block text-sm text-slate-500">
                {photo.type}
            </figcaption>
        </div>
    );
};

const ImageViewer = ({ check }: Props) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [
        showLiabilityAcknowledgementModal,
        setShowLiabilityAcknowledgementModal,
    ] = React.useState(false);
    const [acceptLiability, setAcceptLiability] = React.useState(false);
    const [activePhoto, setActivePhoto] = React.useState<ActivePhoto | null>(
        null,
    );
    // const { currentUser, setCurrentUser } = useCurrentUser();
    // const api = useApi();

    const openPhoto = (e: Event, index: number, type: PhotoType) => {
        e.preventDefault();
        setActivePhoto({ index, type });
        setOpen(true);
    };

    let photos = [];

    if (check.idPhoto) {
        const matchedFaces = check.inferences?.faceMatch?.FaceMatches || [];
        const unmatchedFaces =
            check.inferences?.faceMatch?.UnmatchedFaces || [];
        let photo = {
            type: 'Front of ID',
            src: check.idPhoto,
            detailSrc: check.idPhotoDetail,
            matchedFaces,
            unmatchedFaces,
        };

        photos.push(photo);
    }

    if (check.backIdPhoto) {
        photos.push({ type: 'Back of ID', src: check.backIdPhoto });
    }

    if (check.userPhoto) {
        let photo = { type: 'Headshot', src: check.userPhoto };

        const idBoundingBox =
            check.inferences?.faceMatch?.SourceImageFace?.BoundingBox;

        if (idBoundingBox) {
            photo.boundingBox = idBoundingBox;
        }

        photos.push(photo);
    }

    if (check.signature) {
        photos.push({ type: 'E-Signature', src: check.signature });
    }

    if (check.proofOfAddress) {
        photos.push({ type: 'Proof of Address', src: check.proofOfAddress });
    }

    async function acknowledgeLiability() {
        setLoading(true);
        api.post('/api/shop/current-user/acknowledge-liability')
            .then(({ data }) => {
                setLoading(false);
                setCurrentUser(data);
                setShowLiabilityAcknowledgementModal(false);
                // url isn't available in state
                // downloadImage(url);
            })
            .catch((e) => {
                setLoading(false);
                Sentry.captureException(e);
                setToast('Issue updating. Please try again.');
            });
    }

    return (
        <div className="my-4 p-4">
            <h2 className="mb-4 text-lg font-semibold text-slate-700">
                Submitted photos ({photos.length})
            </h2>

            <div className="my-3">
                {photos.map((photo, idx) => (
                    <ImagePreview
                        key={idx}
                        idx={idx}
                        photo={photo}
                        openPhoto={openPhoto}
                        blur={check.sandboxMode}
                        sandboxMode={check.sandboxMode}
                        showAcknowledgementModal={() =>
                            setShowLiabilityAcknowledgementModal(true)
                        }
                        onAcknowledgement={acknowledgeLiability}
                        checkId={check?.id}
                    />
                ))}
            </div>

            {open && (
                <Lightbox
                    medium={
                        check.sandboxMode ? null : photos[activePhoto.index].src
                    }
                    large={
                        check.sandboxMode ? null : photos[activePhoto.index].src
                    }
                    alt={activePhoto.type}
                    onClose={() => setOpen(false)}
                    imageBackgroundColor="white"
                    className={check.sandboxMode && 'blur-md'}
                    hideDownload={true}
                    showRotate
                />
            )}
            <Modal
                open={showLiabilityAcknowledgementModal}
                title="Acknowledge Liability"
                primaryAction={{
                    content: 'Accept',
                    onAction: acknowledgeLiability,
                    disabled: !acceptLiability,
                    loading: loading,
                }}
                onClose={() => {
                    setShowLiabilityAcknowledgementModal(false);
                }}
            >
                <p className="mb-3">
                    By downloading customer photos, you acknowledge full
                    responsibility for securing this data.
                </p>
                <p className="mb-3">
                    You also agree to delete the image as required under privacy
                    laws like GDPR, CCPA, or other relevant regulations.
                </p>

                <Checkbox
                    checked={acceptLiability}
                    onChange={(v) => setAcceptLiability(v)}
                    label="I acknowledge and accept liability for downloading customer submitted images"
                />
            </Modal>
        </div>
    );
};

export default ImageViewer;
