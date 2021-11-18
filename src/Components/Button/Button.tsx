import React from "react"

type ButtonPropsType = {
    callback: () => void
    name: string
    disabled?: boolean
}

export const Button = ({callback, name, disabled}: ButtonPropsType) => {
    const onClickHandler = () => {
        callback()
    }
    return <button onClick={onClickHandler} disabled={disabled}>{name}</button>
}