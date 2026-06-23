import { z } from "zod";

export const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Naam moet minstens 2 karakters bevatten" })
		.max(100, { message: "Naam mag niet langer dan 100 karakters zijn" }),
	email: z.string().email({ message: "Voer een geldig e-mailadres in" }),
	subject: z
		.string()
		.min(5, { message: "Onderwerp moet minstens 5 karakters bevatten" })
		.max(200, { message: "Onderwerp mag niet langer dan 200 karakters zijn" }),
	message: z
		.string()
		.min(10, { message: "Bericht moet minstens 10 karakters bevatten" })
		.max(5000, { message: "Bericht mag niet langer dan 5000 karakters zijn" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
