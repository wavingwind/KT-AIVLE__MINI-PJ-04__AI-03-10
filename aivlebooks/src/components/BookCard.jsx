
function BookCard({ book }) {
    return (
        <article className="group relative h-[280px] w-full overflow-hidden bg-[#242424] text-white md:h-[320px]">
            {book.coverImageUrl ? (
                <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#565656] to-[#202020]">
                    <span className="px-6 text-center text-2xl font-medium text-white/40">
                        {book.title}
                    </span>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-all duration-300 group-hover:translate-y-4 group-hover:opacity-0">
                <h4 className="line-clamp-2 text-[24px] font-semibold leading-snug tracking-tight">
                    {book.title}
                </h4>

                <p className="mt-3 text-sm text-white/80">
                    <span className="mr-1 text-white/50">by</span>
                    {book.author}
                </p>
            </div>

            <div className="absolute inset-0 z-20 flex translate-y-4 flex-col justify-end bg-black/75 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h4 className="line-clamp-2 text-[24px] font-semibold leading-snug">
                    {book.title}
                </h4>

                <p className="mt-3 text-sm text-white/75">
                    <span className="mr-1 text-white/50">by</span>
                    {book.author}
                </p>

                {book.content && (
                    <p className="mt-5 line-clamp-4 border-t border-white/20 pt-4 text-sm leading-6 text-white/80">
                        {book.content}
                    </p>
                )}
            </div>
        </article>
    );
}

export default BookCard;
