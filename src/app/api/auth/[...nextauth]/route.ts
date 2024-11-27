import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? '',
      clientSecret: process.env.FACEBOOK_SECRET ?? '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID ?? '',
      clientSecret: process.env.TWITTER_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 