"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import {loginUser} from "../services/UserService"
import { loginUserSchema } from "../schemas/userSchema";
import { useNavigate } from "react-router-dom"


// shadcn components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



function LoginForm() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginUserSchema>) =>{
    console.log(values)
    try {
      const response = await loginUser(values)
      console.log('User logged in successfully:', response)
      // Optionally, you can reset the form or redirect the user
      navigate('/')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your email address. It will not be shared with anyone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password..." type="password"{...field} />
              </FormControl>
              {/* <FormDescription>
                You will use this to login, do not be share it with anyone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="rounded-full w-full h-12 text-md" type="submit">Log in</Button>
      </form>
    </Form>
  )

}

export default LoginForm
