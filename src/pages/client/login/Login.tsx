import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { signIn } from "../../../service/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit = async (value: any) => {
    try {
      let data: any = await signIn(value);
      if (data?.status == 0) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Success");
        if (data.data.role == "admin") {
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* component */}
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  Login Form with Floating Labels
                </h1>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      {...register("email")}
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    <p style={{ color: "red", margin: 0 }}>
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      {...register("password")}
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    <p style={{ color: "red", margin: 0 }}>
                      {errors.password?.message}
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      Submit
                    </button>
                  </div>
                  <p
                    onClick={() => navigate("/register")}
                    style={{ textDecoration: "underline" }}
                  >
                    Register
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
