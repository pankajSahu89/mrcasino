import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CasinoCard from "./CasinoCard";
import { COLORS } from "../constants/colors";

const AllOnlineCasinosSection = ({
    currentCasinos,
    currentPage,
    totalPages,
    casinosPerPage,
    handlePrevPage,
    handleNextPage,
    setCurrentPage
}) => {
    return (
        <section className="py-12 md:py-16 " style={{ background: COLORS.black }}>
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="flex flex-row sm:flex-row justify-center items-center text-center">
                    <h2
                        className="text-white text-center mb-3 text-4xl sm:text-5xl md:text-6xl"
                        style={{
                            fontFamily: "Jaini",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "1",
                            letterSpacing: "0",
                        }}
                    >
                        ALL ONLINE CASINOS
                    </h2>
                </div>

                {/* Casino List */}
                <div className="space-y-6">
                    {currentCasinos.map((casino, index) => (
                        <CasinoCard
                            key={casino._id}
                            number={(currentPage - 1) * casinosPerPage + index + 1}
                            image={casino.logo}
                            title={casino.name}
                            depositBonus={casino.depositBonus || "Up to €1000 + 200 Free Spins"}
                            welcomeBonus={casino.welcomeBonus || "200% Match Bonus"}
                            rating={casino.rating}
                            visits={`${casino.visits || 0}`}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-2 w-full px-44">

                    {/* Left Side - Current Page */}
                    <p
                        className="text-white"
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontStyle: "normal",
                            fontSize: "16px",
                            lineHeight: "20px",
                            letterSpacing: "0.5%",
                        }}
                    >
                        Showing 1-10 from 100
                    </p>

                    {/* Right Side - Navigation */}
                    <div className="flex items-center gap-2">

                        {/* Prev Button */}
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-md 
               bg-white border hover:bg-blue-50 disabled:opacity-40 transition"
                            style={{
                                borderColor: COLORS.primary,
                            }}
                        >
                            <FaChevronLeft
                                className="w-4 h-4"
                                style={{ color: COLORS.primary }}
                            />
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].slice(0, 5).map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = currentPage === pageNum;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md border transition`}
                                    style={{
                                        background: isActive ? COLORS.primary : "white",
                                        color: isActive ? "white" : COLORS.primary,
                                        borderColor: COLORS.primary,
                                    }}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Ellipsis */}
                        <span className="w-8 h-8 flex items-center justify-center text-white">…</span>

                        {/* Last Page Button */}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border transition"
                            style={{
                                background: currentPage === totalPages ? COLORS.primary : "white",
                                color: currentPage === totalPages ? "white" : COLORS.primary,
                                borderColor: COLORS.primary,
                            }}
                        >
                            {totalPages}
                        </button>


                        {/* Next Button */}
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-md 
                            bg-white border hover:bg-blue-50 disabled:opacity-40 transition"
                            style={{
                                borderColor: COLORS.primary,
                            }}
                        >
                            <FaChevronRight
                                className="w-4 h-4"
                                style={{ color: COLORS.primary }}
                            />
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default AllOnlineCasinosSection;
