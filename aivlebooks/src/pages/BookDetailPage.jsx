import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../components/Button";

function BookDetailPage({onViewDetails, onDeleteBook, my_likes = [], onToggleLike}) {
    const { id } = useParams();
    const navigate = useNavigate();


    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true); // 책 정보 로드중일때 대기화면
    const [error, setError] = useState("");
    const isLiked = my_likes.some((book) => String(book.id) === String(id)) //좋아요인지 확인
    const [busy, setBusy] = useState(false) // 요청 중 버튼 잠금

    // 좋아요
    const handleLikeClick = async () => {
        setBusy(true)
        try {
            await onToggleLike(id)
        } finally {
            setBusy(false)
        }
    }

    // 삭제
    const handleDeleteClick = async () => {
        setBusy(true)
        try {
            await onDeleteBook(id)
        } finally {
            setBusy(false)
        }
    }
    
    useEffect(() => {
        async function load() {
            setLoading(true)
            const data = await onViewDetails(id)
            if (data) setBook(data)
            else setError("도서 정보를 불러오지 못했습니다.")
            setLoading(false)
        }
        load()
        }, [id])

    if (loading) {
    return (
            <main style={{ padding: "40px", textAlign: "center" }}>
                <p>도서 정보를 불러오는 중...</p>
            </main>
        );
    }

    if (error || !book) {
        return (
            <main style={{ padding: "40px", textAlign: "center" }}>
                <p>에러: {error || "해당 도서를 찾을 수 없습니다."}</p>
                {/* 목록 버튼은 일단 홈화면으로 보내게 해놨음. */}
                <Button icon="📚" onClick={() => navigate("/")}>
                    목록으로 돌아가기
                </Button>
            </main>
        );
    }

    return (
        <main style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ display: "flex", gap: "40px", alignItems: "stretch" }}>
                {/* 왼쪽에 표지이미지 영역 */}
                <div style={{ flex: "0 0 300px" }}>
                    <img
                        src={book.coverImageUrl || "https://placehold.co/300x420?text=No+Cover"}
                        alt={book.title}
                        style={{
                            width: "100%",
                            aspectRatio: "2 / 3",
                            objectFit: "cover",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                    />
                </div>

                {/* 오른쪽에 상세정보 영역 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#666", fontSize: "14px" }}>{book.category}</span>
                    <h2 style={{ margin: "8px 0 12px", fontSize: "28px" }}>{book.title}</h2>
                    <p style={{ color: "#444", marginBottom: "8px" }}>
                        <strong>저자:</strong> {book.author}
                    </p>
                    <p style={{ color: "#888", fontSize: "13px", marginBottom: "24px" }}>
                        등록일: {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "-"}
                    </p>

                    <div
                        style={{
                            flex: 1,
                            padding: "20px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            lineHeight: "1.6",
                            marginBottom: "24px",
                        }}
                    >
                        {book.content}
                    </div>

                    {/* 좋아요, 수정, 삭제 */}
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                        <Button icon={isLiked ? "❤️" : "🤍"} disabled={busy} onClick={handleLikeClick}>
                            {isLiked ? "좋아요 취소" : "좋아요"}
                        </Button>
                        <Button icon="✏️" disabled={busy} onClick={() => navigate(`/books/${id}/update`)}>
                            수정
                        </Button>
                        <Button icon="🗑️" disabled={busy} onClick={handleDeleteClick}>
                            삭제
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BookDetailPage;