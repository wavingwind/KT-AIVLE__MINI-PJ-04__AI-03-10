
import { useRef } from "react";
import BookCard from "./BookCard";

function GenreSection({ genre, books }) {
    const sliderRef = useRef(null);

    const moveSlide = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.firstElementChild;
        if (!card) return;

        const gap = parseFloat(getComputedStyle(slider).gap) || 0;

        slider.scrollBy({
            left: direction * (card.getBoundingClientRect().width + gap),
            behavior: "smooth"
        });
    };

    return (
        <section className="w-full py-10">
            <div className="mx-auto mb-6 flex max-w-[1440px] items-center justify-between px-4 md:px-8">
                <h2 className="font-headline-md text-headline-md text-primary tracking-tight">
                    {genre}
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => moveSlide(-1)}
                        aria-label="이전 책"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => moveSlide(1)}
                        aria-label="다음 책"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100"
                    >
                        →
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-[1440px] px-4 md:px-8">
                <div
                    ref={sliderRef}
                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]"
                        >
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GenreSection;
