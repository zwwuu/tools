import { IconCoffee } from "@tabler/icons-react";

import Anchor from "~/components/Anchor";

const DonationButton = () => {
  return (
    <Anchor
      href={`${process.env.NEXT_PUBLIC_KOFI_URL}`}
      rel={"noopener noreferrer"}
      size={"icon"}
      target={"_blank"}
      title={"Buy me a coffee"}
      variant={"button"}
    >
      <IconCoffee size={"1em"} aria-hidden />
    </Anchor>
  );
};

export default DonationButton;
