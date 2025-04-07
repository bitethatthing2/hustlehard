"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";
import PageHeader from "@/components/shared/PageHeader";

function Contact() {
  const router = useRouter();

  const navigateToHome = () => {
    router.navigate("/");
  };

  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Contact Us"
        subtitle="Looks like the redirect worked! (You came here from the notification)"
      />

      <div className="max-w-xl mx-auto px-4">
        <Button onClick={navigateToHome} className="w-full">
          Go back to Home
        </Button>
      </div>
    </div>
  );
}

export default Contact;
