import React from 'react';
import '../global.scss';
import styles from "../styles/Form.module.scss";
import {token} from "../api/axios";

const CategoryDeleteModal = ({ isOpen, onClose, category, onDeleteCategory }) => {
    if (!isOpen || !category) return null; // 모달이 열려 있지 않거나 카테고리 데이터가 없다면 아무것도 표시하지 않음

    const handleDelete = async () => {
        try {
            await token.delete(`/api/categories/${category.id}`);
            onDeleteCategory(category.id);  // 상태 업데이트 함수 호출
            onClose();  // 모달 닫기
        } catch (error) {
            console.error("카테고리 삭제 실패", error);
        }
    };

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className={styles.modal}>
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <div className="modal-body">
                        <p>'{category.categoryName}'</p>
                        <p>카테고리를 삭제 하시겠습니까?</p>
                    </div>
                    <div className="modal-button">
                        <button className="leftbutton" onClick={onClose}>취소</button>
                        <button className="rightbutton" onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryDeleteModal;
