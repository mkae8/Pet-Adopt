"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ... (previous imports and type definitions)

const FormSchema = z.object({
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
  description: z
    .string()
    .max(100, { message: "Description must be no more than 100 characters." }),
});

const Requests = () => {
  // ... (previous state and hooks)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const sendEmail = async (data: z.infer<typeof FormSchema>) => {
    if (!selectedRequest) {
      toast({
        title: "Error",
        description: "No request selected.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sendMailer`,
        {
          email: selectedRequest.userId.email,
          phone: data.phoneNumber,
          petName: selectedRequest.petId.petName,
          senderEmail: user.user?.primaryEmailAddress?.emailAddress,
        }
      );

      if (response.status === 201) {
        toast({
          title: "Email sent successfully",
          description: "The applicant has been notified.",
        });
        closeModal();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    sendEmail(data);
  }

  // ... (rest of the component code)

  return (
    // ... (previous JSX)
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Утасны дугаар</FormLabel>
              <FormControl>
                <Input placeholder="Утасны дугаар" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нэмэлт мэдээлэл</FormLabel>
              <FormControl>
                <Input placeholder="Нэмэлт мэдээлэл оруулна уу" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-between items-center">
          <Button onClick={closeModal} className="w-full sm:w-auto">
            Хаах
          </Button>
          <Button type="submit" className="bg-green-400" disabled={loading}>
            {loading ? "Илгээж байна..." : "Илгээх"}
          </Button>
        </div>
      </form>
    </Form>
    // ... (rest of the JSX)
  );
};

export default Requests;
