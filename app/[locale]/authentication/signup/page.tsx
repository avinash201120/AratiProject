"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building2, GraduationCap, User2 } from "lucide-react";
import toast from "react-hot-toast"; // Assuming you're using react-hot-toast

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
import { Card } from "@/components/ui/card";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  country: z.string().min(2, "Please select your country"),
  town: z.string().min(2, "Please enter your town"),
  role: z.enum(["student", "merchant", "citizen"]),
  schoolCategory: z.string().optional(),
  school: z.string().optional(),
});

export default function SignUpPage() {
  const [role, setRole] = useState<string>("citizen");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      town: "",
      role: "citizen",
      schoolCategory: "",
      school: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form data:", values);
    const apiUrl = "/api/authentication/signup"; // Replace with your actual API endpoint

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      const responseData = await response.json();
      console.log("Form submitted successfully:", responseData);

      // Show success toast
      toast.success(responseData.message || "Account created successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);

      // Show error toast
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  const roleIcons = {
    student: <GraduationCap className="h-5 w-5" />,
    merchant: <Building2 className="h-5 w-5" />,
    citizen: <User2 className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
          alt="People working together"
          className="object-cover w-full"
          width={100}
          height={100}
          layout="responsive"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
          <p className="text-lg opacity-90">
            Create an account and become part of our growing network
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <Card className="max-w-xl mx-auto p-6 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-muted-foreground">
                Fill in your details to get started
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
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
                        <Input
                          type="password"
                          placeholder="Enter a strong password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="town"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Town</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setRole(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">
                            <div className="flex items-center gap-2">
                              {roleIcons.student}
                              <span>Student</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="merchant">
                            <div className="flex items-center gap-2">
                              {roleIcons.merchant}
                              <span>Merchant</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="citizen">
                            <div className="flex items-center gap-2">
                              {roleIcons.citizen}
                              <span>Citizen</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {role === "student" && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="schoolCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select school category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="highschool">
                                High School
                              </SelectItem>
                              <SelectItem value="university">
                                University
                              </SelectItem>
                              <SelectItem value="college">College</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your school name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Building2, GraduationCap, User2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";

// const formSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .regex(/[A-Za-z]/, "Password must contain at least one letter")
//     .regex(/[0-9]/, "Password must contain at least one number"),
//   country: z.string().min(2, "Please select your country"),
//   town: z.string().min(2, "Please enter your town"),
//   role: z.enum(["student", "merchant", "citizen"]),
//   schoolCategory: z.string().optional(),
//   school: z.string().optional(),
// });

// export default function SignUpPage() {
//   const [role, setRole] = useState<string>("citizen");

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       country: "",
//       town: "",
//       role: "citizen",
//       schoolCategory: "",
//       school: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("Submitting form data:", values);

//     const apiUrl = "/api/authentication/signup"; // Replace with your actual API endpoint

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit form data");
//       }

//       const responseData = await response.json();
//       console.log("Form submitted successfully:", responseData);
//       alert("Account created successfully!");
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert("Failed to create account. Please try again.");
//     }
//   }

//   const roleIcons = {
//     student: <GraduationCap className="h-5 w-5" />,
//     merchant: <Building2 className="h-5 w-5" />,
//     citizen: <User2 className="h-5 w-5" />,
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left side - Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative">
//         <Image
//           src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
//           alt="People working together"
//           className="object-cover w-full"
//           width={100}
//           height={100}
//           layout="responsive"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
//           <p className="text-lg opacity-90">
//             Create an account and become part of our growing network
//           </p>
//         </div>
//       </div>

//       {/* Right side - Form */}
//       <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
//         <Card className="max-w-xl mx-auto p-6 shadow-lg">
//           <div className="space-y-6">
//             <div className="space-y-2 text-center">
//               <h2 className="text-3xl font-bold">Create Account</h2>
//               <p className="text-muted-foreground">
//                 Fill in your details to get started
//               </p>
//             </div>

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="john.doe@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="Enter a strong password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="country"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Country</FormLabel>
//                         <FormControl>
//                           <Input placeholder="United States" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="town"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Town</FormLabel>
//                         <FormControl>
//                           <Input placeholder="New York" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select
//                         onValueChange={(value) => {
//                           field.onChange(value);
//                           setRole(value);
//                         }}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select your role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="student">
//                             <div className="flex items-center gap-2">
//                               {roleIcons.student}
//                               <span>Student</span>
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="merchant">
//                             <div className="flex items-center gap-2">
//                               {roleIcons.merchant}
//                               <span>Merchant</span>
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="citizen">
//                             <div className="flex items-center gap-2">
//                               {roleIcons.citizen}
//                               <span>Citizen</span>
//                             </div>
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {role === "student" && (
//                   <div className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="schoolCategory"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>School Category</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select school category" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="highschool">
//                                 High School
//                               </SelectItem>
//                               <SelectItem value="university">
//                                 University
//                               </SelectItem>
//                               <SelectItem value="college">College</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="school"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>School Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter your school name"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 )}

//                 <Button
//                   type="submit"
//                   className="w-full bg-green-500 text-white hover:bg-green-600"
//                 >
//                   Create Account
//                 </Button>
//               </form>
//             </Form>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Building2, GraduationCap, User2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";

// const formSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   country: z.string().min(2, "Please select your country"),
//   town: z.string().min(2, "Please enter your town"),
//   role: z.enum(["student", "merchant", "citizen"]),
//   schoolCategory: z.string().optional(),
//   school: z.string().optional(),
// });

// export default function SignUpPage() {
//   const [role, setRole] = useState<string>("citizen");

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       country: "",
//       town: "",
//       role: "citizen",
//       schoolCategory: "",
//       school: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("Submitting form data:", values);

//     const apiUrl = "/api/signup"; // Replace with your actual API endpoint

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit form data");
//       }

//       const responseData = await response.json();
//       console.log("Form submitted successfully:", responseData);
//       alert("Account created successfully!");
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert("Failed to create account. Please try again.");
//     }
//   }

// //   function onSubmit(values: z.infer<typeof formSchema>) {
// //     console.log(values);
// //   }

//   const roleIcons = {
//     student: <GraduationCap className="h-5 w-5" />,
//     merchant: <Building2 className="h-5 w-5" />,
//     citizen: <User2 className="h-5 w-5" />,
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left side - Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative">
//         <Image
//           src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
//           alt="People working together"
//           className="object-cover w-full"
//           width={100}
//           height={100}
//           layout="responsive"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
//           <p className="text-lg opacity-90">
//             Create an account and become part of our growing network
//           </p>
//         </div>
//       </div>

//       {/* Right side - Form */}
//       <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
//         <Card className="max-w-xl mx-auto p-6 shadow-lg">
//           <div className="space-y-6">
//             <div className="space-y-2 text-center">
//               <h2 className="text-3xl font-bold">Create Account</h2>
//               <p className="text-muted-foreground">
//                 Fill in your details to get started
//               </p>
//             </div>

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="john.doe@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="country"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Country</FormLabel>
//                         <FormControl>
//                           <Input placeholder="United States" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="town"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Town</FormLabel>
//                         <FormControl>
//                           <Input placeholder="New York" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select
//                         onValueChange={(value) => {
//                           field.onChange(value);
//                           setRole(value);
//                         }}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select your role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="student">
//                             <div className="flex items-center gap-2">
//                               {roleIcons.student}
//                               <span>Student</span>
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="merchant">
//                             <div className="flex items-center gap-2">
//                               {roleIcons.merchant}
//                               <span>Merchant</span>
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="citizen">
//                             <div className="flex items-center gap-2">
//                               {roleIcons.citizen}
//                               <span>Citizen</span>
//                             </div>
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {role === "student" && (
//                   <div className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="schoolCategory"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>School Category</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select school category" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="highschool">
//                                 High School
//                               </SelectItem>
//                               <SelectItem value="university">
//                                 University
//                               </SelectItem>
//                               <SelectItem value="college">College</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="school"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>School Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter your school name"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 )}

//                 <Button
//                   type="submit"
//                   className="w-full bg-green-500 text-white hover:bg-green-600"
//                 >
//                   Create Account
//                 </Button>
//               </form>
//             </Form>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
