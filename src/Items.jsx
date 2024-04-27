import SingleItem from './SingleItem';
import { useFetchTasks } from './reactQueryCustomHooks';

const Items = () => {
  const { isLoading, data, isError } = useFetchTasks();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>there was an error</p>;
  }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
