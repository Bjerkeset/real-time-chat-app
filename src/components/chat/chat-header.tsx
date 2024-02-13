"use client";
import {useRouter} from "next/navigation";
import {Button} from "../ui/button";
import ChatPresence from "./chat-presence";
import {createClient} from "@/lib/supabase/client";
import {User} from "@supabase/supabase-js";

export default function ChatHeader({user}: {user: User | undefined}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLoginWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Chat Room</h1>
          <ChatPresence />
        </div>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleLoginWithGithub}>Login</Button>
        )}
      </div>
    </div>
  );
}
