import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../components/Button";

function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true); // 책 정보 로드중일때 대기화면
    const [error, setError] = useState("");

    // 상세 정보 조회 (GET /books/:id)
    useEffect(() => {
        async function fetchBookDetail() {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/books/${id}`);
                if (!res.ok) {
                    throw new Error("도서 정보를 불러오지 못했습니다.");
                }
                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "데이터 조회 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        }

        fetchBookDetail();
    }, [id]);

    // 도서 삭제 핸들러 (DELETE /books/:id)
    const handleDelete = async () => {
        const isConfirmed = window.confirm("정말로 이 도서를 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:3000/books/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("도서 삭제에 실패했습니다.");
            }
            alert("도서가 삭제되었습니다.");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("삭제 처리 중 오류가 발생했습니다.");
        }
    };

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
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
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
                <div style={{ flex: 1 }}>
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
                            padding: "20px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            lineHeight: "1.6",
                            marginBottom: "24px",
                        }}
                    >
                        {book.content}
                    </div>

                    {/* 수정, 삭제, 목록 버튼 */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        <Button icon="✏️" onClick={() => navigate(`/books/${id}/update`)}>
                            수정하기
                        </Button>
                        <Button icon="🗑️" onClick={handleDelete}>
                            삭제하기
                        </Button>
                        {/* 목록 버튼은 일단 홈화면으로 보내게 해놨음. */}
                        <Button icon="📚" onClick={() => navigate("/")}>
                            목록으로
                        </Button>
                    </div>

                    {/* AI 표지 재생성 구역 */}
                    <div
                        style={{
                            marginTop: "32px",
                            paddingTop: "24px",
                            borderTop: "1px solid #eee",
                        }}
                    >
                        <h4>AI 도서 표지 재생성</h4>
                        <p style={{ fontSize: "13px", color: "#777" }}>
                            (추가예정)
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BookDetailPage;