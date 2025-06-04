import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../api/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await LoginAPI(email, password);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div className="row">
      <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
        <div className="login-panel panel panel-default">
          <div className="panel-heading">Log in</div>
          <div className="panel-body">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="checkbox">
                  <label>
                    {/* <input name="remember" type="checkbox" value="Remember Me" /> Remember Me */}
                  </label>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;