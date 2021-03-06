import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apolloClient';
import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/index.css';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const { user } = pageProps;

    return (
        <ApolloProvider client={apolloClient}>
            <UserProvider user={user}>
                <Component {...pageProps} />
            </UserProvider>
            </ApolloProvider>
    );
}
