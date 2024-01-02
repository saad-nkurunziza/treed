import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SigninWithGithub from "@/components/SignInWithGithub";
import SigninWithGoogle from "@/components/SignInWithGoogle";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignInWithEmailForm from "@/components/SignInWithEmail";

export default async function AuthRoute() {
  const session = await getServerSession();

  if (session) {
    return redirect("/");
  }
  return (
    <main className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/5 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-glassmorphism backdrop-blur-lg shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-xl font-semibold text-white">
                Welcome to Treed!
              </h1>
              <p className="mt-2 text-gray-400">Sign in to continue</p>
            </div>
            <div className="divide-y divide-gray-700">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-300 sm:text-lg sm:leading-7">
                <div className="relative">
                  <div className="space-y-5">
                    <SignInWithEmailForm />

                    <Separator className="my-8" />
                  </div>
                  <div className="space-x-2 items-center flex my-5">
                    <SigninWithGoogle />
                    <Separator orientation="vertical"/>
                    <SigninWithGithub />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    //   <Card className="bg-dark-3">
    //     <CardHeader>
    //       <CardTitle>Please sign in to Treed App</CardTitle>
    //       <CardDescription>
    //         To access Treed you have to be authenticated
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="flex flex-col w-full">
    //         <SignInWithEmailForm />
    //         <Separator  className="my-3"/>

    //         <SigninWithGithub />
    //         <Separator  className="my-3"/>
    //         <SigninWithGoogle />
    //       </div>
    //     </CardContent>
    //   </Card>
  );
}
