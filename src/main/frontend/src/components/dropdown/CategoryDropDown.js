
export const CategoryDropDown = ({value, setCategoryIdentify, setIsOpen, isOpen, isLast}) => {
    const valueClick = () => {
        setCategoryIdentify(value)
        setIsOpen(!isOpen)
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