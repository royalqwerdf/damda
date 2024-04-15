
export const HeadcountDropDown = ({value, setHeadcountIdentify, setIsOpen, isOpen, isLast, handleInputChange}) => {
    const valueClick = () => {
        setHeadcountIdentify(value)
        setIsOpen(!isOpen)
        handleInputChange('count', value) // end 값을 설정
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