export const InquiryDropDown = ({value, setInquiryIdentify, setIsOpen, isOpen, isLast, handleSelectChange}) => {
    const valueClick = () => {
        setInquiryIdentify(value)
        setIsOpen(!isOpen)
        handleSelectChange('classify', value)
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

export default InquiryDropDown;