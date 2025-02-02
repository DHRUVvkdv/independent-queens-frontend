import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const email = request.cookies.get("userEmail");
	if (!email) {
		return NextResponse.redirect(new URL("/auth", request.url)); // Redirect if no user is signed in
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/g/:path*"], // Dynamically matches all paths under /g
};
