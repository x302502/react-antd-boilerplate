import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // Whether to refetch data when window is focused
			refetchOnReconnect: false, // Whether to refetch data when network connection is restored
			retry: 0 // Number of retry attempts
		},
		mutations: {
			retry: 0 // Number of retry attempts
		}
	}
});

export interface TanstackQueryProps {
	children: ReactNode;
}

export function TanstackQuery({ children }: TanstackQueryProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
