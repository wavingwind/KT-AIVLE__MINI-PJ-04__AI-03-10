import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import SelectButton from '../components/SelectButton';
import generateCoverDataUrl from '../api/bookcoverApi';

const BOOK_CATEGORIES = ['장르선택', '소설', '과학', '인문', '역사', '예술', '기타'];

function BookEditPage({ onModifyBook }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(BOOK_CATEGORIES[0]);
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverQuality, setCoverQuality] = useState('품질선택');
  const [coverOption, setCoverOption] = useState('표지 유지');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false); //사용자 편의성을 위한 로딩

  // 1. 페이지 진입 시 기존 도서 데이터 불러와서 입력칸 채우기
  useEffect(() => {
    const fetchbookdata = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${id}`);
        if (!res.ok) {
            alert('도서 정보를 불러오지 못했습니다.');
            return;
        }

        const data = await res.json();

        setTitle(data.title || '');
        setAuthor(data.author || '');
        setCategory(data.category || BOOK_CATEGORIES[0]);
        setContent(data.content || '');
        setCoverImageUrl(data.coverImageUrl || '');
      } catch (error) {
        console.error(error);
        alert('도서 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (id) fetchbookdata();
  }, [id]);

  // 취소 시 상세 페이지(또는 목록)로 돌아가기
  const handleCancel = () => {
    navigate(`/books/${id}`); // 상세 페이지(/books/:id)로 이동
    };


  // 2. 수정 내용 저장 (PATCH)
  const handleSubmit = async () => {
    if (category === '장르선택') {
      alert('장르를 선택해주세요.');
      return;
    }

    if (!title.trim() || !author.trim() || !content.trim()) {
      alert('제목, 작가명, 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      let finalCoverUrl = coverImageUrl; // 기본값: 기존 표지 유지

      if (apiKey.trim()) {
        finalCoverUrl = await generateCoverDataUrl({
          apiKey: apiKey.trim(),
          title,
          content,
          category,
          quality: coverQuality,
        });

        if (!finalCoverUrl) {
          return;
        }

        setCoverImageUrl(finalCoverUrl);
        setApiKey('');
        setCoverOption('표지 유지');   // 재생성 완료 후 기본값('표지 유지')으로 복귀
        setCoverQuality('품질선택');   // 품질 드롭다운도 초기 상태로 복귀
      }

      await onModifyBook(id, {
        title,
        author,
        category,
        content,
        coverImageUrl: finalCoverUrl,
      });

      alert('도서 정보가 수정되었습니다!');
    } catch (error) {
      console.error(error);
      alert('도서 수정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">도서 수정</h1>

      <div className="p-8 border border-gray-300 rounded-lg shadow-sm bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <SelectButton
              options={BOOK_CATEGORIES}
              value={category}
              onChange={setCategory}
              placeholder="장르 선택"
              disabled={isLoading}
            />
            <div className="flex-1">
              <Input
                title="작가명"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="작가 이름을 입력하세요."
                disabled={isLoading}
              />
            </div>
          </div>

          <Input
            title="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="도서 제목을 입력하세요."
            disabled={isLoading}
          />

          <Input
            as="textarea"
            title="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="도서의 내용을 입력하세요."
            disabled={isLoading}
          />

          <div className="flex items-center gap-6 mt-2">
            {/* 왼쪽: 표지 미리보기 박스 (로딩 스피너 추가) */}
            <div className="w-40 h-56 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-blue-600">
                  <div className="w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-medium text-gray-600">
                    표지 생성 중...
                  </span>
                </div>
              ) : coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt="도서 표지"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400 text-center px-2">
                  표지 없음
                </span>
              )}
            </div>

            {/* 오른쪽: 표지 생성 여부 -> 품질 -> API Key 세로 정렬 */}
            <div className="flex flex-col gap-3">
              <SelectButton
                options={['표지 유지', '표지 재생성']}
                value={coverOption}
                onChange={(val) => {
                  setCoverOption(val);
                  if (val === '표지 유지') {
                    setApiKey('');
                  }
                }}
                disabled={isLoading}
              />
              <SelectButton
                options={['품질선택', 'low', 'medium', 'high']}
                value={coverQuality}
                onChange={setCoverQuality}
                disabled={coverOption === '표지 유지' || isLoading}
              />
              <Input
                title="OpenAI API Key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="키를 입력하세요."
                disabled={coverOption === '표지 유지' || isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-2">
            <Button onClick={handleCancel} disabled={isLoading}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '생성 및 수정 중...' : '재생성 및 수정'}
            </Button>
            <Button onClick={() => navigate('/')} disabled={isLoading}>
              목록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookEditPage;