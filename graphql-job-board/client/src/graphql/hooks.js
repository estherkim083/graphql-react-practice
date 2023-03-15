import {
  COMPANYIES_QUERY,
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
  JOBS_QUERY,
  JOB_QUERY,
} from "../graphql/queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { getAccessToken } from "../auth.js";

export function useJobs() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
}

export function useJob(id) {
  const { data, loading, error } = useQuery(JOB_QUERY, { variables: { id } });
  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
}

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });

  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}

export function useCompanies() {
  const { data, loading, error } = useQuery(COMPANYIES_QUERY);

  return {
    companies: data?.companies,
    loading,
    error: Boolean(error),
  };
}

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);
  return {
    createJob: async (title, description, companyId) => {
      const {
        data: { job },
      } = await mutate({
        variables: { input: { title, description, companyId } },
        context: { headers: { Authorization: "Bearer " + getAccessToken() } },
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });
      return job;
    },
    loading,
    error: Boolean(error),
  };
}
