import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getClient } from "../api/client";
import { Keys, saveToLocalStorage } from "../utils/localStorage";
import { updateLoggedIn, updateUser } from "../store/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = await getClient();
      const { data } = await client.post("/auth/login", form);
      saveToLocalStorage(Keys.AUTH_TOKEN, data?.token);

      dispatch(updateUser(data?.user));
      dispatch(updateLoggedIn(true));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                placeholder="**********"
                onChange={handleChange}
                className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <Link
          to="/auth/register"
          className="mt-4 text-center flex items-center justify-center text-sm text-gray-500 hover:text-gray-600"
        >
          Don't have an account?
          <span className="font-semibold leading-6 text-purple-600 hover:text-purple-500 ml-1">
            Register
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
