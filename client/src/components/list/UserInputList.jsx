import React from 'react'
import CustomUserInput from '../user/CustomUserInput'

export default function UserInputList({ inputs, register, watch, errors, isInvoice }) {
  return (
    inputs.map((i, index) => (
      <CustomUserInput
        key={`${index}-${i}`}
        name={i}
        register={register}
        watch={watch}
        error={errors[i]}
      />
    ))
  )
}
