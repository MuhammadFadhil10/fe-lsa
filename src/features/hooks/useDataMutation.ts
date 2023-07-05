import { useMutation, QueryKey, useQueryClient } from "@tanstack/react-query";
import { Exams, MutationEvent } from "..";

export const useDataMutation = (event: MutationEvent, queryKey?: unknown[]) => {
  const queryClient = useQueryClient();

  const mutationFn = async (body: unknown) => {
    switch (event) {
      // exam
      case "START_EXAM":
        return await Exams.startExams(body as string);
    }
  };

  return useMutation({
    mutationFn: (body?: unknown) => mutationFn(body),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey as QueryKey);

      queryClient.setQueryData(queryKey as QueryKey, () => data);

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKey as QueryKey, context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};
