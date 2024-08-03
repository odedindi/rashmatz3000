// import { auth } from '@/auth';
import { NextPage } from 'next';
// import LoginPage from './auth/log-in/page';

const Home: NextPage = async () => {
  // const session = auth().then((session) => {
  //   console.log(session);
  //   return session;
  // });
  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">test</p>
        </div>
      </div>
    </>
  );
};

export default Home;
