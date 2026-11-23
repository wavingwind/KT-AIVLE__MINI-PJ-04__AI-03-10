import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
            // 삭제 후 메인 목록 페이지로 이동
            navigate("/");
            // 삭제 후에 도서 목록 확인해서 삭제됐는지 눈으로 확인할 수 있는 거 추가예정.
        } catch (err) {
            console.error(err);
            alert("삭제 처리 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return (
            <>
                <Header onHome={() => navigate("/")} onCreate={() => navigate("/books/new")} />
                <main style={{ padding: "40px", textAlign: "center" }}>
                    <p>도서 정보를 불러오는 중...</p>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !book) {
        return (
            <>
                <Header onHome={() => navigate("/")} onCreate={() => navigate("/books/new")} />
                <main style={{ padding: "40px", textAlign: "center" }}>
                    <p>에러: {error || "해당 도서를 찾을 수 없습니다."}</p>
                    <Button icon="📚" onClick={() => navigate("/")}>
                        목록으로 돌아가기
                    </Button>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
        <Header onHome={() => navigate("/")} onCreate={() => navigate("/books/new")} />
        <main style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            {/* 좌측: 도서 표지 이미지 영역 */}
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

            {/* 우측: 도서 상세 정보 및 버튼 영역 */}
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

                {/* 수정 / 삭제 / 목록 버튼 */}
                <div style={{ display: "flex", gap: "12px" }}>
                <Button icon="✏️" onClick={() => navigate(`/books/${id}/edit`)}>
                    수정하기
                </Button>
                <Button icon="🗑️" onClick={handleDelete}>
                    삭제하기
                </Button>
                <Button icon="📚" onClick={() => navigate("/")}>
                    목록으로
                </Button>
                </div>

                {/* 3일차에 건우님과 연결할 AI 표지 생성 구역 자리 */}
                <div
                style={{
                    marginTop: "32px",
                    paddingTop: "24px",
                    borderTop: "1px solid #eee",
                }}
                >
                <h4>AI 도서 표지 생성 (3일차 연동 예정)</h4>
                <p style={{ fontSize: "13px", color: "#777" }}>
                    이 영역에 OpenAI API Key 입력창과 AI 표지 생성 버튼이 추가될 예정입니다.
                </p>
                </div>
            </div>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default BookDetailPage;
