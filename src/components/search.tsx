import { Input } from '@/components/ui/input';
import { FC } from 'react';

const Search: FC = () => (
  <div>
    <Input
      type="search"
      placeholder="Search..."
      className="md:w-[100px] lg:w-[300px]"
    />
  </div>
);

export default Search;
