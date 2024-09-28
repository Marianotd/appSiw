import CustomInvoiceInput from "../invoices/CustomInvoiceInput";
import CustomInput from "../login-register/CustomInput";

export default function InputList({ inputs, register, watch, errors, isInvoice }) {
  return (
    inputs.map((i, index) => (
      !isInvoice ? (
        <CustomInput
          key={`${index}-${i}`}
          name={i}
          register={register}
          watch={watch}
          error={errors[i]}
        />
      ) : (
        <CustomInvoiceInput
          key={`${index}-${i}`}
          name={i}
          register={register}
          watch={watch}
          error={errors[i]}
        />
      )
    ))
  )
}
