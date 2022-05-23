import { Field, Button } from "components/Common";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSelector } from "react-redux";
import { selectUser } from "app/slice.user";
import { useUpdateUserMutation } from "app/api.auth";

const Profile = () => {
  const user = useSelector(selectUser);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please provide your name")
      .min(3, "Name can't be less than 3 characters")
      .max(20, "Name can't be more than 20 characters"),
    lastName: yup
      .string()
      .max(20, "Last name can't be more than 20 characters"),
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    location: yup.string().max(20, "Can't be more than 20 characters"),
  });

  const defaultValues = {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const onSubmit = async (data) => {
    try {
      await updateUser(data).unwrap();
    } catch (err) {
      if (err.data?.errors) {
        err.data.errors.map((el) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
    }
  };

  return (
    <section className="dashboard-section profile">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="h3">Profile</h2>
        <div className="form-fields">
          <Field
            label="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Field
            label="last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <Field
            type="email"
            label="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Field
            label="location"
            error={errors.location?.message}
            {...register("location")}
          />
          <Button
            type="submit"
            className="btn btn-block"
            showAlert
            isLoading={isLoading}
          >
            Save changes
          </Button>
        </div>
      </form>
    </section>
  );
};
export default Profile;
