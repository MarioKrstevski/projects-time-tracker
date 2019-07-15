import React from 'react';
import styled from 'styled-components';
import { Form, Field, FormSpy } from 'react-final-form';
import createDecorator from 'final-form-focus';

const FieldRow = styled.div`
  background-color: ${props => (props.active ? 'lightcyan' : 'white')};
`;


export default function ProjectForm(props) {
  const required = value => (value ? undefined : 'Required');

  const handleSubmit = (project, e, f, d) => {
    // e.preventDefault();
   
    console.log('Projhect', { ...project, time: [] });
    console.log('Variables', { variables: { ...project } });
    return props
      .callMutation({ variables: { ...project } })
      .then(({ data }) => {
        console.log(" I am da tata", data)
        props.refetch();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const focusOnError = createDecorator();

  return (
    <Form
      onSubmit={handleSubmit}
      decorators={[focusOnError]}
      subscription={{
        submitting: true,
        values: true,
      }}
    >
      {({ handleSubmit, values, submitting }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <Field
              name="projectName"
              placeholder="Project"
              validate={required}
              subscription={{
                value: true,
                active: true,
                error: true,
                touched: true,
              }}
            >
              {({ input, meta, placeholder }) => (
                <FieldRow active={meta.active}>
                  <label htmlFor="projectName">Project</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </FieldRow>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="description"
              placeholder="Description"
              validate={required}
              subscription={{
                value: true,
                active: true,
                error: true,
                touched: true,
              }}
            >
              {({ input, meta, placeholder }) => (
                <FieldRow active={meta.active}>
                  <label htmlFor="description">Description</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </FieldRow>
              )}
            </Field>
          </div>

          <button type="submit" disabled={submitting}>
            Create
          </button>

          {/* Rendering the values just to make sure everything works as intended */}
          {/* <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>

          <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
}
