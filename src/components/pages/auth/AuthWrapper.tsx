import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AnimationWrapper from "@/components/shared/AnimationWrapper";
import TextAnimation from "@/components/shared/TextAnimation";

type TAuthWrapper = {
  children: React.ReactNode;
  label: string;
  des: string;
  imageUrl: string;
};

const AuthWrapper = ({ children, label, imageUrl, des }: TAuthWrapper) => {
  return (
    <AnimationWrapper key={label}>
      <div className="w-full h-screen lg:grid lg:grid-cols-2">
        <div className="hidden bg-muted/40 py-4 lg:flex center">
          <Image
            src={imageUrl}
            alt="Image"
            width="1200"
            height="600"
            className="h-[60vh] w-8/12 object-contain brightness-90"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <Card className="mx-auto max-md:max-w-sm md:w-[448px]">
            <CardHeader>
              <CardTitle className="text-xl">
                <TextAnimation text={label} />
              </CardTitle>

              <CardDescription>{des}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AuthWrapper;
