import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {Toaster} from "react-hot-toast";
import {useColorModeValue} from "@chakra-ui/react";

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()

function App() {
    const background = useColorModeValue('#fff', '#333');
    const color = useColorModeValue('#333', '#fff');
  return (
      <>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <TanStackRouterDevtools router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <Toaster toastOptions={{
              style: {
                  borderRadius: '10px',
                  background,
                  color,
              }
          }}/>
      </>
  )
}

export default App
