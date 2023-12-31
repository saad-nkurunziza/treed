import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import SigninWithGithub from "@/components/SignInWithGithub";
import SigninWithGoogle from "@/components/SignInWithGoogle";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInWithEmailForm from "@/components/SignInWithEmail";

export default async function AuthRoute() {
  const session = await getServerSession();

  if (session) {
    return redirect("/");
  }
  return (
    <Card className="bg-dark-3">
      <CardHeader>
        <CardTitle>Please sign in to Treed App</CardTitle>
        <CardDescription>
          To access Treed you have to be authenticated
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full">
          <SignInWithEmailForm />
          <Separator  className="my-3"/>
          
          <SigninWithGithub />
          <Separator  className="my-3"/>
          <SigninWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
