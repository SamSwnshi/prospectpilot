import "./globals.css";

export const metadata = {
    title: 'ProspectPilot',
    description: 'AI-powered lead generation and outreach platform',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 min-h-screen flex flex-col">
                <header className="bg-white shadow p-4 text-center font-bold text-xl">ProspectPilot</header>
                <main className="flex-grow">{children}</main>
                <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600 border-t">
                    © {new Date().getFullYear()} ProspectPilot |{' '}
                    <a href="/terms" className="underline">Terms of Use</a> |{' '}
                    <a href="/privacy" className="underline">Privacy Policy</a> | Unsubscribe
                </footer>
            </body>
        </html>
    );
}
