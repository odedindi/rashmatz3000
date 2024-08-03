import { auth, signIn, signOut } from '@/auth';
import { NextPage } from 'next';
// import LoginPage from './auth/log-in/page';

const Home: NextPage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">test</p>
          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('google');
              }}
            >
              <button type="submit">Sign in</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
