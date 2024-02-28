import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import OAuthForm from "./OAuthForm";
//import SignInForm from "./SignInForm";
//import OAuthForm from "./OAuthForm";

export function AuthForm() {
	return (
		<div className="w-full space-y-5">
            <p className="text-center text-2xl font-semibold">Welcome to FullFoods!</p>
			<Tabs defaultValue="signin" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signin">Sign In</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<SignInForm />
				</TabsContent>
				<TabsContent value="register">
					<RegisterForm />
				</TabsContent>
			</Tabs>
			<OAuthForm />
		</div>
	);
}