import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { storage } from "../../Utils/LocalStorage";

const signUpSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Must contain at least one special character",
    }),
});

type SignUpFormInputs = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormInputs) => {
    const users = storage.get("users") || [];

    const exists = users.some(
      (user: SignUpFormInputs) => user.email === data.email
    );
    if (exists) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

    const newUser = {
      ...data,
      id: crypto.randomUUID(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ id: newUser.id }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
      <div className="w-full max-w-md p-8 bg-zinc-900 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="p-3 text-base bg-zinc-800 border border-zinc-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-sm text-red-400">{errors.name.message}</span>
          )}

          <input
            className="p-3 text-base bg-zinc-800 border border-zinc-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-400">{errors.email.message}</span>
          )}

          <input
            className="p-3 text-base bg-zinc-800 border border-zinc-700 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            {...register("password")}
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
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-400">
          Already have an account?
          <span
            className="text-blue-400 hover:underline cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
