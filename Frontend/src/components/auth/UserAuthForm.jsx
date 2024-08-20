import { Input } from "@/components/ui/input";

export const UserAuthForm = ({ isName }) => {
  return (
    <div className="flex flex-col space-y-4">
      {isName && <Input type="text" id="name" name="name" placeholder="Name" />}
      <Input type="email" id="email" name="email" placeholder="Email" />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
    </div>
  );
};
