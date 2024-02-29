import { usePathname } from "next/navigation";

export default function useActiveLink(path, deep = true) {
  const pathname = usePathname();

  const currentPath = path === "/" ? "/" : `${path}`;
  const normalActive = pathname === currentPath;
  return {
    active: normalActive,
  };
}
