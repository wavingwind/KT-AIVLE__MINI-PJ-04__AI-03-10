async function generateCoverDataUrl({
  apiKey,
  title,
  content,
  category,
  quality = 'low',
}) {
  const prompt = `도서 표지 일러스트를 생성해줘.
        장르: ${category}
        제목: ${title}
        줄거리 및 내용: ${content}
        위 장르의 분위기와 제목, 줄거리가 잘 드러나는 세련되고 감성적인 한국 출판사 북커버 스타일로 그려줘.`;

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1024x1536',
      quality, // 'low' | 'medium' | 'high'
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error?.message || 'OpenAI 이미지 생성 요청에 실패했습니다.');
    return null; //에러 알림 후 함수 즉시 종료
    }

  // 1. b64_json 추출
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) {
    alert('응답 데이터에 b64_json이 없습니다.');
    return null;
    }

  // 2. Data URL 변환 및 반환
  return `data:image/png;base64,${b64}`;
}

export default generateCoverDataUrl;