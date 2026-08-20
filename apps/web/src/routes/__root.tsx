import { env } from "@portfolio-site/env/web";
import { Toaster } from "@portfolio-site/ui/components/sonner";
import { TooltipProvider } from "@portfolio-site/ui/components/tooltip";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createMiddleware } from "@tanstack/react-start";
import { evlogErrorHandler } from "evlog/nitro/v3";
import Header from "@/components/header";
import appCss from "@/index.css?url";
import type { api, orpc } from "@/utils/orpc";
export interface RouterAppContext {
	api: typeof api;
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootDocument,
	head: () => ({
		links: [
			{
				href: appCss,
				rel: "stylesheet",
			},
		],
		meta: [
			{
				charSet: "utf-8",
			},
			{
				content: "width=device-width, initial-scale=1",
				name: "viewport",
			},
			{
				title: "Yashraj Jaiswal | Dev",
			},
		],
	}),
	server: {
		middleware: [createMiddleware().server(evlogErrorHandler)],
	},
	shellComponent: ({ children }: { children: React.ReactNode }) => (
		<html className="dark" lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	),
});

function RootDocument() {
	return (
		<>
			<TooltipProvider>
				<div className="grid h-svh grid-rows-[auto_1fr]">
					<Header />
					<Outlet />
				</div>
			</TooltipProvider>
			<Toaster richColors />
			{env.VITE_ENV === "development" && (
				<>
					<TanStackRouterDevtools position="bottom-left" />
					<ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
				</>
			)}
		</>
	);
}
