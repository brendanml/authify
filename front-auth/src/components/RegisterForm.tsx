"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {createUser} from "../services/UserService"
import { newUserSchema } from "../schemas/userSchema";



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
import { Checkbox } from "@/components/ui/checkbox"


function RegisterForm() {

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      consent: false, // Default value for consent checkbox
    },
  })

  const onSubmit = async (values: z.infer<typeof newUserSchema>) =>{
    console.log(values)
    try {
      const response = await createUser(values)
      console.log('User created successfully:', response)
      // Optionally, you can reset the form or redirect the user
      form.reset()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email." {...field} />
              </FormControl>

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
                <Input placeholder="Enter your password." type="password"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex space-x-2">
              <FormControl>
                <Checkbox
                  id="consent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="consent" className="cursor-pointer text-xs text-[var(--color-text-background)] text-left">
                By registering, I consent to the processing of my personal information in accordance with the Privacy Policy.
              </FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full w-full h-12 text-md">Sign up</Button>
      </form>
    </Form>
  )

}

export default RegisterForm
