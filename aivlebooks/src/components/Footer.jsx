import { Link } from "react-router";

function Footer() {
    return (
        <footer className="w-full border-t border-[#eee] bg-[#fafafa]">
            <div className="mx-auto w-full max-w-[1024px] px-4 py-10 lg:px-0">

                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/"
                            aria-label="AIVLE Books 홈으로 이동"
                            className="inline-block no-underline"
                        >
                            <strong className="text-[20px] font-medium tracking-[-0.06em] text-[#333]">
                                aivle<span className="font-light">books</span>
                                <span className="text-[#28b5ad]">.</span>
                            </strong>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 text-[12px] font-normal text-[#777]">
                        <span>이용약관</span>
                        <span>개인정보처리방침</span>
                    </div>
                </div>

                <div className="mt-8 border-t border-[#eee] pt-5">
                    <p className="text-[11px] font-light tracking-normal text-[#aaa]">
                        © 2026 AIVLEBOOKS. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
