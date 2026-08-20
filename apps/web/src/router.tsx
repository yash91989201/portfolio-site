import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import Loader from "@/components/shared/loader";
import { api, createQueryClient, orpc } from "@/utils/orpc";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	const queryClient = createQueryClient();

	const router = createTanStackRouter({
		context: { api, orpc, queryClient },
		defaultNotFoundComponent: () => <div>Not Found</div>,
		defaultPendingComponent: () => <Loader />,
		defaultPreloadStaleTime: 0,
		routeTree,
		scrollRestoration: true,
	});

	setupRouterSsrQueryIntegration({
		queryClient,
		router,
	});

	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
