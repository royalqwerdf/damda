export const ClassIdDropDown = ({value, setClassIdIdentify, setIsOpen, isOpen, isLast, handleSelectChange}) => {
    const valueClick = () => {
        setClassIdIdentify(value)
        setIsOpen(!isOpen)
        handleSelectChange('classId', value)
    }

    const listItemStyle = {
        padding: '10px'
    }

    if(isLast) {
        listItemStyle.borderBottom = 'none';
    } else {
        listItemStyle.borderBottom = '1px solid #ccc';
    }

    return (
        <li onClick={valueClick} style={listItemStyle}>{value}</li>
    )
}

export default ClassIdDropDown;