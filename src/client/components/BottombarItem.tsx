import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface BottombarItemProps {
  icon: IconType;
  href: string;
}

export default function BottombarItem({
  icon: Icon,
  href
}: BottombarItemProps) {
  return (
    <Link to={href}>
      <Icon />
    </Link>
  );
}
