import styles from "../../styles/Form.module.scss";
import { Checkbox } from "../Checkbox";
import React, { useEffect, useState } from "react";
import { token } from "../../api/axios";
import CategoryModal from "../CategoryModal";
import CategoryUpdateModal from "../CategoryUpdateModal";
import CategoryDeleteModal from "../CategoryDeleteModal";

function CategoryManage() {
    const [categories, setCategories] = useState([]);
    const [checkedState, setCheckedState] = useState({});
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
        setCheckedState({...checkedState, [newCategory.id]: false});
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await token.get('/api/categories');
                setCategories(response.data);
                const newCheckedState = {};
                response.data.forEach(category => {
                    newCheckedState[category.id] = false;
                });
                setCheckedState(newCheckedState);
            } catch (error) {
                console.error("카테고리를 불러오는 데 실패했습니다.", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCheckboxChange = (id) => {
        const newState = { ...checkedState, [id]: !checkedState[id] };
        setCheckedState(newState);
        setIsAllChecked(Object.values(newState).every(state => state));
    };

    const handleAllCheckboxes = () => {
        const newState = Object.keys(checkedState).reduce((acc, key) => {
            acc[key] = !isAllChecked;
            return acc;
        }, {});
        setCheckedState(newState);
        setIsAllChecked(!isAllChecked);
    };

    const handleEditButtonClick = (category) => {
        setSelectedCategory(category);
        setIsUpdateModalOpen(true);
    };

    const handleCategoryUpdate = (updatedCategory) => {
        const updatedCategories = categories.map(cat =>
            cat.id === updatedCategory.id ? updatedCategory : cat
        );
        setCategories(updatedCategories);
        setIsUpdateModalOpen(false);
    };

    const handleCategoryDelete = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
        setIsDeleteModalOpen(false);  // 모달 닫기
    };

    const openDeleteModal = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="container" style={{padding: '0px'}}>
            <div className="admin-menu-area" style={{width: '100%'}}>
                <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0', fontSize: '22px', fontWeight: 'bold', color: '#808000'}}>카테고리 관리</div>
                <div className="second-title" style={{marginTop: '10px', padding: '20px', width: '100%', height: '40px'}}>
                    <div style={{marginLeft: '30px', fontSize: '20px', fontWeight: 'bold', color: '#808000'}}>카테고리 리스트</div>
                </div>
                <div className="content-area" style={{marginTop: '10px', padding: '10px', width: '100%'}}>
                    <div className="create">
                        <button className="category-create" onClick={() => setIsModalOpen(true)}>카테고리 등록</button>
                    </div>
                    <table className={styles.categoryTable}>
                        <thead>
                        <tr>
                            <th style={{width: "10%"}}><Checkbox checked={isAllChecked} onChange={handleAllCheckboxes}/></th>
                            <th style={{width: "30%"}}>카테고리 명</th>
                            <th style={{width: "25%"}}>등록일</th>
                            <th style={{width: "25%"}}>수정일</th>
                            <th style={{width: "10%"}}>관리</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td><Checkbox checked={checkedState[category.id]} onChange={() => handleCheckboxChange(category.id)} /></td>
                                <td>{category.categoryName}</td>
                                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(category.updatedAt).toLocaleDateString()}</td>
                                <td className={styles.editOptions}>
                                    <img src="/img/icon/Lucide.png" alt="관리아이콘"/>
                                    <div className={styles.editIcons}>
                                        <button className={styles.edit}
                                                onClick={() => handleEditButtonClick(category)}>편집
                                        </button>
                                        <button className={styles.delete} onClick={() => openDeleteModal(category)}>삭제</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddCategory={handleAddCategory} />
            <CategoryUpdateModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} category={selectedCategory} onUpdateCategory={handleCategoryUpdate} />
            <CategoryDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} category={selectedCategory} onDeleteCategory={handleCategoryDelete} />
        </div>
    );
}

export default CategoryManage;
