export const ClaCateDropDown = ({value, setCategoryIdentify, setIsOpen, isOpen, isLast, handleSelectChange}) => {
    const valueClick = () => {
        setCategoryIdentify(value)
        setIsOpen(!isOpen)
        handleSelectChange("category", value)
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

export default ClaCateDropDown;