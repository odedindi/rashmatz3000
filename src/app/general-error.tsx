import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function UnauthorisedError() {
  const router = useRouter();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">401</h1>
        <span className="font-medium">
          Oops! You don&apos;t have permission to access this page.
        </span>
        <p className="text-center text-muted-foreground">
          It looks like you tried to access a resource that requires proper
          authentication. <br />
          Please log in with the appropriate credentials.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="rounded" onClick={router.back}>
            Go Back
          </Button>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
