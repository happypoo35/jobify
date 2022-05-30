import { useSearchParams } from "react-router-dom";
import { Spinner } from "components/Common";
import JobCard from "./JobCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

import { useGetAllJobsQuery } from "app/api.jobs";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isFetching } = useGetAllJobsQuery(
    searchParams.toString()
  );

  return (
    <section className="dashboard-section all-jobs">
      <Filters jobsCount={data?.nHits} pageCount={data?.nPages} />
      <section className="jobs-list" role="list">
        {isFetching && (
          <div className="loading-cover">
            <Spinner size="big" />
          </div>
        )}
        {isLoading ? (
          <Spinner size="big" />
        ) : (
          data?.jobs?.map((el) => <JobCard key={el._id} job={el} />)
        )}
      </section>
      {data?.nPages > 1 && <Pagination pageCount={data.nPages} />}
    </section>
  );
};
export default Jobs;
