import { AuthProvider } from '@redwoodjs/auth'
import netlifyIdentity from 'netlify-identity-widget'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { QueryClientProvider, QueryClient } from 'react-query'
import { RedwoodReactQueryProvider } from 'redwoodjs-react-query-provider'

import { isBrowser } from '@redwoodjs/prerender/browserUtils'

import Routes from 'src/Routes'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import './scaffold.css'
import './index.css'
const queryClient = new QueryClient()
isBrowser && netlifyIdentity.init()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <QueryClientProvider client={queryClient}>
        <AuthProvider client={netlifyIdentity} type="netlify">
          <RedwoodReactQueryProvider>
            <Routes />
          </RedwoodReactQueryProvider>
        </AuthProvider>
      </QueryClientProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
