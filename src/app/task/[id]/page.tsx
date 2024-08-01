import { NextPage } from 'next';
import { useParams } from 'next/navigation';

const TaskPage: NextPage = () => {
  const { id: taskId } = useParams();
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Task: {taskId}</h2>
    </div>
  );
};

export default TaskPage;
