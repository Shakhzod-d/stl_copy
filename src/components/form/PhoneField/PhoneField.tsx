import React from 'react'
import { Controller, RegisterOptions, FieldValues, Control, Path } from 'react-hook-form'
import { Input, InputProps } from 'antd'
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'

interface Props<T extends FieldValues = any> extends InputProps {
     control: Control<T>
     name: Path<T>
     validation?: RegisterOptions
     required?: boolean
     label: string
     errorText?: string
}

function PhoneField<T extends FieldValues>({
     control,
     validation,
     name,
     label,
     placeholder,
     errorText,
     className,
     required,
     autoComplete = "off",
     ...props
}: Props<T>) {
     return (
          <Controller
               render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { error },
               }) => {
                    return (
                         <div className={`text-field-wrapper ${error ? 'error' : ''} ${className}`}>
                              {label && <label>{label}</label>}
                              <Input
                                   value={parsePhoneNumber(value || "") ? parsePhoneNumber(value)?.formatInternational() : value}
                                   onChange={(e) => onChange(parsePhoneNumber(e.target.value) ? parsePhoneNumber(e.target.value)?.number : e.target.value)}
                                   onBlur={onBlur}
                                   ref={ref}
                                   status={value ? (isValidPhoneNumber(value) ? "" : "error") : error ? "error" : ""}
                                   placeholder={placeholder}
                                   name={name}
                                   autoComplete={autoComplete}
                                   {...props}
                              />
                              {error && <span className='error-text'>
                                   {error.message || errorText || "Please fill in the field"}
                              </span>}
                         </div>
                    )
               }}
               name={name}
               control={control}
               rules={{ required: required, validate: val => required && (isValidPhoneNumber(val) || "Please enter the correct phone number"), ...validation }}
          />
     )
}

export default PhoneField



// import React from 'react'
// import { Controller, RegisterOptions } from 'react-hook-form'
// import PhoneNumberInput, { isValidPhoneNumber } from 'react-phone-number-input/min'

// interface Props {
//      control: any,
//      name: string,
//      required?: boolean,
//      validation?: RegisterOptions,
//      label: string,
//      placeholder: string,
//      errorText?: string,
//      disabled?: boolean,
//      autoComplete?: "on" | "off",
//      className?: string
// }

// const PhoneField: React.FC<Props> = ({
//      control = {},
//      name = "",
//      required = false,
//      validation = {},
//      label = "",
//      placeholder = "",
//      errorText = "",
//      disabled = false,
//      autoComplete = "off",
//      className = ""
// }) => {
//      return (
//           <Controller
//                render={({
//                     field: { onChange, onBlur, value, name, ref },
//                     fieldState: { error },
//                }) => (
//                     <div className={`phone-field-wrapper ${error ? 'error' : ''} ${className}`}>
//                          {label && <label>{label}</label>}
//                          <PhoneNumberInput
//                               value={value}
//                               onChange={onChange}
//                               onBlur={onBlur}
//                               ref={ref}
//                               placeholder={placeholder}
//                               name={name}
//                          />
//                          {error && <span className='error-text'>
//                               {error.message || errorText || 'Iltimos tanlang'}
//                          </span>}
//                     </div>
//                )}
//                name={name}
//                control={control}
//                rules={{ required: required, validate: val => required && isValidPhoneNumber(val), ...validation }}
//           />
//      )
// }

// export default PhoneField

