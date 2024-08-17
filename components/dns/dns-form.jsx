import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import isValidDomain from "is-valid-domain";

import { DNSTypes } from "./dns-type";
import DNSResolver from "../../doh.json";
import { useEffect } from "react";
import { useState } from "react";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Please input a domain.",
    })
    .refine(
      (val) =>
        isValidDomain(val, {
          subdomain: true,
          wildcard: false,
          allowUnicode: true,
          topLevel: true,
        }),
      {
        message: "Invalid Domain Name.",
      },
    ),
  type: z.string(),
  resolver: z.string(),
});

const defaultValues = {
  name: '',
  type: "A",
  resolver: "cloudflare",
}

export function DNSForm({ onSearch }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const paramsList = ['name', 'type', 'resolver']
    const params = new URLSearchParams(location.search)
    paramsList.forEach((param) => {
      // console.log(params.get(param), defaultValues[param], form)
      setTimeout(() => {
        form.setValue(param, params.get(param) || defaultValues[param])
      }, 0)
    })
  }, [])

  function changeName(e) {
    const urlParser = z.string().url()
    const result = urlParser.safeParse(e.target.value)
    if (result.success) {
      const urlObj = new URL(result.data)
      form.setValue('name', urlObj.hostname)
    }
  };

  function onSubmit(formData) {
    setLoading(true)
    onSearch(formData);
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mx-auto md:flex-row md:space-x-4 lg:w-11/12 md:mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="dns.surf" autoFocus {...field} onBlur={changeName} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="mt-2 md:mt-0">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  {...field}
                >
                  <SelectTrigger className="md:w-[130px]">
                    <SelectValue placeholder="Record type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DNSTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resolver"
          render={({ field }) => (
            <FormItem className="mt-2 md:mt-0">
              <FormLabel>Resolver</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  {...field}
                >
                  <SelectTrigger className="md:w-[160px] lg:w-[240px]">
                    <SelectValue placeholder="DNS Resolver" />
                  </SelectTrigger>
                  <SelectContent>
                    {DNSResolver.map((server) => (
                      <SelectItem key={server[0]} value={server[0]}>
                        {server[0]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" type="submit" className="mt-6 md:mt-8 h-10 w-full md:w-32" disabled={loading}>
          {loading && (
            <span className="w-4 h-4 mr-2 animate-spin icon-[lucide--loader-2]" />
          )}
          Query
        </Button>
      </form>
    </Form>
  );
}
