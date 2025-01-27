import { SettingsProvider } from '@/Components/Providers/SettingsProvider';
import Branding from '@/Components/Settings/Branding';
import IdvCheckType from '@/Components/Settings/IdvCheckType';
import Toast from '@/Components/Toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Settings({ shop, toast }: { shop: any; toast: any }) {
    const { data, setData, post, processing, errors, isDirty } = useForm(
        shop.settings,
    );

    console.log(data);

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('settings.update'), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                console.log('Settings updated');
            },
        });
    }

    return (
        <form onSubmit={submit}>
            <AuthenticatedLayout
                header={
                    isDirty ? (
                        <div className="fixed left-0 right-0 top-0 flex justify-end bg-gray-800 p-4 text-white">
                            <button
                                type="submit"
                                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                onClick={submit}
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    ) : (
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Settings
                        </h2>
                    )
                }
            >
                <Head title="Settings" />
                <SettingsProvider
                    value={{ data, setData, post, processing, errors }}
                >
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <IdvCheckType />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Branding />
                </SettingsProvider>
            </AuthenticatedLayout>
            {toast?.message && (
                <Toast
                    message={toast.message}
                    status={toast.status || 'info'}
                />
            )}
        </form>
    );
}
