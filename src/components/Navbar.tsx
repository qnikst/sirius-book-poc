import { Tabbar, Badge } from "@telegram-apps/telegram-ui";
import { MaterialSymbol } from "react-material-symbols";
import { useNavigate, useLocation } from "react-router-dom";
import { useMyBooks } from "./BooksSection";

import { bem } from "@/css/bem.ts";
const [, e] = bem("footer_tabbar");

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { myBooks } = useMyBooks();

  return (
    <Tabbar style={{ marginBottom: 15 }}>
      <Tabbar.Item
        text="Find book"
        selected={location.pathname == "/"}
        onClick={() => navigate("/", { replace: true })}
      >
        <MaterialSymbol icon="search" size={24} fill />
      </Tabbar.Item>
      <Tabbar.Item
        text="My Books"
        selected={location.pathname == "/my"}
        onClick={() => navigate("/my", { replace: true })}
      >
        <MaterialSymbol icon="newsstand" size={24} />
        {location.pathname != "/my" && myBooks && myBooks.length > 0 && (
          <Badge type="number" mode="gray" className={e("floating")}>
            {myBooks.length}
          </Badge>
        )}
      </Tabbar.Item>
      <Tabbar.Item
        text="Take book"
        selected={location.pathname == "/take"}
        onClick={() => navigate("/take", { replace: true })}
      >
        <MaterialSymbol icon="qr_code" size={24} fill />
      </Tabbar.Item>
    </Tabbar>
  );
}
