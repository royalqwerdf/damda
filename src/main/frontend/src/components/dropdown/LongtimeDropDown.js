
export const LongtimeDropDown = ({value, setLongtimeIdentify, setIsOpen, isOpen, isLast}) => {
    const valueClick = () => {
        setLongtimeIdentify(value)
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