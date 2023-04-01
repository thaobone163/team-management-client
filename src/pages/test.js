import { useFormik } from 'formik';

export default function MyForm() {
  const formik = useFormik({
    initialValues: { user: {gender: ''} },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        <input
          type="radio"
          name="user.gender"
          value="male"
          defaultChecked
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="user.gender"
          value="female"
        />
        Female
      </label>
      <label>
        <input
          type="radio"
          name="user.gender"
          value="nonbinary"
        />
        Non-binary
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
