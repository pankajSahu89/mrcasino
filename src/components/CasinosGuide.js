import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../constants/colors";

const CasinoGuide = ({ data }) => {
    const sections = Array.isArray(data?.sections) ? data.sections : [];
    const [activeId, setActiveId] = useState(sections[0]?.id || null);
    const sectionRefs = useRef([]);

    // Always call the hook, even if sections are empty
    useEffect(() => {
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: "0px 0px -50% 0px", threshold: 0 }
        );

        sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

        return () => observer.disconnect();
    }, [sections]);

    // Early return is fine here
    if (!data || sections.length === 0) return null;

    return (
        <section className="mx-auto px-4 sm:px-8 md:px-20 py-10"style={{ backgroundColor: COLORS.black }}>
            <h2
                className="text-white text-center mb-4 text-4xl sm:text-5xl md:text-6xl"
                style={{
                    fontFamily: "Jaini",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "1",
                    letterSpacing: "0",
                }}
            >
                {data.title}
            </h2>

            <div className="flex flex-col md:flex-row gap-6 p-4">
                {/* LEFT: TABLE OF CONTENTS */}
                <aside className="hidden md:block w-full md:w-1/4  border border-[#267BDC] rounded-xl p-4 mb-6 sticky top-20 h-[80vh] overflow-y-auto">
                    <h3 className="text-white text-2xl  font-semibold mb-4">Contents</h3>
                    <ul className="space-y-2">
                        {sections.map((section, index) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
                                        setActiveId(section.id); // Make sure activeId updates on click
                                    }}
                                    className={`block px-3 py-2 rounded-md text-lg transition ${activeId === section.id
                                            ? "text-white"
                                            : "text-gray-300 hover:text-blue-400"
                                        }`}
                                    style={
                                        activeId === section.id
                                            ? {
                                                background: "linear-gradient(89.97deg, #267BDC -18.4%, rgba(38, 123, 220, 0) 88.98%)",
                                            }
                                            : {}
                                    }
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}

                    </ul>
                </aside>

                {/* RIGHT: CONTENT */}
                <main className="w-full md:w-3/4 mb-6 p-4 md:p-6 space-y-10 mx-auto">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            id={section.id}
                            ref={(el) => (sectionRefs.current[index] = el)}
                            className="scroll-mt-24"
                        >
                            <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-3">
                                {section.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">{section.text}</p>
                        </div>
                    ))}
                </main>
            </div>
        </section>
    );
};

export default CasinoGuide;
