import { useMutation, QueryKey, useQueryClient } from "@tanstack/react-query";
import { Exam, Exams, MutationEvent, User } from "..";

export const useDataMutation = (event: MutationEvent, queryKey?: unknown[]) => {
  const queryClient = useQueryClient();

  const mutationFn = async (body: unknown) => {
    switch (event) {
      // exam
      case "CREATE_EXAM":
        return Exams.createExam(body as Partial<Exam>);

      case "START_EXAM": {
        const params = body as any;

        return await Exams.startExams(params.examToken, params.examId);
      }

      case "SUBMIT_EXAM": {
        const params = body as any;

        return await Exams.submitExam(params.answers, params.examId);
      }

      case "EVALUATE_EXAM": {
        const params = body as any;

        return await Exams.evaluateExam(params.examId, params.studentId);
      }

      case "TOGGLE_ADD_STUDENT":
        return await User.toggleAddTeacherStudent(body as string[]);
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
