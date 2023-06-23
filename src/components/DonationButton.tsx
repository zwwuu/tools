import { IconCoffee } from "@tabler/icons-react";

import Anchor from "~/components/Anchor";

const DonationButton = () => {
  return (
    <Anchor
      variant={"button"}
      title={"Buy me a coffee"}
      href={`${process.env.NEXT_PUBLIC_KOFI_URL}`}
      target="_blank"
      rel={"noopener noreferrer"}
    >
      <IconCoffee size={"1em"} aria-hidden />
    </Anchor>
  );
};

export default DonationButton;
