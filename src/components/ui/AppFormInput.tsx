import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type TAppFormInput<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
  type?: "email" | "password" | "text" | "number";
  formControl: Control<T>;
};

const AppFormInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  type,
  description,
  formControl,
}: TAppFormInput<T>) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                // type={type || "text"}
                type={
                  (type === "password" ? (show ? "text" : "password") : type) ||
                  "text"
                }
                {...field}
              />
            </FormControl>
            {type === "password" &&
              (show ? (
                <Eye
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-4 top-[30%] cursor-pointer"
                  size={16}
                />
              ) : (
                <EyeOff
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-4 top-[30%] cursor-pointer"
                  size={16}
                />
              ))}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormInput;
