import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocale, useOutsideClick } from "hooks";
import {
  FiNavigation,
  FiCalendar,
  FiBriefcase,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { Spinner } from "components/Common";

import { usePrefetch } from "app/api";
import { useDeleteJobMutation } from "app/api.jobs";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const localeDate = useLocale();
  const optionsRef = useRef();
  const [show, setShow] = useState(false);
  useOutsideClick(optionsRef, () => setShow(false));

  const prefetchJob = usePrefetch("getJob");
  const [deleteJob, { isLoading, isSuccess }] = useDeleteJobMutation();

  const {
    position,
    company,
    jobLocation: location,
    createdAt,
    jobType: type,
    status,
    _id: jobId,
  } = job;

  const handleDelete = async () => {
    try {
      await deleteJob(jobId);
    } catch (err) {}
  };

  return (
    <article className="job-card">
      <header className="job-card-header">
        <div className="title">
          <div className="icon">{company.split("")[0]}</div>
          <div className="text">
            <h5 className="h5" title={position}>
              {position}
            </h5>
            <p title={company}>{company}</p>
          </div>
        </div>
        <div className="options" ref={optionsRef}>
          <button className="btn-options" onClick={() => setShow((p) => !p)}>
            <FiMoreVertical />
          </button>
          <div className={`options-dropdown ${show ? "active" : ""}`}>
            <span
              onClick={() => navigate(`/dashboard/add-job/${jobId}`)}
              onMouseEnter={() => prefetchJob(jobId)}
            >
              <FiEdit /> Edit
            </span>
            <span onClick={handleDelete}>
              {isLoading || isSuccess ? (
                <>
                  <Spinner color="gray" /> Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 /> Delete
                </>
              )}
            </span>
          </div>
        </div>
      </header>
      <div className="job-card-content">
        <div className="content-item">
          <FiNavigation />
          <span title={location}>{location}</span>
        </div>
        <div className="content-item">
          <FiCalendar />
          <span>{localeDate(createdAt)}</span>
        </div>
        <div className="content-item">
          <FiBriefcase />
          <span>{type}</span>
        </div>
        <div className={`status ${status}`}>{status}</div>
      </div>
    </article>
  );
};
export default JobCard;
