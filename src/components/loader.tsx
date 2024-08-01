import type { FC } from 'react';
import { LoaderPinwheel } from 'lucide-react';

const Loader: FC = () => (
  <div className="flex h-svh w-full items-center justify-center">
    <LoaderPinwheel className="animate-spin" size={32} />
    <span className="sr-only">loading</span>
  </div>
);

export default Loader;
