import { Card } from '@/components/ui/card';
import { UserAuthForm } from '../components/user-auth-form';
import { UserPlus2 } from 'lucide-react';
import { NextPage } from 'next';

const SignInPage: NextPage = () => (
  <>
    <div className="mb-4 flex items-center justify-center gap-2">
      <UserPlus2 />
      <h1 className="text-xl font-medium">Sign In</h1>
    </div>
    <Card className="rounded p-6">
      <p className="mb-2 text-sm text-muted-foreground">
        Enter your email and password below <br />
        to log into your account
      </p>

      <UserAuthForm />
    </Card>
  </>
);

export default SignInPage;
