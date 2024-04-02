import React from 'react';

const ClassList = ({ classes }) => {
    return (
        <div>
            {classes.map(onedayClass => {
                return (<div key={onedayClass.id}>
                    클래스명: {onedayClass.className}
                    카테고리: {onedayClass.categoryName}
                    설명: {onedayClass.classExpplanation}
                    클래스 만든사람: {onedayClass.managerName}
                </div>)
            })}
        </div>
    );
};

export default ClassList;