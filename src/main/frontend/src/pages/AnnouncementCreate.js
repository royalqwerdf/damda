import {useState} from "react";
import {token} from "../api/axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.scss";
import  '../global.scss';
function AnnouncementCreate() {
    const navigate = useNavigate();

    const [announcement, setAnnouncement] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAnnouncement(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await token.post('/api/announcements', announcement);
            alert('공지사항이 성공적으로 등록되었습니다!');
            setAnnouncement({title: '', content: ''});
            navigate('/')
        } catch (error) {
            console.error('공지사항 등록 실패:', error);
            alert('공지사항 등록에 실패했습니다.');
        }
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className={styles.Announcements}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>공지사항</h2>
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
                        <button type="button" onClick={handleCancel} style={{marginLeft: "10px"}}>취소</button>
                        <button type="submit">공지사항 등록</button>
                </form>
            </div>
        </div>

    )
}

export default AnnouncementCreate;