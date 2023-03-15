import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useJob } from "../graphql/hooks";
import { deleteJob } from "../graphql/queries";
import editImg from "/editing.png";
import removeImg from "/remove.png";

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading } = useJob(jobId);

  const handleEdit = () => {
    window.location.href = `/jobs/new/${jobId}`;
  };
  const handleRemove = async () => {
    const message = await deleteJob(jobId);
    if (message) {
      alert(message);
      window.location.href = "/";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1 className="title">{job.title}</h1>
        <img
          src={editImg}
          alt="edit image"
          width={20}
          height={20}
          style={{ cursor: "pointer", marginLeft: "15px" }}
          onClick={handleEdit}
        />
        <img
          src={removeImg}
          alt="remove image"
          width={20}
          height={20}
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={handleRemove}
        />
      </div>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="details-box">{job.description}</div>
    </div>
  );
}

export default JobDetail;
