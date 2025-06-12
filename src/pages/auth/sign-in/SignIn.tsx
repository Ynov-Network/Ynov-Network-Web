import { Button } from "@/components/ui/button";
import { SocialAuthButtons } from "../social-auth/SocialAuthButtons";

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/password-input/password-input"
import { CustomInput } from "@/components/custom-input";
import { Mail, Lock } from "lucide-react";
import { useSignIn } from "@/services/auth/mutation";
import { useNavigate } from "react-router";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  university_email: z.string().email(),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignIn() {
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: {
      university_email: "",
      password: "",
    },
  })

  const onSubmit = async (values: SignInFormValues) => {
    return await signInMutation.mutateAsync(values, {
      onError: (error) => toast.error(`Sign in failed: ${error.message}`),
      onSuccess: () => {
        toast.success("Welcome back to your account!")
        return navigate("/feed");
      },
    })
  };

  // const onSubmit = async (values: SignInFormValues) => {
  //   await authClient.signIn.email({
  //     email: values.university_email,
  //     password: values.password,
  //   }, {
  //     onSuccess(ctx) {
  //       console.log("Sign in successful:", ctx.data);
  //       toast.success("Welcome back to your account!")
  //       return navigate("/feed");
  //     },
  //     onError(ctx) {
  //       toast.error(`Sign in failed: ${ctx.error.message}`)
  //     },
  //   })
  // };

  return (
    <div className="w-full flex flex-col gap-4 max-w-md mx-auto animate-slide-in-right">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground">Welcome Back!</h2>
        <p className="text-muted-foreground">Sign in to your YnovNetwork account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mx-auto">
          <FormField
            control={form.control}
            name="university_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Email</FormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="exemple@email.com"
                    type="email"
                    icon={Mail}
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
                  <PasswordInput
                    placeholder="Password"
                    icon={Lock}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button variant="link" className="text-primary-600 hover:text-primary-700 p-0 h-auto text-sm">
              Forgot password?
            </Button>
          </div>

          <Button
            loading={signInMutation.isPending}
            type="submit"
            variant="default"
            className="w-full"
          >
            {signInMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted-foreground/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialAuthButtons />

      <div className="text-center">
        <span className="text-muted-foreground text-sm">Don't have an account? </span>
        <Button
          variant="link"
          onClick={() => navigate("/sign-up")}
          className="text-primary-600 hover:text-primary-700 p-0 h-auto text-sm font-medium"
        >
          Create a new account now, it's FREE!
        </Button>
      </div>
    </div >
  );
}

export default SignIn;