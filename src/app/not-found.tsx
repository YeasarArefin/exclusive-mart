import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">
            <div className="w-full max-w-[500px] text-center space-y-6">
                {/* 404 Text with Animation */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-black text-gray-100">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Oops!
                        </h2>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Page Not Found
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        The page you&apos;re looking for seems to have gone shopping elsewhere. Let&apos;s get you back on track!
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-6 py-3 text-white bg-primary_red hover:bg-red-600 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Contact Support
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="relative mt-10">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="w-3 h-3 bg-primary_red rounded-full animate-bounce"></div>
                    </div>
                    <div className="h-1 w-full max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-primary_red/20 to-transparent rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
