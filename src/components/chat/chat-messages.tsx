import React, {Suspense} from "react";
import ListMessages from "./list-messages";
import {createClient} from "@/lib/supabase/server";
import InitMessages from "@/lib/store/init-messages";
import {LIMIT_MESSAGE} from "@/lib/constant";
import {cookies} from "next/headers";

export default async function ChatMessages() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let {data: messages, error} = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", {ascending: false});

  console.log("messages:", messages);
  console.log("error:", error);

  return (
    <Suspense fallback={"loading.."}>
      <ListMessages />
      <InitMessages messages={messages?.reverse() || []} />
    </Suspense>
  );
}
