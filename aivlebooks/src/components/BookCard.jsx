import { Link } from "react-router";

function BookCard({ book }) {
    return (
        <Link
            to={`/books/${book.id}`}
            className="block text-inherit no-underline"
        >
            <article
                className="
                    group relative z-0 aspect-[1.85/1] w-full
                    origin-center cursor-pointer bg-[#292929]
                    text-white transition-transform duration-300
                    ease-out hover:z-30 hover:scale-[1.12]
                "
            >
                <div className="absolute inset-0 overflow-hidden">
                    {book.coverImageUrl ? (
                        <img
                            src={book.coverImageUrl}
                            alt={book.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#3b3b3b]">
                            <span className="text-xl text-white/40">
                                {book.title}
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>

                <div
                    className="
                        absolute inset-0 z-10 flex flex-col
                        items-start justify-end p-6 text-left
                        transition-opacity duration-200
                        group-hover:opacity-0
                    "
                >
                    <h4 className="line-clamp-2 text-[23px] font-medium leading-[1.45] tracking-[-0.035em]">
                        {book.title}
                    </h4>

                    <p className="mt-3 text-[13px] font-light tracking-normal text-white/75">
                        by {book.author}
                    </p>
                </div>

                <div
                    className="
                        absolute inset-0 z-20 flex flex-col
                        items-start justify-end bg-black/90
                        px-8 pb-9 pt-8 text-left
                        opacity-0 transition-opacity duration-300
                        group-hover:opacity-100
                        md:px-10
                    "
                >
                    {book.category && (
                        <p className="mb-6 text-[12px] font-medium text-white/80">
                            {book.category}
                        </p>
                    )}

                    {book.content && (
                        <p className="line-clamp-4 w-full break-keep text-[14px] font-light leading-[1.8] tracking-[-0.02em] text-white">
                            {book.content}
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
}

export default BookCard;
