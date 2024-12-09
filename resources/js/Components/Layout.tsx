export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl space-y-10 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
