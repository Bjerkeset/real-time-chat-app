"use client";

import {User} from "@supabase/supabase-js";
import {useEffect, useRef} from "react";
import {useUser} from "./user";

export default function InitUser({user}: {user: User | undefined}) {
  const init = useRef(false);
  useEffect(() => {
    if (init.current) {
      useUser.setState({user});
    }
    init.current = true;
  }, []);
  return <></>;
}
