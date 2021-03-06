import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useDebounce } from "hooks";
import { Field, Selector } from "components/Common";
import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "utils/constants";

import { useForm, useWatch } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { selectLimit, selectPage, setLimit, setPage } from "app/slice.global";

const Filters = ({ jobsCount, pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line

  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);

  const defaultValues = {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
  };

  const { register, control, setValue, reset } = useForm({
    defaultValues,
  });

  const values = useWatch({ control });
  const debouncedSearch = useDebounce(values.search);

  useEffect(() => {
    const { search, ...rest } = values;
    const searchValues = Object.keys(rest).reduce((acc, el) => {
      if (rest[el] !== "all" && rest[el] !== "latest") {
        acc[el] = rest[el];
      }
      return acc;
    }, {});

    if (debouncedSearch) {
      searchValues.search = debouncedSearch;
    }

    if (page > 1) {
      searchValues.page = page;
    }

    if (limit) {
      searchValues.limit = limit;
    }

    setSearchParams(searchValues);
  }, [setSearchParams, values, debouncedSearch, page, limit]);

  useEffect(() => {
    if (page > pageCount) {
      dispatch(setPage(1));
    }
  }, [page, pageCount, dispatch]);

  const handleReset = () => {
    dispatch(setPage(1));
    dispatch(setLimit(null));
    reset();
  };

  return (
    <div className="filters-container">
      <form className="filters">
        <Field
          label="search"
          name="search"
          autoComplete="off"
          {...register("search")}
        />
        <Selector
          name="status"
          label="status"
          options={["all", ...STATUS_OPTS]}
          setValue={setValue}
          control={control}
        />
        <Selector
          name="jobType"
          label="type"
          options={["all", ...TYPE_OPTS]}
          setValue={setValue}
          control={control}
        />
        <Selector
          name="sort"
          label="sort"
          options={SORT_OPTS}
          setValue={setValue}
          control={control}
        />
      </form>
      <div className="filters-stats">
        {jobsCount > 0 ? (
          <span className="count">
            <FiEye />
            {jobsCount} {jobsCount === 1 ? "job" : "jobs"} found
          </span>
        ) : (
          <span className="count">
            <FiEyeOff />
            no jobs to display
          </span>
        )}
        <button type="button" className="btn-inline" onClick={handleReset}>
          Clear filters
        </button>
      </div>
    </div>
  );
};
export default Filters;
