import knex from "knex";
import DataLoader from "dataloader";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
});

export function createCompanyLoader() {
  return new DataLoader(async (companyIds) => {
    const companies = await db
      .select()
      .from("companies")
      .whereIn("id", companyIds);
    return companyIds.map((companyId) => {
      return companies.find((company) => company.id === companyId);
    });
  });
}
