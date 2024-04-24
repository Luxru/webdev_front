import React from 'react'

import { getCsrfToken, signIn } from "next-auth/react"
import { useRouter } from "next/router"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "email should not be empty.",
  }),
  pwd: z.string().min(1, {
    message: "password should not be empty.",
  }),
})

function LoginPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      pwd: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //do login
    console.log(router.query)
    const callbackUrl: string = typeof router.query.callbackUrl === 'string' ? router.query.callbackUrl : "/app"
    signIn("credentials", { username: data.email, password: data.pwd, callbackUrl: callbackUrl })
  }
  return (
    <div className='flex items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col w-[95%] md:w-[70%] lg:w-[40%] h-full overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex justify-center overflow-y-auto'>
          <main className='flex items-center justify-center p-4 sm:p-8 lg:w-[60%]'>
            <div className='w-full flex flex-col items-center'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="lux@luxru.top" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pwd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className='w-full'>Submit</Button>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}