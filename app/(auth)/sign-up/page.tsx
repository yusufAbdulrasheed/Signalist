"use client";
import { CountrySelectField } from "@/components/Forms/CountrySelectField";
import FooterLink from "@/components/Forms/FooterLink";
import InputField from "@/components/Forms/inputField";
import SelectField from "@/components/Forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "NGN",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },

    mode: "onBlur",
  });
  const onSubmit: (data: SignUpFormData) => Promise<void> = async (
    data: SignUpFormData
  ) => {
    try {

      const result = await signUpWithEmail(data)
      if(result.success) router.push('/')
      console.log(data);
    } catch (e) {
      console.error(e);
      toast.error('SignUp failed', {
        description: e instanceof Error ? e.message : "Failed to create an account"
      })
    }
  };
  return (
    <>
      <h1 className="form-title">Sign Up To Trade Connect </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Form fields will go here */}

        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is required", minLength: 2 }}
        />

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

        <CountrySelectField 
          name="country"
          label="Country"
          control={control}
          error= {errors.country}
          required

        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goals"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk tolerance"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
        <FooterLink
          text="Already have an account"
          linkText="Sign in"
          href="/sign-in"
          
        />
      </form>


    </>
  );
};

export default SignUp;
