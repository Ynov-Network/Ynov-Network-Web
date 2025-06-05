import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { PasswordSetupStep } from "./steps/PasswordSetupStep";
import { SocialAuthButtons } from "../social-auth/SocialAuthButtons";
import { signUpSchema, type SignUpFormValues } from "./steps/schema";
import { useSignUp } from "@/services/auth/mutation";
import { useNavigate } from "react-router";

function SignUp() {
  // navigation
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    nextStep: goToNextStepHook,
    previousStep,
  } = useMultiStepForm(2);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      university_email: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    const { confirmPassword, ...submissionValues } = values;
    return await signUpMutation.mutateAsync(submissionValues, {
      onError: (error) => toast.error(`Sign up failed: ${error.message}`),
      onSuccess: () => {

        toast.success("Your account was created successfully!");
        toast.message("Verify your email address!", {
          description: "An email verification link was sent to your email address"
        });
        return navigate("/sign-in")
      },
    });
  };

  const stepComponents = [
    <PersonalInfoStep key="step1" form={form} />,
    <PasswordSetupStep key="step2" form={form} />,
  ];


  const handleNext = async () => {
    let fieldsToValidate: (keyof SignUpFormValues)[] = [];
    if (currentStepIndex === 0) {
      fieldsToValidate = ['university_email', 'first_name', 'last_name', 'username'];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      goToNextStepHook();
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-md mx-auto animate-slide-in-left">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground">Join YnovNetwork</h2>
        <p className="text-muted-foreground">Create your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {stepComponents[currentStepIndex]}

          {/* Terms and Conditions on the last step */}
          {isLastStep && (
            <div>
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{" "}
                <Button variant="link" className="text-primary-600 h-auto p-0 text-xs">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="text-primary-600 h-auto p-0 text-xs">
                  Privacy Policy
                </Button>
              </p>
            </div>
          )}

          <div className="flex space-x-4">
            {!isFirstStep && (
              <Button
                type="button"
                variant="outline"
                onClick={previousStep}
                className="flex-1 border-2"
              >
                <ChevronLeft className="size-4 mr-2" />
                Previous
              </Button>
            )}

            {!isLastStep ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 transition-all duration-300 hover:glow-primary"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 transition-all duration-300 hover:glow-primary"
                loading={signUpMutation.isPending}
              >
                {signUpMutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      {isFirstStep && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <SocialAuthButtons />
        </>
      )}

      <div className="text-center">
        <span className="text-muted-foreground text-sm">Already have an account? </span>
        <Button
          variant="link"
          onClick={() => navigate("/sign-in")}
          className="text-primary-600 hover:text-primary-700 p-0 h-auto text-sm font-medium"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default SignUp;