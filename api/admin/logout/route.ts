import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const response = NextResponse.redirect(new URL("/admin", request.url));

	response.cookies.set("admin-auth", "", {
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0,
	});

	return response;
}
