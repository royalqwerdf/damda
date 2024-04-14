import React from 'react';
import  '../global.scss';
import styles from "../styles/Form.module.scss";
import {token} from "../api/axios";

const CategoryModal = ({ isOpen, onClose, onAddCategory }) => {
    const [categoryName, setCategoryName] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await token.post('/api/categories', { categoryName: categoryName });
            if (response && response.data && typeof onAddCategory === 'function') {
                onAddCategory(response.data);
                onClose();
            } else {
                throw new Error("No data in response or onAddCategory is not a function");
            }
        } catch (error) {
            console.error("카테고리 등록 실패", error);
        }
    };

    if (!isOpen) return null; // 모달이 열려 있지 않다면 아무것도 표시하지 않음

    // 'modal-backdrop' 클래스를 모달 바깥쪽에 붙입니다.
    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className={styles.modal}>
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <form onSubmit={handleSubmit}>
                        <label>
                            카테고리
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </label>
                        <div className="modal-button">
                            <button className="leftbutton" onClick={onClose}>취소</button>
                            <button className="rightbutton" type="submit">등록</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default CategoryModal;
