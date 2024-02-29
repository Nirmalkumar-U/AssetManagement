import React from 'react';

const CustomInput = ({ label, inputId, value, type, onChange, placeHolder, isRequried, maxlength, isValid, message, disabled }) => {

    return (
        <div className="col-md-4">
            <label className="form-label fw-bolder">{label} </label>{isRequried ? <span className="fw-bolder text-danger">*</span> : null}
            <input type={type} className="form-control" id={inputId} value={value} required={isRequried} placeholder={placeHolder} disabled={disabled} maxLength={maxlength} onChange={(e) => onChange(e.target.value)} />
            {
                isValid ? "" : <div className="invalid-feedback fw-bolder">
                    {message}
                </div>
            }
        </div>
    );
};

export default CustomInput;