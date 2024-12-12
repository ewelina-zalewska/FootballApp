import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/style/index.scss";
import { FootballApp } from "@/components/FootballApp";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<FootballApp />
	</StrictMode>,
);
