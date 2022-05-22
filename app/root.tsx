import { withEmotionCache } from "@emotion/react"
import type { MetaFunction } from "@remix-run/node"
import { useContext, useEffect } from "react"
import { 
  Links, 
  LiveReload, 
  Meta, 
  Outlet, 
  Scripts, 
  ScrollRestoration, 
  useCatch,
 } from "@remix-run/react"
import { ClientStyleContext, ServerStyleContext } from "./context"
import { 
  ChakraProvider,
  VStack,
  Heading,
  Text,
  extendTheme,
} from "@chakra-ui/react"

export const meta: MetaFunction = () => {
  return { title: "Remix + Chakra-ui on Fly.io" }
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error("Boundary:", error)
  return (
    <Document>
      <VStack h="25vh" justify="center">
        <Heading>There was an error</Heading>
        <Text>{error.message}</Text>
        <hr />
        <Text>Yeah, this needs some love...</Text>
      </VStack>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()
  let message
  switch (caught.status) {
    // only catching 404s here, you can add additional cases here if needed
    case 404:
      message = <Text>Yeah, nothing to see here, move along...</Text>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document>
      <VStack h="25vh" justify="center">
        <Heading>
          {caught.status}
        </Heading>
        {message}
      </VStack>
    </Document>
  )
}

interface DocumentProps {
  children: React.ReactNode
}

// uncomment and add custom theme stuff below (or use an import)
// const eTheme = {}
const theme = extendTheme({});


// Document class 
const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
  const serverSyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      ;(emotionCache.sheet as any)._insertTag(tag)
    })
    // reset cache to reapply global styles
    clientStyleData?.reset()
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {serverSyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(" ")}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  )
})
