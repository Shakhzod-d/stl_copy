import React from 'react'
import { Controller, RegisterOptions, FieldValues, Control, Path } from 'react-hook-form'
import { Input, InputProps } from 'antd'
import { default as NumberFormat, NumberFormatProps, NumberFormatValues } from 'react-number-format'

interface Props<T extends FieldValues = any> extends NumberFormatProps<InputProps> {
     control: Control<T>
     name: Path<T>
     validation?: RegisterOptions
     label: string,
     errorText?: string,
}

function NumberField<T extends FieldValues>({
     control,
     validation,
     name,
     label,
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
               }) => (
                    <div className={`text-field-wrapper ${error ? 'error' : ''} ${className}`}>
                         {label && <label>{label}</label>}
                         <NumberFormat
                              onValueChange={(e: NumberFormatValues) => onChange(e.value)}
                              value={value}
                              onBlur={onBlur}
                              getInputRef={ref}
                              name={name}
                              autoComplete={autoComplete}
                              status={error && "error"}
                              customInput={Input}
                              {...props}
                         />
                         {error && <span className='error-text'>
                              {error.message || errorText || 'Please fill in the field'}
                         </span>}
                    </div>
               )}
               name={name}
               control={control}
               rules={{ required: required, ...validation }}
          />
     )
}

export default NumberField