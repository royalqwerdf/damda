
export const ClassStartDropDown = ({value, setClassStartIdentify, setIsOpen, isOpen, isLast, handleInputChange}) => {
    const valueClick = () => {
        setClassStartIdentify(value)
        setIsOpen(!isOpen)
        handleInputChange('start', value) // start 값을 설정
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