"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

const formLabels = {
	name: { nl: "Naam", en: "Name" },
	email: { nl: "E-mail", en: "Email" },
	subject: { nl: "Onderwerp", en: "Subject" },
	message: { nl: "Bericht", en: "Message" },
	submit: { nl: "Verstuur", en: "Send" },
	sending: { nl: "Verzendt...", en: "Sending..." },
	success: { nl: "Bericht verzonden!", en: "Message sent!" },
	error: { nl: "Er is een fout opgetreden.", en: "An error occurred." },
};

export default function ContactForm() {
	const { locale } = useLanguage();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// TODO: Implementeer hier de API call om het formulier in te dienen
			// Bijvoorbeeld: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
			console.log("Form data:", data);

			setSubmitStatus("success");
			reset();

			// Reset success message after 3 seconds
			setTimeout(() => {
				setSubmitStatus("idle");
			}, 3000);
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
			{/* Name Field */}
			<div>
				<label htmlFor="name" className="block text-sm font-medium mb-2">
					{formLabels.name[locale]}
				</label>
				<input
					{...register("name")}
					id="name"
					type="text"
					placeholder={formLabels.name[locale]}
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
				)}
			</div>

			{/* Email Field */}
			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2">
					{formLabels.email[locale]}
				</label>
				<input
					{...register("email")}
					id="email"
					type="email"
					placeholder="your@email.com"
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
				)}
			</div>

			{/* Subject Field */}
			<div>
				<label htmlFor="subject" className="block text-sm font-medium mb-2">
					{formLabels.subject[locale]}
				</label>
				<input
					{...register("subject")}
					id="subject"
					type="text"
					placeholder={formLabels.subject[locale]}
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
				/>
				{errors.subject && (
					<p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
				)}
			</div>

			{/* Message Field */}
			<div>
				<label htmlFor="message" className="block text-sm font-medium mb-2">
					{formLabels.message[locale]}
				</label>
				<textarea
					{...register("message")}
					id="message"
					rows={5}
					placeholder={formLabels.message[locale]}
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
				/>
				{errors.message && (
					<p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
				)}
			</div>

			{/* Status Messages */}
			{submitStatus === "success" && (
				<div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
					{formLabels.success[locale]}
				</div>
			)}
			{submitStatus === "error" && (
				<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
					{formLabels.error[locale]}
				</div>
			)}

			{/* Submit Button */}
			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? formLabels.sending[locale] : formLabels.submit[locale]}
			</Button>
		</form>
	);
}
