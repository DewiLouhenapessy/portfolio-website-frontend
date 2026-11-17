"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/context/AuthContext";
import { pageContent } from "@/lib/i18n";
import { adminLoginSchema, type AdminLoginData } from "@/lib/validations";

function FloatingLabel({
	label,
	value,
	children,
}: {
	label: string;
	value: string;
	children: React.ReactNode;
}) {
	const isFilled = value.trim().length > 0;

	return (
		<div className="">
			<div
				className={
					isFilled
						? "flex items-center pointer-events-none  left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200"
						: "relative pointer-events-none  left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200"
				}
			>
				<span className={isFilled ? "text-xs top-4" : "absolute text-sm top-4"}>
					{label}
				</span>
			</div>
			{children}
		</div>
	);
}

export default function AdminLoginForm() {
	const { locale } = useLanguage();
	const { login } = useAuth();
	const loginContent = pageContent.admin.login;
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AdminLoginData>({
		resolver: zodResolver(adminLoginSchema),
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const emailValue = useWatch({ control, name: "email" }) ?? "";
	const passwordValue = useWatch({ control, name: "password" }) ?? "";

	const onSubmit = async (data: AdminLoginData) => {
		setIsSubmitting(true);
		setSubmitStatus("idle");
		setErrorMessage("");

		try {
			await login(data.email, data.password);
		} catch (error) {
			console.error(loginContent.loginFailed[locale], error);
			setErrorMessage(
				error instanceof Error
					? error.message
					: loginContent.genericError[locale],
			);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<label className="flex flex-col gap-2 text-sm font-medium text-foreground">
				<FloatingLabel label={loginContent.email[locale]} value={emailValue}>
					<input
						{...register("email")}
						type="email"
						autoComplete="email	"
						placeholder=""
						className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-ring"
					/>
				</FloatingLabel>
				{errors.email && (
					<p className="text-sm text-red-600">{errors.email.message}</p>
				)}
			</label>

			<label className="flex flex-col gap-2 text-sm font-medium text-foreground">
				<FloatingLabel
					label={loginContent.password[locale]}
					value={passwordValue}
				>
					<input
						{...register("password")}
						type="password"
						autoComplete="current-password"
						placeholder=""
						className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-ring"
					/>
				</FloatingLabel>
				{errors.password && (
					<p className="text-sm text-red-600">{errors.password.message}</p>
				)}
			</label>

			{submitStatus === "error" && (
				<div className="rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
					{errorMessage}
				</div>
			)}

			<Button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-gradient-theme not-dark:text-black transition hover:-translate-x-1"
			>
				{isSubmitting
					? loginContent.submitting[locale]
					: loginContent.submit[locale]}
			</Button>
		</form>
	);
}
