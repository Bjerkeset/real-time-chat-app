import React, {Suspense} from "react";
import ListMessages from "./list-messages";
import {createClient} from "@/lib/supabase/server";
import InitMessages from "@/lib/store/init-messages";
import {LIMIT_MESSAGE} from "@/lib/constant";
import {cookies} from "next/headers";

export default async function ChatMessages() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {data} = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", {ascending: false});

  console.log("supabase messages:", data);

  return (
    <Suspense fallback={"loading.."}>
      <ListMessages />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
}
