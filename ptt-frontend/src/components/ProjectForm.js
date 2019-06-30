import React from 'react';
import styled from 'styled-components';
import { Form, Field, FormSpy } from 'react-final-form';
import createDecorator from 'final-form-focus'; 

const FieldRow = styled.div`
    background-color: ${props => props.active ? 'lightcyan' : 'white'};
`;

export default function ProjectForm(props) {

    const required = value => (value ? undefined: 'Required');
    const createProject = project => props.addProject(project);
    const focusOnError = createDecorator();

  return(
          <Form onSubmit={createProject} 
              decorators={[focusOnError]}
              subscription={{
                  submitting: true,
                  values: true
              }}>
              {({handleSubmit, values, submitting}) => <form onSubmit={handleSubmit}>
                  <div>
                      <Field 
                          name="projectName" 
                          placeholder="Project"
                          validate={required}
                          subscription={{
                              value: true,
                              active: true,
                              error: true,
                              touched: true
                          }}
                      >
                      {({input, meta, placeholder}) => (
                          <FieldRow active={meta.active}>
                              <label htmlFor="projectName">Project</label>
                              <input {...input} placeholder={placeholder}/>
                              {meta.error && meta.touched && <span>{meta.error}</span>   }
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
                              touched: true
                          }}
                      >
                      {({input, meta, placeholder}) => (
                          <FieldRow active={meta.active}>
                              <label htmlFor="description">Description</label>
                              <input {...input} placeholder={placeholder}/>
                              {meta.error && meta.touched && <span>{meta.error}</span>   }
                          </FieldRow>
                      )}
                      </Field>
                  </div>

                  
                  <button type="submit" disabled={submitting}>Create</button>
                  <FormSpy  subscription={{values: true}}>  
                  {({values}) => (
                      <pre>{JSON.stringify(values , undefined, 2)}</pre>
                  )} 
                  </FormSpy>
                  {/* Weird bug if </FormSpy> is next to the } in the row above , it is an error... */}
                  <pre>{JSON.stringify(values , undefined, 2)}</pre>
                  </form>
              }
          </Form>
  )
}
