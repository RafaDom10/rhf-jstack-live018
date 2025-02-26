import { ErrorMessage } from "@hookform/error-message";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { useForm } from 'react-hook-form'

interface IFormData {
  name: string
  age: number
}

export function App() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState,
    clearErrors,
    setFocus
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
    }
  })

  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log('data', data)
    },
    (errors) => {
      console.log('errors', errors)
    }
  )

  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">

        <div>
          <Input
            placeholder="Nome"
            {...register('name', {
              required: {
                value: true,
                message: 'Preencha o nome!'
              }
            })}
          />

          <ErrorMessage
            errors={formState.errors}
            name="name"
            render={({ message }) => (
              <small className="text-red-400 block">
                {message}
              </small>
            )}
          />
        </div>
        <div>
          <Input
            placeholder="Idade"
            type="number"
            {...register('age', {
              required: {
                value: true,
                message: 'Preencha a idade!'
              },
              setValueAs: ( value ) => Number(value)
            })}
          />
          {formState.errors.age && (
            <small className="text-red-400 block">
              {formState.errors.age.message}
            </small>
          )}
        </div>

        <div className="flex mt-4 gap-4">
          <Button className="flex-1" disabled={!isDirty || formState.isSubmitting || !formState.isValid}>
            Salvar
          </Button>
          <Button className="flex-1" disabled={isDirty || formState.isSubmitting || !formState.isValid}>
            Enviar
          </Button>
        </div>

        <div className="mt-4 gap-2">
          <Button size="sm" variant="outline" type="button" onClick={() => clearErrors()}>
            Limpar erros
          </Button>
          <Button size="sm" variant="outline" type="button" onClick={() => setFocus('name')}>
            Focar no nome
          </Button>
        </div>
      </form>
    </div>
  )
}
