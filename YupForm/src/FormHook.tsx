import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("pleade enter user name"),
  email: yup.string().email().required("please enter email"),
  channel: yup.string().required("please enter channel name"),
  social: yup.object().shape({
    twitter: yup.string().required("enter twitter profile"),
    facebook: yup.string().required("enter facebook profile"),
  }),
  phoneNumbers: yup.array(),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumber: string[];
};

const FormHook = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumber: ["", ""],
    },
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const OnSubmit = (data: FormValues) => {
    console.log("submit form", data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        {/* for user name */}
        <div className="form-control">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        {/* for email */}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* for channel */}

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        {/* for twitter  */}

        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
          <p className="error">{errors.social?.twitter?.message} </p>
        </div>

        {/* for facebook */}

        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
          <p className="error">{errors.social?.facebook?.message} </p>
        </div>

        {/* for primary phone number */}

        <div className="form-control">
          <label htmlFor="primary">Primary Phone Number</label>
          <input type="text" id="primary" {...register("phoneNumber.0")} />
          <p className="error">{errors.phoneNumber?.[0]?.message} </p>
        </div>

        {/* for secondary phone number 2nd index if array */}

        <div className="form-control">
          <label htmlFor="secondary">Secondary Phone Number</label>
          <input type="text" id="secondary" {...register("phoneNumber.1")} />
          <p className="error">{errors.phoneNumber?.[1]?.message} </p>
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FormHook;
