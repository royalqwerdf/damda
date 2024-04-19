import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { token } from "../api/axios";
import styles from "../styles/Form.module.scss";
import '../global.scss';
import { jwtDecode } from 'jwt-decode';


function AnnouncementEdit() {
    const navigate = useNavigate();
    const { id } = useParams();  // URL로부터 id 파라미터를 받아옵니다.
    const [announcement, setAnnouncement] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        // 공지사항 데이터를 로드합니다.
        async function fetchAnnouncement() {
            try {
                if (id) { // id 값이 존재할 때만 요청 보내기
                    const response = await token.get(`/api/announcements/${id}`);
                    setAnnouncement({ title: response.data.title, content: response.data.content });
                }
            } catch (error) {
                console.error('공지사항 로딩 실패:', error);
            }
        }
        fetchAnnouncement();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        const decoded = jwtDecode(accessToken);
        const memberId = decoded.memberId;
        const fullAnnouncement = { ...announcement, memberId };


        try {
            const response = await token.put(`/api/announcements/${id}`, fullAnnouncement);
            alert('공지사항이 성공적으로 수정되었습니다!');
            navigate('/admin-home');
        } catch (error) {
            console.error('공지사항 수정 실패:', error);
            alert('공지사항 수정에 실패했습니다.');
        }
    };

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className={styles.Announcements}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>공지사항 수정</h2>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={announcement.title}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        value={announcement.content}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" onClick={handleCancel} style={{ marginLeft: "10px" }}>취소</button>
                    <button type="submit">공지사항 수정</button>
                </form>
            </div>
        </div>
    );
}

export default AnnouncementEdit;
