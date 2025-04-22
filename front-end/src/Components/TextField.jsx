import React from 'react';
import PropTypes from 'prop-types';

function TextField({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
  id,
  disabled = false,
  required = false,
  error = '',
  helperText = '',
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  helperTextClassName = '',
  style = {},
  inputStyle = {},
  labelStyle = {},
  errorStyle = {},
  helperTextStyle = {},
  ...props
}) {
  const generatedId = id || name || `textfield-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`text-field-container ${className}`} style={style}>
      {label && (
        <label
          htmlFor={generatedId}
          className={`text-field-label ${labelClassName}`}
          style={labelStyle}
        >
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      
      <input
        id={generatedId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`text-field-input ${inputClassName}`}
        style={{
          padding: '0.5rem',
          border: error ? '1px solid #ff4444' : '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
          boxSizing: 'border-box',
          ...inputStyle
        }}
        {...props}
      />
      
      {error && (
        <div 
          className={`text-field-error ${errorClassName}`} 
          style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem', ...errorStyle }}
        >
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div 
          className={`text-field-helper-text ${helperTextClassName}`} 
          style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.25rem', ...helperTextStyle }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  helperTextClassName: PropTypes.string,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  errorStyle: PropTypes.object,
  helperTextStyle: PropTypes.object,
};

export default TextField;