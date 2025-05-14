import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { storage } from "../../Utils/LocalStorage";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    const users = storage.get("users") || [];

    const found = users.find(
      (user: LoginFormInputs) =>
        user.email === data.email && user.password === data.password
    );

    if (found) {
      storage.set("currentUser", found);
      navigate("/");
    } else {
      setError("email", {
        type: "manual",
        message: "No such email",
      });
      setError("password", {
        type: "manual",
        message: "Invalid password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
      <div className="w-full max-w-md p-8 bg-zinc-900 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="p-3 text-base bg-zinc-800 border border-zinc-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm text-red-400">{errors.email.message}</span>
          )}

          <input
            type="password"
            className="p-3 text-base bg-zinc-800 border border-zinc-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-sm text-red-400">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-400">
          Don't have an account?
          <span
            className="text-blue-400 hover:underline cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
