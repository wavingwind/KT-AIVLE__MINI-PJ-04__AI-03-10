function BookForm() {
    return (
        <>
            <form className="space-y-8" id="book-reg-form" onsubmit="return false;">
                <div className="bg-[#f6f3f2]est p-6 md:p-8 rounded-xl shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-surface-variant">
                        <h3 className="font-headline-sm text-headline-sm text-primary">도서 정보 입력</h3>
                        <span className="font-label-sm text-label-sm text-error">* 필수 입력 항목</span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-1.5 text-left" htmlFor="book-title">
                                도서명 (Title) <span className="text-error">*</span>
                            </label>
                            <input className="w-full bg-[#f6f3f2] px-4 py-2.5 rounded font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all" id="book-title" placeholder="제목을 입력해주세요." required="" type="text" />
                        </div>                        
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block font-label-md text-label-md text-on-surface">
                                저자 (Author) <span className="text-error">*</span>
                            </label>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#f6f3f2] rounded min-h-[46px]" id="author-tags-container">
                            <input className="flex-1 min-w-[120px] bg-transparent px-2 py-1 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none" id="author-input" placeholder="저자를 입력해주세요." type="text" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="book-synopsis">
                                줄거리 요약 (Hover Preview 문장) <span className="text-error">*</span>
                            </label>
                            <span className="font-label-sm text-label-sm text-secondary">
                                <span id="synopsis-counter">132</span> / 200자
                            </span>
                        </div>
                        <textarea className="w-full bg-[#f6f3f2] px-4 py-3 rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all leading-relaxed" id="book-synopsis" maxlength="200" rows="3" placeholder="줄거리 요약을 입력해주세요."></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-1.5 text-left" htmlFor="book-pubdate">
                                등록일
                            </label>
                            <input className="w-full bg-[#f6f3f2] px-3 py-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container transition-all" id="book-pubdate" type="date" value="2024-11-15" />
                        </div>
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-1.5 text-left" htmlFor="book-pubdate">
                                수정일
                            </label>
                            <input className="w-full bg-[#f6f3f2] px-3 py-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container transition-all" id="book-pubdate" type="date" value="2024-11-15" />
                        </div>
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-1.5 text-left" htmlFor="book-genre">
                                장르 / 컬렉션 분류 <span className="text-error">*</span>
                            </label>
                            <select className="w-full bg-[#f6f3f2] px-3 py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container transition-all" id="book-genre">
                                <option selected="" value="인문/철학">인문/철학 (Philosophy)</option>
                                <option value="소설/문학">소설/문학 (Fiction)</option>
                                <option value="예술/건축">예술/건축 (Art &amp; Design)</option>
                                <option value="에세이">에세이/산문 (Essay)</option>
                                <option value="과학/기술">과학/자연 (Science)</option>
                                <option value="사회/역사">사회/역사 (History)</option>
                            </select>
                        </div>
                    </div>                    
                </div>
                
                
            </form>
            <div className="lg:col-span-5 sticky top-24 space-y-6">
                <div className="bg-[#f6f3f2]est p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="font-headline-sm text-headline-sm text-primary">실시간 도서 표지 미리보기</h2>
                        </div>
                    </div>                    
                    <div className="p-8 bg-[#f6f3f2] rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="relative group w-56 aspect-[2/3] rounded-sm cursor-pointer transition-all duration-300 select-none shadow-[0_12px_28px_-6px_rgba(26,26,26,0.18),-2px_0_6px_-1px_rgba(26,26,26,0.08)] bg-primary text-on-primary overflow-hidden" id="live-book-card">
                            <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/10 z-20 pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10 pointer-events-none z-10"></div>
                            <div className="w-full h-full p-5 flex flex-col justify-between relative z-10" id="book-jacket-surface">
                                <div className="flex items-start justify-between">
                                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm tracking-wider" id="preview-genre-badge">
                                        인문/철학
                                    </span>
                                    <span className="material-symbols-outlined text-white/50 text-[1.1rem]">bookmark</span>
                                </div>
                                <div className="my-auto pl-2 py-4">
                                    <span className="block font-label-sm text-label-sm text-white/80 mb-1 tracking-wider line-clamp-1" id="preview-subtitle-text">
                                        시간과 공간이 남긴 내면의 기록
                                    </span>
                                    <h3 className="font-headline-md text-headline-md text-white tracking-tight leading-snug break-keep" id="preview-title-text">
                                        빛과 물질에 관한 사유의 밤
                                    </h3>
                                    <div className="w-8 h-0.5 bg-white/40 my-3"></div>
                                    <p className="font-body-sm text-body-sm text-white/90" id="preview-author-text">
                                        정운하 지음 · 박연수 옮김
                                    </p>
                                </div>
                                <div className="flex items-center justify-between text-white/70 pt-2 border-t border-white/20 font-label-sm text-label-sm">
                                    <span id="preview-publisher-text">서가 아카이브스</span>
                                    <span className="tracking-widest">SEOGA</span>
                                </div>
                            </div>
                            <img className="hidden absolute inset-0 w-full h-full object-cover z-10" data-alt="An exquisite minimalist art book cover in serene sage green textured paper with elegant Korean serif typography embossed in gold leaf, resting quietly in a sunlit architectural library" id="preview-custom-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcpyKvTmMRI26-9x-H4Q9dHB_IjEn6ETC8hWgAJcfX4_J2MO6AXUVhGTv9FjRtpwwytLBJIWnQcIQVc2PHGzx2185KYadJHoyRV2M1XkWuts4Y3J_WB5gBEVm9ve25yXDLkbeSz54_wbGW9oxM0KSxeqS1RPjTdtQAAeIewuVbtpTbkmvQyyMzt8AQQgWI8W9QeIQbNym38VohBovXfFO7Sbda3TtgT-_UiT175IjS" />
                            <div className="absolute inset-0 bg-surface/90 backdrop-blur-md text-on-surface p-5 flex flex-col justify-between opacity-0 transition-opacity duration-300 z-30 pointer-events-none group-hover:pointer-events-auto" id="frosted-overlay">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Reading Excerpt</span>
                                        <span className="material-symbols-outlined text-secondary text-[1.1rem]">format_quote</span>
                                    </div>
                                    <h4 className="font-headline-sm text-headline-sm text-primary mb-2 line-clamp-2" id="overlay-title-text">
                                        빛과 물질에 관한 사유의 밤
                                    </h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-5 break-keep" id="preview-synopsis-text">
                                        빛과 침묵이 교차하는 서재에서 저자가 탐구한 열두 편의 사유 기록. 기억의 가장자리에서 길어 올린 고요한 문장들이 읽는 이의 밤을 단단하고 따뜻하게 채워줍니다.
                                    </p>
                                </div>
                                <div className="space-y-3 pt-3 border-t border-surface-variant">
                                    <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                                        <span>소장 번호</span>
                                        <span className="font-medium text-primary" id="overlay-shelf-loc">제1서재 A동 3열-12</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="flex-1 py-1.5 bg-primary text-on-primary text-center rounded font-label-sm text-label-sm shadow-sm">
                                            상세 서평 작성
                                        </span>
                                        <span className="px-2 py-1.5 bg-surface-container text-on-surface rounded font-label-sm text-label-sm flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[1rem]">share</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>                    
                </div>                
            </div>
        </>
    )
}

export default BookForm