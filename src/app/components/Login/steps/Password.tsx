import * as React from 'react';
import * as t from '../style.css';
import { ICommonProps } from './';

type IProps = ICommonProps;

const Password = ({ error, change, nextStep }: IProps) => (
  <div className={t.loginStep}>
    <h1>Cloud password check</h1>
    <p>
      Please enter your cloud password.
    </p>
    <div className={t.formGroupLogin}>
      <input
        onChange={change}
        name="password"
        className="form-control form-control-lg"
        placeholder="Your cloud password" type="password" />
    </div>
    {error && <div>Error type: {error.description}</div>}
    <button onClick={nextStep} className={`${t.btn} ${t.primary}`}>Submit</button>
  </div>
);

export { Password };
