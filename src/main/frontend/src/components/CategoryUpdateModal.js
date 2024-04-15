import React, { useState, useEffect } from 'react';
import '../global.scss';
import styles from "../styles/Form.module.scss";
import { token } from "../api/axios";

const CategoryUpdateModal = ({ isOpen, onClose, category, onUpdateCategory }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (category) {
            setCategoryName(category.categoryName);
        }
    }, [category]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await token.put(`/api/categories/${category.id}`, { categoryName });
            if (response && response.data) {
                onUpdateCategory(response.data);
                onClose();
            } else {
                throw new Error("No data in response or onUpdateCategory is not a function");
            }
        } catch (error) {
            console.error("카테고리 수정 실패", error);
        }
    };

    if (!isOpen || !category) return null; // 모달이 열려 있지 않거나 카테고리 데이터가 없다면 아무것도 표시하지 않음

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
                            <button className="rightbutton" type="submit">수정</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CategoryUpdateModal;
