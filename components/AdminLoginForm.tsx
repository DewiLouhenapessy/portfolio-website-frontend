"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { adminLoginSchema, type AdminLoginData } from "@/lib/validations";

export default function AdminLoginForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AdminLoginData>({
		resolver: zodResolver(adminLoginSchema),
	});

	const onSubmit = async (data: AdminLoginData) => {
		setIsSubmitting(true);
		setSubmitStatus("idle");
		setErrorMessage("");

		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const result = await response.json().catch(() => ({}));
				throw new Error(
					result?.error || "Gebruikersnaam of wachtwoord is onjuist.",
				);
			}

			window.location.assign("/admin");
		} catch (error) {
			console.error("Admin login failed", error);
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Er is een fout opgetreden tijdens het inloggen.",
			);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<label className="flex flex-col gap-2 text-sm font-medium text-foreground">
				<span>Gebruikersnaam</span>
				<input
					{...register("username")}
					type="text"
					autoComplete="username"
					className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-ring"
				/>
				{errors.username && (
					<p className="text-sm text-red-600">{errors.username.message}</p>
				)}
			</label>

			<label className="flex flex-col gap-2 text-sm font-medium text-foreground">
				<span>Wachtwoord</span>
				<input
					{...register("password")}
					type="password"
					autoComplete="current-password"
					className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-ring"
				/>
				{errors.password && (
					<p className="text-sm text-red-600">{errors.password.message}</p>
				)}
			</label>

			{submitStatus === "error" && (
				<div className="rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
					{errorMessage}
				</div>
			)}

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Inlogt..." : "Inloggen"}
			</Button>
		</form>
	);
}
