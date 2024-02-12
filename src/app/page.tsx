// import { supabaseServer } from "@/lib/supabase/server";
// import InitUser from "@/lib/store/init-user";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ListMessages from "@/components/chat/list-messages";
// import ChatMessages from "@/components/chat/chat-messages";
import ChatAbout from "@/components/chat/chat-about";
import {createClient} from "@/lib/supabase/server";
import {cookies} from "next/headers";
import InitUser from "@/lib/store/init-user";
import ChatMessages from "@/components/chat/chat-messages";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {data, error} = await supabase.auth.getSession();

  // console.log("Supabase getUser:", data.session?.user);
  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className=" h-full border rounded-md flex flex-col relative">
          {/* <ChatHeader user={data.session?.user} /> */}
          <ChatHeader user={data.session?.user} />

          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
