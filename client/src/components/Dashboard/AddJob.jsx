import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Field, Button, Selector } from "components/Common";
import { STATUS_OPTS, TYPE_OPTS } from "utils/constants";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";
import {
  useCreateJobMutation,
  useGetJobQuery,
  useUpdateJobMutation,
} from "app/api.jobs";

const AddJob = ({ isEdit }) => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const user = useSelector(selectUser);
  const { data: job, isError: isInvalidJobId } = useGetJobQuery(jobId, {
    skip: !isEdit,
  });
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const schema = yup.object().shape({
    position: yup
      .string()
      .required("Can not be empty")
      .max(100, "Can not be more than 100 characters"),
    company: yup
      .string()
      .required("Can not be empty")
      .max(50, "Can not be more than 50 characters"),
    jobLocation: yup
      .string()
      .required("Can not be empty")
      .max(20, "Can not be more than 20 characters"),
    status: yup.string().required("Can not be empty"),
    jobType: yup.string().required("Can not be empty"),
  });

  const defaultValues = useMemo(
    () => ({
      position: isEdit && job ? job.position : "",
      company: isEdit && job ? job.company : "",
      status: isEdit && job ? job.status : "pending",
      jobType: isEdit && job ? job.jobType : "full-time",
      jobLocation: isEdit && job ? job.jobLocation : user.location,
    }),
    [user.location, isEdit, job]
  );

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onCreate = async (data) => {
    try {
      await createJob(data).unwrap();
      setTimeout(() => navigate("/dashboard/all-jobs"), 1000);
    } catch (err) {
      if (err.data?.errors) {
        err.data.errors.map((el) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
    }
  };

  const onUpdate = async (data) => {
    try {
      await updateJob({ body: data, jobId }).unwrap();
      setTimeout(() => navigate("/dashboard/all-jobs"), 1000);
    } catch (err) {
      if (err.data?.errors) {
        err.data.errors.map((el) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
    }
  };

  if (isInvalidJobId) return <Navigate to="/dashboard/error" replace />;

  return (
    <section className="dashboard-section add-job">
      <form
        className="form"
        onSubmit={handleSubmit(isEdit ? onUpdate : onCreate)}
      >
        <h2 className="h3">{isEdit ? "Edit Job" : "Add job"}</h2>
        <div className="form-fields">
          <Field
            label="position"
            error={errors.position?.message}
            {...register("position")}
          />
          <Field
            label="company"
            error={errors.company?.message}
            {...register("company")}
          />
          <Field
            label="location"
            error={errors.jobLocation?.message}
            {...register("jobLocation")}
          />
          <Selector
            name="status"
            label="status"
            error={errors.status?.message}
            options={STATUS_OPTS}
            setValue={setValue}
            control={control}
          />
          <Selector
            name="jobType"
            label="type"
            error={errors.jobType?.message}
            options={TYPE_OPTS}
            setValue={setValue}
            control={control}
          />
          <Button
            type="submit"
            className="btn btn-block"
            showAlert
            isLoading={isEdit ? isUpdating : isCreating}
          >
            Submit
          </Button>
        </div>
        <button
          type="button"
          className="btn-inline"
          style={{ marginTop: "1rem" }}
          onClick={() => reset()}
        >
          {isEdit ? "Reset changes" : "Reset form"}
        </button>
      </form>
    </section>
  );
};
export default AddJob;
