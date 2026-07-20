import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = contactFormSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ error: "Invalid form data", details: parsed.error.issues },
				{ status: 400 },
			);
		}

		const { name, email, subject, message } = parsed.data;

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: process.env.SMTP_SECURE === "true",
			auth:
				process.env.SMTP_USER && process.env.SMTP_PASS
					? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
					: undefined,
		});

		const mailOptions = {
			from: process.env.EMAIL_FROM || process.env.SMTP_USER,
			to: process.env.EMAIL_TO,
			subject: `[Contact] ${subject}`,
			text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
			html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/\n/g, "<br />")}</p>`,
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error("Error sending email:", err);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 },
		);
	}
}
