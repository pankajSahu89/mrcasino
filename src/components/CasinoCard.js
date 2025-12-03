import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../constants/colors";

const CasinoCard = ({
  id,
  image,
  title,
  description,
  depositBonus,
  welcomeBonus,
  wagering,
  rating,
  visits,
  number,
  overview,
  minimumDeposit,
}) => {
  const starCount = Math.floor(rating);
  const totalStars = 5;

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return (
    <div className="flex justify-center p-4">
      <div
        className="
    w-full max-w-[1299px]
    min-h-[242px] md:h-[242px]
    bg-[#1F1F1F] 
    rounded-[24px] 
    border border-black300 
    shadow-lg 
    flex 
    flex-col md:flex-row
    justify-between 
    px-4 sm:px-[26px] 
    py-4 sm:py-[24px] 
    opacity-100
  "
      >

       
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">

          <div className="flex flex-row items-center justify-center md:justify-start gap-4 md:gap-6 w-full md:w-auto">
         
            <div
              className="
      hidden md:flex
      font-[Jaini] 
      text-[52px] 
      leading-[51px] 
      w-[41px] 
      items-center flex-shrink-0
    "
              style={{ fontWeight: 600, color: COLORS.Red }}
            >
              #{number}
            </div>

            <div className="flex items-center flex-shrink-0 relative w-[60%] md:w-auto">
           
              <div
                className="
        md:hidden
        absolute top-2 left-2 z-10
        font-[Jaini] 
        text-[36px] 
        leading-[36px] 
        flex items-center
      "
                style={{ fontWeight: 600, color: COLORS.Red }}
              >
                #{number}
              </div>

              <img
                src={image}
                alt={title}
                className="
        w-full md:w-[256.3px] 
        h-auto md:h-[159px] 
        object-cover 
        rounded-[12px] 
        shadow-[0px_3px_18px_-3px_#267BDC33]
        opacity-100
        md:m-6
      "
              />
            </div>
          </div>



          {/* Rating + Title + Description */}
          <div className="flex flex-col justify-center items-start space-y-2 sm:space-y-4 sm:p-4 sm:m-8">
           
            <div className="flex flex-row items-center w-full justify-between sm:justify-start sm:gap-4">

              <div className="flex items-center gap-2">
                <p
                  className="text-white text-base sm:text-lg font-Medium"
                  style={{ fontFamily: 'Oswald', lineHeight: '100%' }}
                >
                  {rating}
                </p>

                <div className="flex">
                  {Array(totalStars).fill().map((_, index) => (
                    <svg
                      key={index}
                      viewBox="0 0 24 24"
                      className="w-3 h-3 sm:w-4 sm:h-4 mx-[1px]"
                      fill={index < starCount ? "#4aa8ff" : "white"}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>

              <span
                className="text-white text-[12px] sm:text-[14px] font-normal  text-center  ml-auto sm:ml-0"
                style={{
                  fontFamily: 'Oswald',
                }}
              >
              {visits}+ Users Rated
              </span>

            </div>



            <h2
              className="text-white pt-2 sm:pt-4 font-semibold text-[20px] sm:text-[24px] tracking-[0.02em]"
              style={{
                fontFamily: 'Oswald, sans-serif',
                lineHeight: '100%',

              }}
            >
              {title}
            </h2>

            <div className="flex flex-col items-start">
              <p
                className="text-gray-300 text-[12px] sm:text-[14px] font-normal max-w-md line-clamp-2 tracking-normal"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: '100%',
                }}
              >
                {overview}
              </p>
            </div>


            {/* Bonuses Row */}
            <div className="pt-2 sm:pt-3 text-sm">

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start 
                  grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-4">
          
                <div className="flex flex-col items-center w-full sm:w-[120px] break-words">
                  <p
                    className="pb-1 sm:pb-2 text-[11px] sm:text-[13px] font-medium tracking-[0.04em] text-center"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', color: COLORS.primary }}
                  >
                    Welcome Bonus
                  </p>
                  <p
                    className="text-white text-[11px] sm:text-[13px] font-normal text-center break-words"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', letterSpacing: '0%' }}
                  >
                    {welcomeBonus}
                  </p>
                </div>

             
                <div className="flex flex-col items-center w-full sm:w-[120px] break-words">
                  <p
                    className="pb-1 sm:pb-2 text-[11px] sm:text-[13px] font-medium tracking-[0.04em] text-center"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', color: COLORS.primary }}
                  >
                    Min deposit
                  </p>
                  <p
                    className="text-white text-[11px] sm:text-[13px] font-normal text-center break-words"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', letterSpacing: '0%' }}
                  >
                    {minimumDeposit}
                  </p>
                </div>

                <div className="flex flex-col items-center w-full sm:w-[120px] break-words">
                  <p
                    className="pb-1 sm:pb-2 text-[11px] sm:text-[13px] font-medium tracking-[0.04em] text-center"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', color: COLORS.primary }}
                  >
                    Wagering
                  </p>
                  <p
                    className="text-white text-[11px] sm:text-[13px] font-normal text-center break-words"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', letterSpacing: '0%' }}
                  >
                    {wagering}
                  </p>
                </div>

                <div className="flex flex-col items-center w-full sm:w-[120px] break-words">
                  <p
                    className="pb-1 sm:pb-2 text-[11px] sm:text-[13px] font-medium tracking-[0.04em] text-center"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', color: COLORS.primary }}
                  >
                    Deposit Bonus
                  </p>
                  <p
                    className="text-white text-[11px] sm:text-[13px] font-normal text-center break-words"
                    style={{ fontFamily: 'Oswald, sans-serif', lineHeight: '100%', letterSpacing: '0%' }}
                  >
                    {depositBonus}
                  </p>
                </div>

              </div>
            </div>


          </div>

        </div>

        {/* RIGHT SIDE BUTTON */}
        <div className="flex flex-col justify-center items-center w-full md:w-auto space-y-2 sm:space-y-3 mt-4 md:mt-0 md:mx-auto">
          <p
            className="text-[12px] sm:text-[14px] underline underline-offset-2  font-medium text-center"
            style={{
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: COLORS.white,
            }}
          >

            Discover More</p>

          <Link
            to={`/casinos/${slug}`}
            state={{ casinoId: id }}
            className="text-white px-8 sm:px-12 py-2.5 sm:py-3 rounded-lg font-semibold w-full md:w-auto text-center text-[14px] sm:text-base"
            style={{ backgroundColor: COLORS.primary }}
          >
            Play Now
          </Link>
        </div>


      </div>
    </div>
  );
};

export default CasinoCard;
