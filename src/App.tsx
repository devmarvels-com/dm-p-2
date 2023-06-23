import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// code #a1
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./App.css";

enum SubscriptionEnum {
  yes = "yes",
  no = "no",
}

type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  subscribe: SubscriptionEnum;
};
// code #b4
const errMsg = {
  firstNameErr: "Invalid First Name. Must be at least 2 characters long",
  lastNameErr: "Invalid Last Name. Must be at least 2 characters long",
  emailErr: "Invalid email. Must be a valid name@example.com",
  subscribe: 'You must select "yes" or "no"',
};

// code #a2:
const schema: yup.ObjectSchema<IFormInput> = yup.object({
  firstName: yup.string().min(2, errMsg.firstNameErr).required(),
  lastName: yup.string().min(2, errMsg.lastNameErr).required(),
  email: yup.string().email(errMsg.emailErr).required(errMsg.emailErr),
  subscribe: yup.string<SubscriptionEnum>().defined(errMsg.subscribe),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onFormSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const hasError = {
    firstName: errors.firstName,
    lastName: errors.lastName,
    email: errors.email,
    subscribe: errors.subscribe,
  };

  // code #b3
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={`field ${hasError.firstName ? "has-error" : ""}`}>
          <label>First Name</label>
          <input {...register("firstName")} />
          <span>{errors.firstName?.message}</span>
        </div>
        <div className={`field ${hasError.lastName ? "has-error" : ""}`}>
          <label>Last Name</label>
          <input {...register("lastName")} />
          <span>{errors.lastName?.message}</span>
        </div>
        <div className={`field ${hasError.email ? "has-error" : ""}`}>
          <label>Email</label>
          <input {...register("email")} />
          <span>{errors.email?.message}</span>
        </div>
        <div className={`field ${hasError.subscribe ? "has-error" : ""}`}>
          <label>Subscribe</label>
          <select {...register("subscribe")}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <span>{errors.subscribe?.message}</span>
        </div>
        <div className="submit-btn">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default App;
