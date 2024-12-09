// UncontrolledLottie.jsx
import animationData from '@/Components/Animations/lottie_id_scan_anitmation.json';
import Lottie from 'react-lottie';

function IdScanAnimation({ height = 150, width = 150 }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Lottie options={defaultOptions} height={height} width={width} />
        </div>
    );
}

export default IdScanAnimation;
