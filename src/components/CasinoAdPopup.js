import React, { useEffect, useState } from "react";
import { getBanners } from "../api/bannerApi";

const CasinoAdPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [banner, setBanner] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    // Fetch banners & select random
    const loadRandomBanner = async () => {
        try {
            const res = await getBanners();
            const banners = res?.data?.data || [];

            if (banners.length > 0) {
                const randomIndex = Math.floor(Math.random() * banners.length);
                setBanner(banners[randomIndex]);
            }
        } catch (error) {
            console.error("Failed to load banners", error);
        }
    };

    // Load banner on page load
    useEffect(() => {
        loadRandomBanner();
    }, []);

    // Show popup after 5 seconds
    useEffect(() => {
        if (!banner) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [banner]);

    // Auto-close popup after 10 seconds
    useEffect(() => {
        if (!isOpen) return;

        const autoClose = setTimeout(() => {
            setIsOpen(false);
        }, 10000); // 10 seconds

        return () => clearTimeout(autoClose);
    }, [isOpen]);

    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    // Dynamically adjust image dimensions
    const handleImageLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
    };

    if (!isOpen || !banner) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
        <div
            className="relative w-full max-w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-fadeIn"
        >
            {/* Banner Image */}
            <img
                src={banner.image}
                alt=""
                className="w-full h-full object-cover"
            />

            {/* Play Now Button */}
            <a
                href={banner.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
                <div className="px-8 py-4 rounded-full text-black font-semibold shadow-lg bg-white/40 hover:bg-white/30 transition">
                    Play Now
                </div>
            </a>

            {/* Close Button */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white text-2xl font-bold z-10 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
                ✕
            </button>
        </div>
    </div>
);

};

export default CasinoAdPopup;
