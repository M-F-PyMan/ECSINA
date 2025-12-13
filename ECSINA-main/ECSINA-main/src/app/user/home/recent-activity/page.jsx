
import React from "react";
import ProgressTimeline from "@/components/user/ProgressTimeline";
import Title from "@/components/user/Title";
function page() {
  return (
    <div className="container mx-auto h-full">
     <Title title={'فعالیت های اخیر'}/>
  <ProgressTimeline/>
    </div>
  );
}

export default page;