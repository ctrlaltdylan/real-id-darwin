import Card, { Section } from '@/Components/Card';
import {
    AiFillAndroid as AndroidIcon,
    AiFillApple as AppleIcon,
} from 'react-icons/ai';
import { CgBrowser as DefaultWebBrowserIcon } from 'react-icons/cg';
import {
    FaChrome as ChromeIcon,
    FaEdge as EdgeIcon,
    FaFirefox as FirefoxIcon,
    FaLaptop as LaptopIcon,
    FaMobileAlt as MobileIcon,
    FaSafari as SafariIcon,
    FaWindows as WindowsIcon,
} from 'react-icons/fa';
import { MdOutlineDeviceUnknown as DefaultOSIcon } from 'react-icons/md';
import type { Check, DeviceType } from 'types/Check';

function getDeviceIcon(device: DeviceType | undefined) {
    const mapping = {
        mobile: MobileIcon,
        tablet: MobileIcon,
        smarttv: MobileIcon,
        console: MobileIcon,
        wearable: MobileIcon,
        embedded: MobileIcon,
    };

    return mapping[device] || LaptopIcon;
}

function getBrowserIcon(browser: string | undefined) {
    if (!browser) {
        return DefaultWebBrowserIcon;
    }

    if (browser.match(/Chrome/)) {
        return ChromeIcon;
    }

    if (browser.match(/Safari/)) {
        return SafariIcon;
    }

    if (browser.match(/Edge/)) {
        return EdgeIcon;
    }

    if (browser.match(/Firefox/)) {
        return FirefoxIcon;
    }

    return DefaultWebBrowserIcon;
}

function getOSIcon(os: string | undefined) {
    if (!os) {
        return DefaultOSIcon;
    }

    if (os.match(/Windows/)) {
        return WindowsIcon;
    }

    if (os.match(/Mac OS/) || os.match(/iOS/)) {
        return AppleIcon;
    }

    if (os.match(/Android/)) {
        return AndroidIcon;
    }

    return DefaultOSIcon;
}

function CameraError({ check }: { check: Check }) {
    const cameraError = check?.cameraError;

    if (!check?.hasOwnProperty('cameraError')) {
        return <></>;
    }

    if (!cameraError && check?.hasOwnProperty('cameraError')) {
        return (
            <Section title="Camera initialized">
                <p>Camera access allowed and started successfully.</p>
            </Section>
        );
    }

    const mapping = {
        PermissionDeniedError: {
            title: 'Permission Denied',
            message:
                'The customer needs to approve access to their devices camera.',
        },
        NotReadableError: {
            title: 'Other apps or tabs using the camera',
            message:
                'The camera failed to start because one or more other apps or browser windows are using the camera. The customer needs to close the other apps using the camera in order to continue.',
        },
        OverconstrainedError: {
            title: 'Camera not compatible',
            message:
                'The camera on this customers device is not compatible with Real ID. This could be from an older device or from an out of date browser.',
        },
        DevicesNotFoundError: {
            title: 'No camera on the device',
            message:
                'This customers device does not have a camera. They can open the link on a mobile phone, or consider enabling manual uploads to allow the customer to upload photos.',
        },
    };

    const error = mapping[cameraError];

    return (
        <Section title={error?.title || 'Issue enabling the customers camera'}>
            <p>
                {error?.message ||
                    'Instruct the customer to allow the camera to be used, and to close all other apps that might be using the camera.'}
            </p>
        </Section>
    );
}

function UADetails({ check }: { check: Check }) {
    if (!check?.parsedUa) {
        return <></>;
    }
    const DeviceIcon = getDeviceIcon(check?.parsedUa?.device?.type);
    const BrowserIcon = getBrowserIcon(check?.parsedUa?.browser?.name);
    const OSIcon = getOSIcon(check?.parsedUa?.os?.name);

    return (
        <Section padding="xs">
            <div className="mb-6 grid grid-cols-3">
                <div className="my-3 flex flex-col items-center">
                    <DeviceIcon className="mb-2 text-3xl" />
                    {check.parsedUa.device.type || 'Desktop'}
                </div>
                <div className="my-3 flex flex-col items-center">
                    <OSIcon className="mb-2 text-3xl" />
                    {check.parsedUa.os.name}
                </div>
                <div className="my-3 flex flex-col items-center">
                    <BrowserIcon className="mb-2 text-3xl" />
                    {check.parsedUa.browser.name}
                </div>
            </div>
        </Section>
    );
}

export default function BrowserDetails({ check }: { check: Check }) {
    if (!check?.parsedUa) {
        return <></>;
    }

    return (
        <Card title="Browser details" padding="xs">
            <UADetails check={check} />
            <CameraError check={check} />
        </Card>
    );
}
