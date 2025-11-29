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
                        className="text-white text-center mb-4 text-4xl sm:text-5xl md:text-6xl"
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
                            overview={casino.overview || "Explore a wide range of games and exciting bonuses at this top-rated online casino."}
                            minimumDeposit={casino.paymentInfo?.minimumDeposit || "$0"}


                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-2 w-full px-4 sm:px-32 gap-2 sm:gap-0">

                    {/* Left Side - Current Page */}
                    <p
                        className="text-white text-sm sm:text-base text-center sm:text-left"
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            lineHeight: "20px",
                            letterSpacing: "0.5%",
                        }}
                    >
                        Showing 1-10 from 100
                    </p>

                    {/* Right Side - Navigation */}
                    <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">

                        {/* Prev Button */}
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md 
                 bg-white border hover:bg-blue-50 disabled:opacity-40 transition"
                            style={{ borderColor: COLORS.primary }}
                        >
                            <FaChevronLeft
                                className="w-3 h-3 sm:w-4 sm:h-4"
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
                                    className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border text-sm sm:text-base transition"
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
                        <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-white text-sm sm:text-base">…</span>

                        {/* Last Page Button */}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border text-sm sm:text-base transition"
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
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md 
                 bg-white border hover:bg-blue-50 disabled:opacity-40 transition"
                            style={{ borderColor: COLORS.primary }}
                        >
                            <FaChevronRight
                                className="w-3 h-3 sm:w-4 sm:h-4"
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
