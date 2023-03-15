import { readFile } from "fs/promises";
import { Job, Company } from "./db.js";

function rejectIf(user) {
  if (!user) throw new Error("Authorization required");
}

export const typeDefs = await readFile("./schema.graphql", "utf-8");
export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
    companies: async () => Company.findAll(),
  },
  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(user);
      if (input.companyId === "Default User Company") {
        return Job.create({ ...input, companyId: user.companyId });
      }
      return Job.create(input);
    },
    deleteJob: (_root, { id }, { user }) => {
      rejectIf(user);
      Job.delete(id);
      return "deleted successfully";
    },
    updateJob: (_root, { input }, { user }) => {
      rejectIf(user);
      if (input.companyId === "Default User Company") {
        return Job.update({ ...input, companyId: user.companyId });
      }
      return Job.update(input);
    },
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
