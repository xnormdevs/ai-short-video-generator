export const extractInitials = (name: string) => {
  const nameParts = name.split(" ");
  return nameParts.map((word) => word[0]).join("");
};
