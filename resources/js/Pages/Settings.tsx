import Card from '@/Components/Card';
import Layout from '@/Components/Layout';
import SettingsNavigation from '@/Components/Settings/Navigation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Settings() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Settings
                </h2>
            }
        >
            <SettingsNavigation />
            <Layout>
                <Card>Settings Page Content</Card>
            </Layout>
        </AuthenticatedLayout>
    );
}
