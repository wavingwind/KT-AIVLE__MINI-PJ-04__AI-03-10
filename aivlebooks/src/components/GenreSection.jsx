
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import BookCard from "./BookCard";

function GenreSection({ genre, books = [] }) {
    const swiperRef = useRef(null);

    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateNavigation = (swiper) => {
        setCanPrev(!swiper.isBeginning && !swiper.isLocked);
        setCanNext(!swiper.isEnd && !swiper.isLocked);
    };

    if (books.length === 0) return null;

    return (
        <section className="w-full py-4 py-3">
            <div className="mx-auto w-full max-w-[1024px] rounded-2xl border border-[#deded9] bg-white p-4 sm:p-6">

                <div className="flex w-full items-center justify-between">
                    <h2 className="mb-1 flex items-center gap-3 text-[24px] font-medium text-[#333]">
                        <span
                        aria-hidden="true"
                        className="h-5 w-1 rounded-full bg-[#20b2aa]"
                        />
                        {genre}
                    </h2>
                </div>

                <div className="overflow-hidden">
                    <Swiper
                        slidesPerView={2.15}
                        slidesPerGroup={1}
                        spaceBetween={12}
                        speed={500}
                        watchOverflow={true}
                        grabCursor={true}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            updateNavigation(swiper);
                        }}
                        onSlideChange={updateNavigation}
                        onResize={updateNavigation}
                        onBreakpoint={updateNavigation}
                        breakpoints={{
                            640: {
                                slidesPerView: 3.3,
                                spaceBetween: 12
                            },
                            1024: {
                                slidesPerView: 5.2,
                                spaceBetween: 12
                            }
                        }}
                        className="!overflow-visible !py-5"
                    >
                        {books.map((book) => (
                            <SwiperSlide
                                key={book.id}
                                className="relative !h-auto hover:!z-20"
                            >
                                <BookCard book={book} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mt-1 flex items-center justify-end gap-6">
                    <button
                        type="button"
                        disabled={!canPrev}
                        aria-label="이전 책"
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="text-[#aaa] transition-colors hover:text-[#111] disabled:opacity-30"
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        disabled={!canNext}
                        aria-label="다음 책"
                        onClick={() => swiperRef.current?.slideNext()}
                        className="text-[#aaa] transition-colors hover:text-[#111] disabled:opacity-30"
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default GenreSection;
