import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                {/* Outer Gear */}
                <path
                    d="M50 20c-1.5 0-2.8.5-3.8 1.4L42 16l-4 4 5.4 4.2C41.3 26 40 28.3 40 31c0 4.1 3.4 7.5 7.5 7.5S55 35.1 55 31c0-2.7-1.3-5-3.4-6.8l5.4-4.2-4-4-4.2 5.4c-1-.9-2.3-1.4-3.8-1.4zM24.2 43.4l-5.4-4.2-4 4 4.2 5.4c-.9 1-1.4 2.3-1.4 3.8 0 1.5.5 2.8 1.4 3.8L14.8 62l4 4 5.4-4.2c2.1 2.1 4.5 3.4 7.2 3.4 4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5c-2.7 0-5.1 1.3-7.2 3.4L20 50l4.2-6.6zm51.6 0l4.2 6.6L84.2 50l-5.4-4.2C80.9 43.7 82.2 41.4 82.2 38.7c0-4.1-3.4-7.5-7.5-7.5S67.2 34.6 67.2 38.7c0 2.7 1.3 5 3.4 6.8l-5.4 4.2 4 4 4.2-5.4c1 .9 2.3 1.4 3.8 1.4z"
                    fill="url(#logo-gradient)"
                    className="opacity-40"
                />

                {/* Detailed Gear based on Image */}
                <g transform="translate(50,50)">
                    <circle cx="0" cy="0" r="35" fill="none" stroke="url(#logo-gradient)" strokeWidth="6" strokeDasharray="14 4" />
                    <circle cx="0" cy="0" r="25" fill="none" stroke="url(#logo-gradient)" strokeWidth="2" />

                    {/* Compass Needle */}
                    <path d="M0 -15 L4 0 L0 15 L-4 0 Z" fill="#3B82F6" transform="rotate(45)" />
                    <path d="M0 -15 L4 0 L0 0 L-4 0 Z" fill="#60A5FA" transform="rotate(45)" />

                    {/* Checkmark Arrow */}
                    <path
                        d="M-20 10 L0 25 L35 -15"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    />
                </g>

                <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
        </div>
    );
};
