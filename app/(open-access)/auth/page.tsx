import { readUserSession } from "@/actions/auth/actions";
import { AuthForm } from "@/components/Auth/AuthForm";
import AuthUI from "@/components/Auth/AuthUI";
import { redirect } from "next/navigation";

export default async function page() {

    const {data} = await readUserSession();
    if (data.session) {
      return redirect("/explore");
    }

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<div className="w-96">
				<AuthForm />
			</div>
			{/* <AuthUI /> */}
		</div>
	);
}