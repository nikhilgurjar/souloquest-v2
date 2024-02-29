import { usePathname } from "next/navigation";

export default function useActiveLink(path, deep = true) {
  const pathname = usePathname();

  console.log(pathname);
  const currentPath = path === "/" ? "/" : `${path}`;
  console.log(pathname, currentPath);
  const normalActive = pathname === currentPath;
  return {
    active: normalActive,
  };
}
