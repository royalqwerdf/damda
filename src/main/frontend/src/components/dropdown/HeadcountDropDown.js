
export const HeadcountDropDown = ({value, setHeadcountIdentify, setIsOpen, isOpen, isLast}) => {
    const valueClick = () => {
        setHeadcountIdentify(value)
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