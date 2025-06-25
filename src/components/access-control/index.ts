import type { ReactNode } from "react";

import { useAccess } from "~/hooks";

interface AccessControlProps {
	// Permission type, defaults to code

	type?: "code" | "role";
	// Permission value, can be a string or string array
	codes?: string | string[];
	children?: ReactNode;
	// Display when no permission, by default nothing is shown when there's no permission.
	fallback?: ReactNode;
}

/**
 * Permission verification component
 *
 * @param AccessControlProps Permission verification component properties
 * @returns If the child component exists and the permission value is valid, return the child component; otherwise return null
 */
export function AccessControl({
	type = "code",
	codes,
	children,
	fallback
}: AccessControlProps) {
	const { hasAccessByCodes, hasAccessByRoles } = useAccess();

	if (!children) return null;

	if (!type || type === "code") {
		return hasAccessByCodes(codes) ? children : fallback;
	}

	if (type === "role") {
		return hasAccessByRoles(codes) ? children : fallback;
	}

	return fallback;
}
