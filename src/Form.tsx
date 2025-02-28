import { ErrorMessage } from "@hookform/error-message";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from "react";
import { IUser } from "./IUser";
import { ControlledSwitch } from "./components/ControlledSwitch";

interface IForm {
  user: IUser
}

export function Form({ user }: IForm) {
  const form = useForm<IUser>({
    values: user,
    resetOptions: {
      keepDirtyValues: true
    },
    mode: 'onBlur', //* modo de validacao de erros
    reValidateMode: 'onChange'
    // defaultValues: async () => {
    //   await sleep(2000)
    //   //* request para carregar dados default
    //   return {
    //     age: 30,
    //     city: 'São Paulo',
    //     name: 'Rafael',
    //     street: 'Rua Exemplo',
    //     zipcode: '08000-000'
    //   }
    // }
  })

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState,
    clearErrors,
    setFocus,
    setValue,
    watch,
    control
  } = form;

  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log('data', data)
    },
    (errors) => {
      setFocus('zipcode')
      console.log('errors', errors)
    }
  )

  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  useEffect(() => {
    const { unsubscribe } = watch(async (formData, { name }) => {
      const zipcode = formData.zipcode ?? '';

      if (name === 'zipcode' && zipcode.length >= 8) {
        const request = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
        const body = await request.json()
        setValue('city', body.localidade)
        setValue('street', body.logradouro)
      }
    });

    return () => {
      unsubscribe()
    }
  }, [watch, setValue])

  return (
    <FormProvider {...form}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {formState.isLoading && (
          <h1>Carregando dados...</h1>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
          <div>
            <ControlledSwitch
              control={control}
              name="blocked"
            />
          </div>
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
                setValueAs: (value) => Number(value)
              })}
            />
            {formState.errors.age && (
              <small className="text-red-400 block">
                {formState.errors.age.message}
              </small>
            )}
          </div>

          <Input
            className="flex-1"
            placeholder="CEP"
            {...register('zipcode')}
          />

          <Input
            placeholder="Cidade"
            {...register('city')}
          />
          <Input
            placeholder="Rua"
            {...register('street')}
          />

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
    </FormProvider>

  )
}
