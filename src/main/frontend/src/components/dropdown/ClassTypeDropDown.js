export const ClassTypeDropDown = ({value, setClassTypeIdentify, setIsOpen, isOpen, isLast, handleSelectChange}) => {
    const valueClick = () => {
        setClassTypeIdentify(value)
        setIsOpen(!isOpen)
        handleSelectChange("classType", value)
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

export default ClassTypeDropDown;