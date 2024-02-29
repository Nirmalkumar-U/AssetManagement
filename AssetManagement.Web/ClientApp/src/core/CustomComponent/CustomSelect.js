import React from 'react';

const CustomSelect = ({ options, onChange, label, isRequried, isValid, message, value }) => {
    const handleSelectChange = (e) => {
        // Pass the selected value to the parent component if an onChange callback is provided
        if (onChange) {
            onChange(e.target.value);
        }
    };
    let defaulfValue = value || '';
    return (
        
        <div className="col-md-4">
            <label className="form-label fw-bolder">{label} </label>
            {isRequried ? <span className="fw-bolder text-danger">*</span> : null}
            <select className="form-select" value={defaulfValue} onChange={handleSelectChange}>
                <option value={''}>Select</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {isValid ? "" : <div className="invalid-feedback fw-bolder">{message}</div>}
        </div>
    );
};

export default CustomSelect;
