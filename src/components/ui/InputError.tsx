import { FieldError } from "react-hook-form"

const InputError = ({ error }: { error: FieldError | undefined }) => {
    return (
        error && <span className="text-red-400">{error.message}</span>
    )
}

export default InputError