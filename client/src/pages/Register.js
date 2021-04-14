import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(error) {
      console.log(error.graphQLErrors[0]);

      console.log(error.graphQLErrors[0].extensions.exception.errors);
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          error={errors?.username ? true : false}
        />
        <Form.Input
          label="email"
          placeholder="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors?.email ? true : false}
        />
        <Form.Input
          label="password"
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors?.password ? true : false}
        />
        <Form.Input
          label="confirmPassword"
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors?.confirmPassword ? true : false}
        />
        <Button type="submit" primary loading={loading}>
          Register
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
