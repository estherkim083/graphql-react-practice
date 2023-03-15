import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      fetchPolicy: "network-only",
    },
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});

export async function deleteJob(id) {
  const mutation = gql`
    mutation ($id: ID!) {
      message: deleteJob(id: $id)
    }
  `;
  const variables = { id };

  const context = { headers: { Authorization: "Bearer " + getAccessToken() } };
  const {
    data: { message },
  } = await client.mutate({ mutation, variables, context });
  //const { message } = await request(GRAPHQL_URL, query, variables, headers);
  return message;
}

export async function updateJob(input) {
  const mutation = gql`
    mutation UpdateJobMutation($input: UpdateJobInput!) {
      job: updateJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input };

  const context = { headers: { Authorization: "Bearer " + getAccessToken() } };
  const {
    data: { job },
  } = await client.mutate({ mutation, variables, context });
  //const { job } = await request(GRAPHQL_URL, query, variables, headers);
  return job;
}
const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const CREATE_JOB_MUTATION = gql`
  mutation CreateJobMutation($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;
export async function createJob(input) {
  const mutation = CREATE_JOB_MUTATION;
  const variables = { input };
  const context = { headers: { Authorization: "Bearer " + getAccessToken() } };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
    },
  });
  //const { job } = await request(GRAPHQL_URL, query, variables, headers);
  return job;
}
export const COMPANY_QUERY = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        description
        id
        title
      }
    }
  }
`;
export async function getCompany(id) {
  const query = COMPANY_QUERY;
  const variables = { id };
  const {
    data: { company },
  } = await client.query({ query, variables });

  return company;
}

export async function getJob(id) {
  const query = JOB_QUERY;
  const variables = { id };
  const {
    data: { job },
  } = await client.query({ query, variables });
  return job;
}
export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      description
      title
      company {
        name
      }
    }
  }
`;

export async function getJobs() {
  const query = JOBS_QUERY;

  const {
    data: { jobs },
  } = await client.query({ query });
  return jobs;
}
export const COMPANYIES_QUERY = gql`
  query {
    companies {
      id
      name
      description
    }
  }
`;
export async function getCompanies() {
  const query = COMPANYIES_QUERY;
  const {
    data: { companies },
  } = await client.query({ query });
  return companies;
}
