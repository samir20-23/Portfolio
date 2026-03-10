import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-950 text-white">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="text-gray-400 mb-8">Could not find the requested resource.</p>
            <Link
                href="/"
                className="px-8 py-3 bg-purple-600/10 text-purple-400 rounded-full hover:bg-purple-600/20 transition-all font-bold border border-purple-500/20"
            >
                Return Home
            </Link>
        </main>
    );
}
