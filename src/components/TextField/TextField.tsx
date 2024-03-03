import { InputHTMLAttributes } from 'react'

const TextField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props

  return (
    <input
      className={`input input-bordered w-full ${className ?? ''}`}
      {...rest}
    />
  )
}

export default TextField
