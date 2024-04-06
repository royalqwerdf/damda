import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {

    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddress += data.bname;
            }
            if(data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        props.onSaveAddress(fullAddress);
        props.onClose()
    }

    const postCodeStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        padding: "7px",
        zIndex: "9999",
        border: '2px solid #dcdcdc',
        backgroundColor: '#c0c0c0',
        borderRadius: '10px'
    };

    return (
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' style={{marginLeft: '10px'}} onClick={() => {props.onClose()}} className='postCode_btn'>X</button>
        </div>
    )
}

export default PopupPostCode;