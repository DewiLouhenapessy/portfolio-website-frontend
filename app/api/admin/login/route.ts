import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	let username = "";
	let password = "";

	const contentType = request.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		const body = await request.json().catch(() => ({}));
		username = typeof body.username === "string" ? body.username : "";
		password = typeof body.password === "string" ? body.password : "";
	} else {
		const formData = await request.formData();
		username = formData.get("username")?.toString() ?? "";
		password = formData.get("password")?.toString() ?? "";
	}

	const expectedUsername = process.env.ADMIN_USERNAME;
	const expectedPassword = process.env.ADMIN_PASSWORD;

	if (!expectedUsername || !expectedPassword) {
		return NextResponse.json(
			{ error: "Admin credentials are not configured." },
			{ status: 500 },
		);
	}

	const isValid =
		username === expectedUsername && password === expectedPassword;

	if (!isValid) {
		return NextResponse.json(
			{ error: "Gebruikersnaam of wachtwoord is onjuist." },
			{ status: 401 },
		);
	}

	const response = NextResponse.json({ ok: true }, { status: 200 });
	response.cookies.set("admin-auth", "true", {
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 8,
	});

	return response;
}
