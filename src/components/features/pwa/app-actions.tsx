"use client";

import { Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppActions() {
  const handleInstall = () => {
    // TODO: Implement PWA install logic
    console.log("Install app clicked");
  };

  const handleNotifications = () => {
    // TODO: Implement notification permission logic
    console.log("Enable notifications clicked");
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        variant="hustle"
        size="lg"
        className="w-full justify-center"
        onClick={handleInstall}
      >
        <Download />
        Install App
      </Button>
      <Button
        variant="hustle"
        size="lg"
        className="w-full justify-center"
        onClick={handleNotifications}
      >
        <Bell />
        Enable Notifications
      </Button>
    </div>
  );
}
