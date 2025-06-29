import "./Sidebar.css";

import { LucidePlus, LogOut, User } from "lucide-react";
import Logo from "../AppLogo";
import ThemeToggle from "../ThemeToggle";
import { LanguageToggle } from "../ui/language-toggle";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../ui/button";

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
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
  };

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

      <div className="sidebar__bottom">
        <div className="sidebar__controls">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        {isAuthenticated && (
          <div className="sidebar__user">
            <div className="user-info">
              <User size={16} />
              <span className="user-name">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="small"
              onClick={handleLogout}
              className="logout-btn"
              aria-label={t("logout")}
            >
              <LogOut size={16} />
              <span>{t("logout")}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
