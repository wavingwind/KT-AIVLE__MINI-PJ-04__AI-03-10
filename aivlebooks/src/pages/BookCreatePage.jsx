import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import SelectButton from '../components/SelectButton';

const BOOK_CATEGORIES = ['장르선택', '소설', '과학', '인문', '역사', '예술', '기타'];

function BookCreatePage({ onCreateBook }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 상세페이지에서 book 데이터 받은 게 있으면 수정 모드를 띄움
  const editBook = location.state?.book;
  const isEditMode = Boolean(editBook);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(BOOK_CATEGORIES[0]);
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverOption, setCoverOption] = useState('표지 생성 안함');

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/books/${editBook.id}`); // 수정 중 취소하면 다시 상세페이지로
      return;
    }
    setTitle('');
    setAuthor('');
    setContent('');
  };

  const handleSubmit = async () => {
    if (category == '장르선택'){
        alert('장르를 선택해주세요')
        return;
    }

    if (!title.trim() || !author.trim() || !content.trim() || !content.trim) {
      alert('제목, 작가명, 내용을 모두 입력해주세요.');
      return;
    }

    try {
      if (isEditMode) {
        // 수정 모드일 때 PATCH 호출하고 상세페이지로 이동
        await onModifyBook(editBook.id, {
          title,
          author,
          category,
          content,
        });
        alert('도서 정보가 수정되었습니다!');
        navigate(`/books/${editBook.id}`);
      } else {
        // 신규 등록 모드일 때 POST 호출
        await onCreateBook({
          title,
          author,
          category,
          content,
        });
        alert('새 도서가 db.json에 저장되었습니다!');
        setTitle('');
        setAuthor('');
        setContent('');
        setCategory(BOOK_CATEGORIES[0]);
      }
    } catch (error) {
      console.error(error);
      alert(isEditMode ? '도서 수정 중 오류가 발생했습니다.' : '도서 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        {isEditMode ? '도서 정보 수정' : '새 도서 등록'}
      </h1>

      <div className="p-8 border border-gray-300 rounded-lg shadow-sm bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <SelectButton
              options={BOOK_CATEGORIES}
              value={category}
              onChange={setCategory}
              placeholder = "장르 선택"
            />
            <div className="flex-1">
              <Input
                title="작가명"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="작가 이름을 입력하세요."
              />
            </div>
          </div>

          <Input
            title="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="도서 제목을 입력하세요."
          />

          <Input
            as="textarea"
            title="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="도서의 내용을 입력하세요."
          />

          <div className="flex items-center gap-6 mt-2">
            {/* 왼쪽: 표지 미리보기 박스 */}
            <div className="w-40 h-56 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt="생성된 도서 표지"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400 text-center px-2">
                  표지 없음
                </span>
              )}
            </div>

            {/* 오른쪽: 드롭다운 2개 세로 정렬 */}
            <div className="flex flex-col gap-3">
              <SelectButton options={['low', 'Mid', 'High']} />
              <SelectButton options={['표지 생성 안함', '표지 생성']} />
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-2">
            <Button onClick={handleCancel}>취소</Button>
            <Button onClick={handleSubmit}>{isEditMode ? '수정 완료' : '저장 및 생성'}</Button>
            <Button onClick={() => navigate('/')}>목록</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCreatePage;