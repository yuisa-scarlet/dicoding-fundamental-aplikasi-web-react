import "./Sidebar.css";

import { LucidePlus } from "lucide-react";
import Logo from "../AppLogo";

const items = [
  {
    id: 1,
    onClick: (onOpenModal) => () => {
      onOpenModal();
    },
    icon: <LucidePlus />,
  },
];

function SidebarItem({ icon, onClick }) {
  return (
    <li role="button" className="sidebar__list-item" onClick={onClick}>
      {icon}
    </li>
  );
}

export default function Sidebar({ onOpenModal }) {
  return (
    <div className="sidebar">
      <Logo />
      <ul className="sidebar__list">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            onClick={item.onClick(onOpenModal)}
          />
        ))}
      </ul>
    </div>
  );
}
