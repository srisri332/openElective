import React from "react";
import { useToast, Button } from "@chakra-ui/react";

const Toasts = () => {
  const toast = useToast();
  return toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 4000,
    isClosable: true,
  });
};

// function Toasts() {
//   const toast = useToast();
//   const statuses = ["success", "error", "warning", "info"];

//   return <Button onClick={() => toggleToast(toast)}>Show Toast</Button>;
// }

export default Toasts;
