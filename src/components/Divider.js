import React from "react";
import { COLORS } from "../constants/colors";

const Divider = () => {
    const items = [
        "ACTION - PACKED",
        "GAMING SPANING",
        "ACTION - PACKED",
        "BIG WINS",
        "COLLECTIONS",
    ];

    return (
        <div
            className="w-full py-4 overflow-x-auto whitespace-nowrap"stykle={{ backgroundColor:COLORS.black }}
            style={{
                transform: "skewY(-2deg)",   // tilt effect
                transformOrigin: "left center"
            }}
        >
            <div
                className="flex items-center gap-10 mx-auto"
                style={{ transform: "skewY(3deg)" }} 
                /* Cancel skew for inner text */
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-white font-semibold text-lg"
                    >
                        <span className="text-[#00d9ff] text-2xl">✨</span>
                        <span className="tracking-wider">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Divider;
