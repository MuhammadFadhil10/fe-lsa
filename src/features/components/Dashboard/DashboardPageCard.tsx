import { Pages } from "@/features";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  page: Pages;
}

export const DashboardPageCard = React.memo(function DashboardPageCard({
  page,
}: Props) {
  const location = useLocation();

  return (
    <li>
      <Link
        to={page.path}
        className={`text-white ${
          location.pathname === page.path ? "bg-blue-800" : ""
        } hover:bg-blue-800 w-full block p-2`}
      >
        {page.label}
      </Link>
    </li>
  );
});
