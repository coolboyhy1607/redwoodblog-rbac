import { AuthProvider } from '@redwoodjs/auth'
import netlifyIdentity from 'netlify-identity-widget'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { FatalErrorBoundary } from '@redwoodjs/web'

import { isBrowser } from '@redwoodjs/prerender/browserUtils'

import Routes from 'src/Routes'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import './scaffold.css'
import './index.css'

isBrowser && netlifyIdentity.init()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={netlifyIdentity} type="netlify">
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </AuthProvider>
  </FatalErrorBoundary>
)

export default App
