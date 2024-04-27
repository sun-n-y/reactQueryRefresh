import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customFetch } from './utils';
import { toast } from 'react-toastify';

export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => customFetch('/'),
  });
  return { isLoading, data, isError };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task updated');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask } = useMutation({
    mutationFn: ({ taskId }) => customFetch.delete(`/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task deleted');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { deleteTask };
};

export const useCreateTask = ({ setNewItemName }) => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added');
      setNewItemName('');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, isLoading };
};
