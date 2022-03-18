import React from "react";
import ButtonCards from "./ButtonCards";
import SummaryCard from "./SummaryCard";
import { Button, Center } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

function AdminElectivePage() {
  return (
    <div>
      AdminElectivePage
      <ButtonCards />
      <SummaryCard />
      <Center mt='10px'>
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme='green'
          marginRight='10px'>
          Filled Details
        </Button>
        <Button leftIcon={<DownloadIcon />} colorScheme='red'>
          Unfilled Details
        </Button>
      </Center>
    </div>
  );
}

export default AdminElectivePage;
