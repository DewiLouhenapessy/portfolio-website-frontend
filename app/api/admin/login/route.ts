import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const username = formData.get("username")?.toString() ?? "";
	const password = formData.get("password")?.toString() ?? "";

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
	const response = NextResponse.redirect(new URL("/admin", request.url));

	if (isValid) {
		response.cookies.set("admin-auth", "true", {
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 8,
		});
	}

	return response;
}
