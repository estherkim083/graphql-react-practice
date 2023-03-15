import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCompanies, useCreateJob, useJob } from "../graphql/hooks";
import { updateJob } from "../graphql/queries";

function JobForm() {
  const { jobId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const { companies, loading: companiesFetchLoading } = useCompanies();
  const { job, loading: jobFetchLoading } = useJob(jobId);
  const { createJob, loading } = useCreateJob();

  useEffect(() => {
    if (jobId && job) {
      setTitle(job.title);
      setDescription(job.description);
      setCompanyId(job.company.id);
    } else {
      setCompanyId("Default User Company");
    }
  }, [jobId, job]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (jobId) {
      const job = await updateJob({ id: jobId, title, description, companyId });
      window.location.href = `/jobs/${job.id}`;
    } else {
      console.log(companyId);
      const job = await createJob(title, description, companyId);
      //const job = await createJob({ title, description, companyId });
      window.location.href = `/jobs/${job.id}`;
    }
  };
  if (companiesFetchLoading || jobFetchLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="form-box">
        <form>
          {companies && companyId != "" && (
            <select
              onChange={(e) => setCompanyId(e.target.value)}
              defaultValue={companyId}
            >
              <option value={null}>Default User Company</option>
              {companies.map((company) => {
                return (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                );
              })}
            </select>
          )}
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                onClick={handleSubmit}
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
