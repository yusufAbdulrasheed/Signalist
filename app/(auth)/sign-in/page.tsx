"use client"
import Link from "next/link"
import FooterLink from "@/components/Forms/FooterLink"
import InputField from "@/components/Forms/inputField"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/actions/auth.actions"


const SignIn = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });
  const onSubmit: (data: SignInFormData) => Promise<void> = async (
      data: SignInFormData
    ) => {
      try {
  
        const result = await signInWithEmail(data)
        if(result.success) router.push('/dashboard')
        console.log(data);
      } catch (e) {
        console.error(e);
        toast.error('SignIn failed', {
          description: e instanceof Error ? e.message : "Failed to Sign In"
        })
      }
    }
  return (
    <>
      <h1 className="form-title">Login To Trade Connect </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Form fields will go here */}

        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your Password"
          type="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: 8,
            maxLength: 128,
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </Button>
        <p className="text-center text-sm text-neutral-400">
          Forgot password?{" "}
          <Link className="text-yellow-300 hover:underline" href="/forgot-password">
            Reset it
          </Link>
        </p>
        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
          
        />
      </form>
    </>
  )
}

export default SignIn


// : (data: SignInFormData) => Promise<void>