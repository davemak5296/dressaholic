import * as React from 'react';
import FormInput from '../FormInput/form-input.component';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import { useEmailSignIn } from '../../hooks/useEmailSignIn';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const [formFields, setFormFields] = React.useState(defaultFormFields);
  const { email, password } = formFields;
  const { refetch: googleRefetch } = useGoogleSignIn();
  const { refetch: emailRefetch } = useEmailSignIn(email, password);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const handler = async () => {
      event.preventDefault();
      emailRefetch();
      resetFormFields();
    };
    handler().catch(Error);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="flex w-full flex-col px-2 xs:w-[380px] xs:px-0">
      <h2 className="my-2.5 mx-auto text-2xl font-bold xs:mx-0">I already have an account</h2>
      <span className="mx-auto xs:mx-0">Sign in with your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          aria-label="email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="flex flex-col justify-evenly xs:flex-row">
          <button type="submit" className="daisy-btn-primary px-8 py-4 uppercase">
            sign in
          </button>
          <button
            onClick={() => googleRefetch()}
            className="daisy-btn-secondary px-8 py-4 uppercase"
          >
            sign in with google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
