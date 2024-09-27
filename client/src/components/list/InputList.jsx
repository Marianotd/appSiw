import CustomInput from "../login-register/CustomInput";

export default function InputList({ inputs, register, watch, errors }) {
  return (
    inputs.map((i, index) => (
      <CustomInput
        key={`${index}-${i}`}
        name={i}
        register={register}
        watch={watch}
        error={errors[i]}
      />
    ))
  )
}
