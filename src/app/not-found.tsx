import GoBack from '@/components/errors/buttons/goBack';
import GoHome from '@/components/errors/buttons/goHome';

export default function NotFoundError() {
  return (
    <div className="mx-auto mt-10 flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-[7rem] font-bold leading-tight">404</h1>
      <span className="font-medium">Oops! Page Not Found!</span>
      <p className="text-center text-muted-foreground">
        It seems like the page you&apos;re looking for <br />
        does not exist or might have been removed.
      </p>
      <div className="mt-6 flex gap-4">
        <GoBack />
        <GoHome />
      </div>
    </div>
  );
}
