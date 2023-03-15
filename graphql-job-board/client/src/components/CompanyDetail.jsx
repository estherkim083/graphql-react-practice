import { useParams } from "react-router";
import { useCompany } from "../graphql/hooks";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();

  const { company, loading } = useCompany(companyId);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {company && (
        <>
          <h1 className="title">{company.name}</h1>
          <div className="details-box">{company.description}</div>
          <h1 className="title is-5">Jobs at {company.name}</h1>
          <JobList jobs={company.jobs} />
        </>
      )}
    </div>
  );
}

export default CompanyDetail;
