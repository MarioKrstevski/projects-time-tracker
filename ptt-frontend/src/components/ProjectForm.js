import React from 'react';
import styled from 'styled-components';
import { Form, Field, FormSpy } from 'react-final-form';
import createDecorator from 'final-form-focus';

import  {ProjectFormContainer, FieldRow, FieldContainer} from './styled-components';



export default function LinkProjectForm(props) {
  const required = value => (value ? undefined : 'Required');

  const handleSubmit = (project, e, f, d) => {
    // e.preventDefault();

    console.log('Test123', props.selectedProject);
    console.log('Projhect', { ...project, time: [] });
    console.log('Variables', { variables: { ...project } });
    return props
      .callMutation({ variables: { ...project } })
      .then(({ data }) => {
        console.log(' I am da tata', data);
        props.refetch();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const focusOnError = createDecorator();

  return (
        <ProjectFormContainer>
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
          <FieldContainer>
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
              {({ input, meta, placeholder }) => {
                const { value, ...inputProps } = input;
                const projectName = 'projectName' + props.version;
                return (
                  <FieldRow active={meta.active} error={meta.error} touched={meta.touched}>
                    {props.selectedProject ? (
                      <input
                        {...inputProps}
                        name={projectName}
                        type="text"
                        defaultValue={props.selectedProject.projectName}
                      />
                    ) : (
                      <input {...input} name={projectName} type="text" placeholder={placeholder} />
                    )}
                  </FieldRow>
                );
              }}
            </Field>
          </FieldContainer>
          <FieldContainer>
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
              {({ input, meta, placeholder }) => {
                const { value, ...inputProps } = input;
                const description = 'description' + props.version;
                return (
                  <FieldRow active={meta.active} error={meta.error} touched={meta.touched}>
                    {props.selectedProject ? (
                      <input
                        {...inputProps}
                        name={description}
                        type="text"
                        defaultValue={props.selectedProject.description}
                      />
                    ) : (
                      <input {...input} name={description} type="text" placeholder={placeholder} />
                    )}
                  </FieldRow>
                );
              }}
            </Field>
          </FieldContainer>

          <button type="submit" disabled={submitting}>
            Create/Update
          </button>

          {/* Rendering the values just to make sure everything works as intended */}
          {/* <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>

          <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
        </ProjectFormContainer>
  );
}
