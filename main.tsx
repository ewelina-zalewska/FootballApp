import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FootballApp } from "@/FootballApp";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<StrictMode>
			<FootballApp />
		</StrictMode>
	</QueryClientProvider>,
);
