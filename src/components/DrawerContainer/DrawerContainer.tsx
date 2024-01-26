import { ReactNode } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

interface IDrawerContainerProps {
  triggerButton: ReactNode;
  title?: string;
  description?: string;
  cancelButtonText?: string;
  children: ReactNode;
}

const DrawerContainer = ({
  triggerButton,
  title,
  description,
  cancelButtonText = "Cancel",
  children,
}: IDrawerContainerProps): JSX.Element => {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            {title ? <DrawerTitle>{title}</DrawerTitle> : null}
            {description ? (
              <DrawerDescription>{description}</DrawerDescription>
            ) : null}
          </DrawerHeader>

          <div className="p-4 pb-0">{children}</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">{cancelButtonText}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerContainer;
