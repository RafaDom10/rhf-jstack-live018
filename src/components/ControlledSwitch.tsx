import { Control, FieldValues, FieldPath, useController, useFormContext } from "react-hook-form";
import { Switch } from "./ui/Switch";

interface IProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
}

export function ControlledSwitch<T extends FieldValues>({ control, name }: IProps<T>) {
  const { watch, formState: {  } } = useFormContext()
  const { field } = useController({
    name,
    control
  })

  return (
    <Switch
      onCheckedChange={field.onChange}
      checked={field.value}
    />
  )
}
