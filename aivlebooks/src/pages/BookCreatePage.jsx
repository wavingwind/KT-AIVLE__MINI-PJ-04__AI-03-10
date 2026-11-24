import { useState } from 'react';
import { useNavigate } from 'react-router'; // updatepage로 이동을 위해 추가
import Button from '../components/Button';
import Input from '../components/Input';
import SelectButton from '../components/SelectButton';
import generateCoverDataUrl from '../api/bookcoverApi';

const BOOK_CATEGORIES = ['장르선택', '소설', '과학', '인문', '역사', '예술', '기타'];

const styles = {
  uploadpage: 'w-full max-w-4xl mx-auto mt-10 px-4',
  pageTitle: 'text-2xl font-bold text-center mb-6',
  formCard: 'p-8 border border-gray-300 rounded-lg shadow-sm bg-white',

  baseInputSection: 'flex flex-col gap-4',
  topRow: 'flex items-end gap-3',

  
  coverSection: 'flex items-center gap-6 mt-2',
  coverPreviewBox: 'w-40 h-56 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0',
  coverImage: 'w-full h-full object-cover',
  coverPlaceholder: 'text-sm text-gray-400 text-center px-2',
  coverControls: 'flex flex-col gap-3',

  spinnerWrapper: 'flex flex-col items-center gap-2 text-blue-600',
  spinnerCircle: 'w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin',
  spinnerText: 'text-xs font-medium text-gray-600',

  buttonGroup: 'flex justify-end items-center gap-3 mt-2',
};



function BookCreatePage({ onCreateBook }) {
  const navigate = useNavigate(); // updatepage로 이동을 위해 추가

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(BOOK_CATEGORIES[0]);
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverQuality, setCoverQuality] = useState('품질선택');
  const [coverOption, setCoverOption] = useState('표지 생성 안함');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false); //사용자 편의성을 위한 로딩
  

  const handleCancel = () => {
    setTitle('');
    setAuthor('');
    setContent('');
  };

  const handleSubmit = async () => {
    if (category === '장르선택') {
      alert('장르를 선택해주세요');
      return;
    }

    if (!title.trim() || !author.trim() || !content.trim()) {
      alert('제목, 작가명, 내용을 모두 입력해주세요.');
      return;
    }

    if (coverOption === '표지 생성') {
      if (coverQuality === '품질선택') { 
        alert('표지 품질을 선택해주세요.');
        return;
      }
      if (!apiKey.trim()) {
        alert('표지를 생성하려면 OpenAI API Key를 입력해주세요.');
        return;
      }
    }

    try {
      setIsLoading(true); // 시작할 때 로딩 ON  
      
      let finalCoverUrl = coverImageUrl;

      if (apiKey.trim()) {
        finalCoverUrl = await generateCoverDataUrl({
          apiKey: apiKey.trim(),
          title,
          content,
          category,
          quality: coverQuality,
        });

        setCoverImageUrl(finalCoverUrl);
      }

      const created = await onCreateBook({
        title,
        author,
        category,
        content,
        coverImageUrl: finalCoverUrl,
      });

      alert('새 도서가 db.json에 저장되었습니다!');

      if (created?.id) {
        navigate(`/books/${created.id}/update`);
      }
    } catch (error) {
      console.error(error);
      alert(error.message || '도서 등록 중 오류가 발생했습니다.');
    } finally {
    setIsLoading(false); //성공/실패 여부와 관계없이 끝나면 로딩 OFF
  }
};
  return (
    <div className= {styles.uploadpage}>
      <h1 className= {styles.pageTitle}>새 도서 등록</h1>

      <div className= {styles.formCard}>
        <div className= {styles.baseInputSection}>
          <div className={styles.topRow}>
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
            row ={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="도서의 내용을 입력하세요."
          />
        </div>
    
          <div className= {styles.coverSection}>
            <div className= {styles.coverPreviewBox}>
              {isLoading ? (
            <div className= {styles.spinnerWrapper}>
                <div className= {styles.spinnerCircle} />
                <span className= {styles.spinnerText}>표지 생성 중...</span>
              </div>
                ) : coverImageUrl ? (
                <img
                    src={coverImageUrl}
                    alt="생성된 도서 표지"
                    className= {styles.coverImage}
                />
                ) : (
                <span className= {styles.coverPlaceholder}>
                표지 없음
                </span>
                )}
            </div>

            {/* 오른쪽: 이미지 관련 선택버튼 세로 정렬 */}
            <div className= {styles.coverControls}>
                <SelectButton
                    options={['표지 생성 안함', '표지 생성']}
                    value={coverOption}
                    onChange={setCoverOption}
                    />
                <SelectButton
                    options={['품질선택', 'low', 'medium', 'high']}
                    value={coverQuality}
                    onChange={setCoverQuality}
                    disabled={coverOption === '표지 생성 안함'}
                    />
                <Input
                    title="OpenAI API Key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="키를 입력하세요."
                    disabled={coverOption === '표지 생성 안함'}
                    />
            </div>
          </div>

          <div className= {styles.buttonGroup}>
                <Button onClick={handleCancel} disabled={isLoading}>취소</Button>  {/* 각 버튼 이미지 생성 로딩시 버튼 비활성화를 위해 disabled추가*/}
            <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? '생성 및 저장 중...' : '저장 및 생성'}
                </Button>
            <Button onClick={() => navigate('/')} disabled={isLoading}>목록</Button>
          </div>
        </div>
      </div>
  );
}

export default BookCreatePage;