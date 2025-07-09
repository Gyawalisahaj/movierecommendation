export default function LoginPage(){
    return(
        <div className=" h-[950px] w-[700px] flex flex-col items-center justify-start">
            <h1 className='mt-5 text-orange-950 text-3xl font-bold'>Login Page</h1>
           <div className="flex flex-col text-orange-950 mt-20 w-3/4">
                <label className="mb-2 text-2xl" htmlFor="email">Email:</label>
                <input
                id="email"
                type="email"
                placeholder="Enter your Email"
                className="p-2 border-2 border-orange-700 rounded-md text-black text-base outline-none focus:ring-4 focus:ring-orange-400"
                />
            </div>

            <div className="flex flex-col text-orange-950 mt-10 w-3/4">
                <label className="mb-2 text-2xl" htmlFor="password">Password:</label>
                <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                className="p-2 border-2 border-orange-700 rounded-md text-black text-base outline-none focus:ring-4 focus:ring-orange-400"
                />
            </div>
            <div className="flex bg-orange-700 flex-col w-3/4 mt-10">
                <button
                type="submit"
                className="bg-orange-700 text-orange-950 py-2 px-4 rounded hover:bg-orange-400 transition"
                >
                    Login
                </button>
            </div>

            <div className="mt-20 gap-5 flex flex-col justify-between text-m text-orange-950 underline">
         
                <a href="/forgot-password">Forgot Password?</a>
                <a href="/signup">Create New Account</a>
        </div>

        </div>
    );
}