// modules/auth/components/Profile.tsx

import { Icon } from "@/ui/atoms";
import { useUserProfile } from "@/hooks/auth";

export const Profile: React.FC = () => {
  const { profile } = useUserProfile();

  const displayName = profile?.fullName ?? "Usuario";

  return (
    <div className="flex items-center gap-2 text-xl">
      <Icon name="user" colorScheme="neutral" className="size-10" />
      <span className="font-semibold uppercase">{displayName}</span>
    </div>
  );
};

export default Profile;
