import { ButtonHTMLAttributes } from 'react'

import ButtonBase from '../ButtonBase'

const ButtonWide = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...rest } = props

  return <ButtonBase className={`btn-wide ${className ?? ''}`} {...rest} />
}

export default ButtonWide
