import { useEffect, useState } from "react";
import { sleep } from "./app/lib/utils";
import { Form } from "./Form";
import { IUser } from "./IUser";
import { FormWithZod } from "./FormWithZod";

async function getUser() {
  await sleep(2000)
  return {
    age: 30,
    city: 'São Paulo',
    name: 'Rafael',
    street: 'Rua Exemplo',
    zipcode: '08000-000'
  }
}

export function App() {
  const [user, setUser] = useState({} as IUser)

  useEffect(() => {
    getUser()
    .then( data => {
      console.log("Terminou de carregar1")
      setUser(data)
    })
  },[])

  return (
    <Form  user={user} />
  )
}
